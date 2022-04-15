import { IContainer } from "./CQRS.Interface";

/** 
 * Container base
 *
 * @Category Container
 */
export class Container {
	// Memory store of Command.process
	container: IContainer = { processors: {} }

	// Register the processor with the Decorator
    Register(message: string, callback: Function): void {
        this.container.processors[message] = callback;
    }

    Get(message: string): Function {
        if (this.container.processors.hasOwnProperty(message)) {
            return this.container.processors[message];
        }

        throw `Processor for '${message}' was not registered!`;
    }
}

/** 
 * Command Container singleton
 *
 * @Category Container
 */
export let CommandContainer = new Container()
/** 
 * query Container singleton
 *
 * @Category Container
 */
export let QueryContainer = new Container()

/** 
 * PubSub container
 *
 * @Category Container
 */
export namespace PubSub {
	// Memory store of pubusb, should be one per mediator
    const container: IContainer = {
        processors: {},
    };

	/**
	 * this should be used for mediator to subscribe a callback to submit event to the SAGA ochestrator service
	 */
    export function subscribe(message: string, callback: Function): void {
        container.processors[message] = callback;
    }

	/**
	 * this should be used for CommandHandlers to notify something has completed
	 * this is fire and forget, regardless success failure
	 */
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

