export interface global {}

interface topWindow extends Window{}

type tModule = {
	module: string,
	actions: string[],
	origin: string
}

type tEventData = {
	action: string,
	value: any,
	meta?: any
}

type tRegisterData = {
	module: string,
	actions: string[],
	host: string
}

export class Oracle {
constructor();
	#host: string
	#allowedOrigins: string[]
	#module: string
	#modules: tModule[]
	#subscribeHandler: {(event: MessageEvent) : void}

	createHost(origins: string[]): void;
	register(registerOpt: tRegisterData): void;
	dispatch(obj: tEventData): void;
	subscribe(handler: Function): void;
	unsubscribe(): void;
	displayModules(): any;
}

declare global {
	interface Window {
		Oracle: any;
	}
}

