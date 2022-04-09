import {IState, ICommandHandler, IEvent, ICommand, IProjector, IService} from "esaucy"


export interface IStateStore<T> {
	// defaultState
	state:T
	constructor(stateName:string):void

	// Load from data store to class property
	load():Promise<T>

	// Publish to data store
	publish(event: IState): Promise<boolean>;
}

export interface IEventStore {
	publish(event: IEvent): Promise<boolean>;
	retrieve(): Promise<IEvent[]>;
}

abstract class Client<
	Command extends ICommand,
	Event extends IEvent,
	State extends IState
> implements IService{
	protected abstract updateState(state: State): Promise<void>;

	constructor(
		private commandHandler: ICommandHandler<Command, Event>,
		private projector: IProjector<Event, State>,
		private eventStore: IEventStore,
		private stateStore: IStateStore
	) {}

	async getCurrentState(event: Event): Promise<State>{
		
	};

	async execute(command: Command): Promise<State> {
		// 1 Service.Execute(Command): procuce new event
		// 2 storeEvent
		// 3 CommandHandler
		// 4 Service.getCurrentState
		// 5 Projector
		// 6 Service.updateState
		// 7 LocalStore
		// 8 Return result to Service.execute(command)

		// 1 Execute and generate new event
		const event = await this.commandHandler.execute(command);

		// 2 StoreEvent
		this.eventStore.publish(event)

		const currentState = await this.stateStore.state;

		const newState = await this.projector.project(currentState, event);
		this.stateStore.publish(newState)

		await this.updateState(newState);

		await this.eventStore.publish(event);

		return newState;
	}
}

export  { IState, ICommandHandler, IEvent, ICommand, IProjector, Client as IService }
