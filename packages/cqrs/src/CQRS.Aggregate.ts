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

	/**
	 * Event sourcing
     *
     *
     * @category Aggregate
	 * @subcategory Event Sourcing
	 */
	export abstract class AbstractAggregate {
		private _id             : string // AggregateRootId
		private eventStore      : IEventStore
		private stateStore      : IStateStore
		private currentRevision : number  = 0 // Current state Revision
		private state           : any // in memory state

		abstract reduce(): void;

		/**
		 * @Param {iOptions} Options - blah
		 */
		constructor({id, eventStore, stateStore }: iOptions) {
			this._id = id
			this.eventStore = eventStore
			this.stateStore = stateStore
			this.state = this.stateStore.getState()

			this.getRevision()
		}

		// list all the events from EventStore that is after the last revision of StateStore
		/***/
		getChanges() { }

		/***/
		createSnapshot() { }

		/**
		 * update current state, create snapshot
		 */
		commit() {}

		/**
		 * List snap shot ids
		 */
		listSnapshotsIds() {}

		/**
		 * Get Aggregate id
		 */
		get id(): string {
			return this._id
		}

		/**
		 * Get current state revision
		 */
		getRevision() {
			this.currentRevision = this.state.revision
		}

		/**
		 * Emits DONE event to saga
		 */
		emit(eventName: string): void { }
	}
}
