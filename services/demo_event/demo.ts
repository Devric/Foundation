import { Commands, Command, ICommandHandler, IMediatorMiddleware, AbstractBaseCommand, Entity } from "./core/CQRS.Index"
import { v, TypeOf, compile } from 'suretype'

type tCartProp = {
	qty:number
}
class Cart extends Entity<tCartProp> {
	constructor(prop:tCartProp, _id?:string) {
		super(prop, _id)
		console.log(this)
	}
}

var x = new Cart({qty:0})
console.log(x.toObject())

// demo EventStore
// ============================================
namespace CORE {
	export interface EventStoreEvent {
		command: string
		version: number
		revision?: number
		timestemp?: Date
		payload?: any
		metadata?: any
	}

	export class EventStore {
		stream: Array<EventStoreEvent> = []
		handlers: Array<Function> = []

		add(event: EventStoreEvent) {
			event.revision = ++this.stream.length
			event.timestemp = new Date()
			this.stream.push(event)
			this.stream = this.stream.filter(() => true)
			this.handlers.forEach(( handler:Function )=> handler(event) )
		}
		read(): Array<EventStoreEvent>{
			return [...this.stream]
		}
		subscribe(fn:Function) {
			this.handlers.push(fn)
		}
	}
}
// var es = new EventStore.Store()
// 
// es.add({command: "AddCart"    , version: 1 , payload:{ip:"x123" , products: {"xyz":1}}})
// es.add({command: "AddCart"    , version: 1 , payload:{ip:"z8"   , products: {"xyz":1     , "bfz": 4}}})
// es.add({command: "AddCart"    , version: 1 , payload:{ip:"x123" , products: {"xyz":1}}})
// 
// 
// console.log(es.read())
// 
// es.subscribe((event:any)=>{
// 	console.log('sub:', event)
// })
// 
// es.add({command: "removeCart" , version: 1 , payload:{ip:"z8"   , products: {"xyz":1     , "bfz": 4}}})


// demo StateStore
namespace CORE {
	export interface IStore {
		get():any
		set():boolean
	}

	export class StateStore<T> implements IStore {
		revision: number = 0
		state: T = {} as T

		get() {
			return {...this}
		}

		set() {
			// this.revision = payload.revision

			return true
		}
	}
}

namespace CORE {
	export class Respository<IStore> {
		
	}
}


// created specifically for that service
// should not shared across service, only within same service
// ==========================================


// Billing Service commands
// ============================================
let BillingEventStore = new CORE.EventStore()

@Command(Billing.Command)
class Billing extends AbstractBaseCommand implements ICommandHandler<any, boolean> {
	public static get Command():string {return "BILLING";}

    EventLog(payload: any) {
		BillingEventStore.add({
			command: this.constructor.name,
			version: 1,
			payload: payload
		})
	}

	Validate(payload: string) {
		console.log('validate this is a billing object')
	}

	// outcome / agregate
	Process(payload:string){
		// call aggregate
		this.emit(Billing.Command + '_DONE', null)
		return true
	}
}


// Cart service commands
// ============================
let CartEventStore = new CORE.EventStore()
abstract class AbstractCartCommandHandler<T, K> extends AbstractBaseCommand implements ICommandHandler<T, K> {
    abstract Validate(command: T): void;
    abstract Process(command: T): K;

    EventLog(payload: any) {
		CartEventStore.add({
			command: this.constructor.name,
			version: 1,
			payload: payload
		})
	}
}

// Type validation
// ===========================================

// VALIDATION: Create validation object
let CartSchema = v.object({
	id: v.string().required(),
	ip: v.number().required(),
	products: v.object({}).additional(true).required()
})

// VALIDATION: transpile it to typescript type
type tCart = TypeOf<typeof CartSchema>; 

// Aggregation
// ===========================================
type tCartState = {
	revision: number,
	state: { [key:string]: any }
}
let CartStateStore = new CORE.StateStore<tCartState>()
class CartAggregate {
	store: CORE.StateStore<tCartState>
	state: tCartState

	constructor() {
		this.store = CartStateStore
		this.state = CartStateStore.get()
	}
	commit() {}

	add(payload:any) {}
	remove(payload:any) {}

	private getStateRevision() {
		return this.store.revision
	}
}
let cart = new CartAggregate()

@Command(ADD_CART.Command)
class ADD_CART extends AbstractCartCommandHandler<tCart, boolean> {
	public static get Command():string {return "ADD_CART";}

	Validate(payload: tCart){
		let valid = compile(CartSchema)(payload)
		if (!valid.ok) throw new Error(JSON.stringify(valid.errors))
	}

	Process(payload: tCart){
		cart.add(payload)
		this.emit(ADD_CART.Command + '_DONE', null)
		// console.log(CartEventStore.read())
		return true
	}
}

@Command(REMOVE_CART.Command)
class REMOVE_CART extends AbstractCartCommandHandler<tCart, boolean> {
	public static get Command():string {return "REMOVE_CART";}

	Validate(payload: tCart){
		let valid = compile(CartSchema)(payload)
		if (!valid.ok) throw new Error(JSON.stringify(valid.errors))
	}

	Process(payload: tCart){
		cart.remove(payload)
		// console.log(CartEventStore.read())
		this.emit(REMOVE_CART.Command + '_DONE', null)
		return true
	}
}


// mediator service file
// ========================================================

// middleware/Logging.ts
// ----------------------------
// created specifically for that service
// should not shared across service
class LoggingMiddleware implements IMediatorMiddleware {
	PreProcess(payload: any, ctx:any){
		// send this to file log
		console.log("================ pre processing =====================")
	}
	PostProcess(payload:any){
		// send this to file log
		console.log("================ post processing =====================")
	}
}

Commands.Use(new LoggingMiddleware)

Commands.Subscribe('a',(message:string, payload:any) => {
	console.log("SAGA:" + message)
})


// entry trigger
Commands.Exec( ADD_CART.Command    , { id:"asdf"    , ip: 45604560 , products: { "sku-123":5 } } as tCart)
Commands.Exec( ADD_CART.Command    , { id:"asdf"    , ip: 45604560 , products: { "sku-123":5 } } as tCart)
Commands.Exec( Billing.Command     , {"asdf":4560})
Commands.Exec( ADD_CART.Command    , { id:"asdf"    , ip: 45604560 , products: { "sku-123":5 } } as tCart)
Commands.Exec( REMOVE_CART.Command , { id:"asdf"    , ip: 45604560 , products: { "sku-123":5 } } as tCart)

