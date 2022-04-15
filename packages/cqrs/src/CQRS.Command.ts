import { PubSub } from "./CQRS.Container";

/**
* Abstract Class Command
* To let command use emit
*
* @Category Commands
*/
export abstract class AbstractBaseCommand {
	abstract Validate(command : any): void;

	// emit to SAGA
	emit(message:string, payload:any=null) {
		PubSub.emit(message, payload)
	}
}

