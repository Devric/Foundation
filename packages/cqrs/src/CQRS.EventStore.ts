import { IEvent } from './CQRS.Interface'

// TODO create abstract and interface
/**
 * EventStore
 *
 * Stores Input Event, this is just local strategy
 *
 * @category Store
 * @subcategory EventSourcing
 */
export class EventStore {
	stream: Array<IEvent> = []
	handlers: Array<Function> = []

	add(event: IEvent) {
		event.revision = ++this.stream.length
		event.timestamp = new Date()
		this.stream.push(event)
		this.stream = this.stream.filter(() => true)
		this.handlers.forEach(( handler:Function )=> handler(event) )
	}
	read(): Array<IEvent>{
		return [...this.stream]
	}
	subscribe(fn:Function) {
		this.handlers.push(fn)
	}
}
