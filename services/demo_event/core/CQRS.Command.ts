import { PubSub } from "./CQRS.Container";

// To let command use emit
export abstract class AbstractBaseCommand {
	abstract Validate(command : any): void;

	// emit to SAGA
	emit(message:string, payload:any=null) {
		PubSub.emit(message, payload)
	}
}

