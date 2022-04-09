import { IContainer } from "./Command.Interface";

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
