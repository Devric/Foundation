import { IContainer } from "./CQRS.Interface";

export namespace Container {
	// Memory store of Command.process
    const container: IContainer = {
        processors: {},
    };

	// Register the processor with the Decorator
    export function Register(message: string, callback: Function): void {
        container.processors[message] = callback;
    }

    export function Get(message: string): Function {
        if (container.processors.hasOwnProperty(message)) {
            return container.processors[message];
        }

        throw `Processor for '${message}' was not registered!`;
    }
}

export namespace PubSub {
	// Memory store of pubusb, should be one per mediator
    const container: IContainer = {
        processors: {},
    };

	// this should be used for mediator to subscribe a callback to submit event to the SAGA ochestrator service
    export function subscribe(message: string, callback: Function): void {
        container.processors[message] = callback;
    }

	// this should be used for CommandHandlers to notify something has completed
	// this is fire and forget, regardless success failure
	export function emit(message:string, payload:any=null) {
		let handlers = Object.keys(container.processors)
		if (handlers.length === 0) return

		handlers.forEach(( handle:string ) => {
        	container.processors[handle](message, payload);
		})
	}

	// remove this event, not requred
	// export function unsubscribe(message:string) {
    //     delete container.processors[message]
	// }

}

