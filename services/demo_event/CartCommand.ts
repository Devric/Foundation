// import { EventStore, Commands, Command, ICommandHandler, IMediatorMiddleware, AbstractBaseCommand, Entity } from "cqrs"
import CQRS from "cqrs"
import { v, TypeOf, compile } from 'suretype'

import { CORE } from './CartStateStore'
import { CartEventStore } from './CartEventStore'

// Typescript Interface export unable to import directly
let { Command, AbstractBaseCommand, Entity, EventStore,  } = CQRS



// Cart service commands
// ============================
abstract class AbstractCartCommandHandler<T, K> extends AbstractBaseCommand implements CQRS.ICommandHandler<T, K> {
    abstract Validate(command: T): void;
    abstract Process(command: T): K;

    EventLog(payload: any) {
		CartEventStore.add({
			eventName : this.constructor.name,
			version   : 1,
			payload   : payload,
			timestamp: new Date()
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
export type tCart = TypeOf<typeof CartSchema>; 

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
export class ADD_CART extends AbstractCartCommandHandler<tCart, boolean> {
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
export class REMOVE_CART extends AbstractCartCommandHandler<tCart, boolean> {
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

/*
- Cart ( event service )
-- add cart
-- remove cart
-- change item qty
-- checkout

- Catalog ( crud service)
-- query

- warehouse ( event service )

- billing (crud service)
- address (crud service)

User sees an error message if they order more than the amount of that product in stock.
*/
