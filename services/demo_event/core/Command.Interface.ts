// Command
export interface ICommandHandler<T, K> {
    Validate?: (command: T) => void;
    EventLog?: (command: T) => void;
    Process: (command: T) => K;
}

// Mediator Middleware
export interface IMediatorMiddleware {
	// ctx allows to attaach data
    PreProcess: (request: any, ctx: any) => void;
    PostProcess: (request: any, response: any) => void;
}

// Mediator Container
export interface IContainer {
    readonly processors: { [id: string]: Function},
}

// Command Messages
export interface IMessage {
	readonly command: string;
    readonly timestamp: Date;
    readonly version: string;
    readonly payload: any;
}

export interface IAggregate<IState, IMessage> {
	Events: IMessage[]
}
