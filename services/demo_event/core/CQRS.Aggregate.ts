// Event sourcing
export namespace ES {

	interface IEventStore {}
	interface IStateStore {
		getState(): any
	}
	interface IEventBus {
		publish(topic: string, message:any): Function
		subscribe(callback: Function): Function
	}

	interface iOptions {
		id: string;
		eventStore: IEventStore;
		stateStore: IStateStore;
	}

	export abstract class AbstractAggregate {
		private _id             : string // AggregateRootId
		private eventStore      : IEventStore
		private stateStore      : IStateStore
		private currentRevision : number  = 0 // Current state Revision
		private state           : any // in memory state

		abstract reduce(): void;

		constructor({id, eventStore, stateStore }: iOptions) {
			this._id = id
			this.eventStore = eventStore
			this.stateStore = stateStore
			this.state = this.stateStore.getState()

			this.getRevision()
		}

		// list all the events from EventStore that is after the last revision of StateStore
		getChanges() { }

		createSnapshot() { }

		// update current state, create snapshot
		commit() {}

		listSnapshotsIds() {}

		get id(): string {
			return this._id
		}

		getRevision() {
			this.currentRevision = this.state.revision
		}

		emit() {

		}
	}
}
