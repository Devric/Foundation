export interface global {}

interface topWindow extends Window{}

interface iModule {
	module: string
	actions: string[]
	origin: string
	host?: string
}

type tEventData = {
	module: string;
	action: string;
	value: any;
}

declare global {
	interface Window {
		Oracle: any
		top: Window
	}

	class Oracle{
		constructor();
		createHost(origins: string[]): void;
		register(registerOpt: iModule): void;
		publish(obj: tEventData): void;
		subscribe(handler: Function): void;
		unsubscribe(): void;
		displayModules(): any;
	}
}


