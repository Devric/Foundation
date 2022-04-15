import { CommandContainer, PubSub } from "./CQRS.Container";
import { IMediatorMiddleware } from "./CQRS.interface";

/**
 * Mediator Base Class
 *
 * @Category Mediator
 */
export abstract class Mediator {
    protected middlewares: IMediatorMiddleware[] = [];
    public abstract Exec(command: string, payload: any): any;
    public abstract Subscribe(message:string, cb:Function): void;

	// use middleware
    public Use(middleware: IMediatorMiddleware): void {
        this.middlewares.push(middleware);
    }

    protected Resolve(command: string): Function {
        let handlerClass: any = CommandContainer.Get(command);
        let handler: any = new handlerClass();

        return handler;
    }

    protected Process(msg: string, payload: any): any {
        let handler: any = this.Resolve(msg);
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

/**
 * Command Container Signleton
 *
 * @Category Mediator
 */
class CommandMediator extends Mediator {

	/**
	 * send command
	 */
    public Exec(command: string, payload: any): any {
        return this.Process(command, payload);
    }

	// subscribe completed event
	public Subscribe(message:string, cb:Function): void {
		PubSub.subscribe(message, cb)
	}

}

/** 
 * Query Container Signleton 
 *
 * @Category Mediator
 */
class QueryMediator extends Mediator {

	// send Query
    public Exec(command: string, payload: any): any {
        return this.Process(command, payload);
    }

	// subscribe completed event
	public Subscribe(message:string, cb:Function): void {
		PubSub.subscribe(message, cb)
	}

}

export let Commands = new CommandMediator()
export let Queries = new QueryMediator()
