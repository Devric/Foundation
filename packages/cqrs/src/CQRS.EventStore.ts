export interface IEventStoreEvent {
	command: string
	version: number
	revision?: number
	timestemp?: Date
	payload?: any
	metadata?: any
}

// TODO create abstract and interface
/**
 * EventStore
 *
 * Stores Input Event
 *
 * @category Store
 * @subcategory EventSourcing
 */
export class EventStore {
	stream: Array<IEventStoreEvent> = []
	handlers: Array<Function> = []

	add(event: IEventStoreEvent) {
		event.revision = ++this.stream.length
		event.timestemp = new Date()
		this.stream.push(event)
		this.stream = this.stream.filter(() => true)
		this.handlers.forEach(( handler:Function )=> handler(event) )
	}
	read(): Array<IEventStoreEvent>{
		return [...this.stream]
	}
	subscribe(fn:Function) {
		this.handlers.push(fn)
	}
}
