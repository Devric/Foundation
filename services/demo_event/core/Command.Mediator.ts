import { Container } from "./Command.Container";
import { IMediatorMiddleware } from "./Command.interface";

export abstract class BaseMediator {
    public abstract Send(command: string, payload: any): any;

    protected Resolve(command: string): Function {
        let handlerClass: any = Container.Get(command);
        let handler: any = new handlerClass();

        return handler;
    }
}

export class Mediator extends BaseMediator {
    private middlewares: IMediatorMiddleware[] = [];

    public Send(command: string, payload: any): any {
        return this.Process(command, payload);
    }

    public Use(middleware: IMediatorMiddleware): void {
        this.middlewares.push(middleware);
    }

    private Process(msg: string, payload: any): any {
        let handler: any = super.Resolve(msg);
        this.middlewares.forEach(m => m.PreProcess(payload, handler));

        try {
            if(handler.Validate)
                handler.Validate(payload);
        } catch (ex) {
            throw ex;
        }

		// logging
        if(handler.EventLog) handler.EventLog(payload);
        
        let response: any = handler.Process(payload);
        this.middlewares.reverse().forEach(m => m.PostProcess(payload, response));
        return response;
    }
}
