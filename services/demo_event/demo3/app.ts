import {IState, ICommandHandler, IEvent, ICommand, IProjector, BaseService, IStateStore, IEventStore} from './iService'

import KeyMirror from './KeyMirror'

// import {AddProductToCart} from './events/AddProductToCart'
// import db from './EventStoreDB'


interface CartEvent extends IEvent {}
interface CartCommand extends ICommand {}
interface CartState extends IState {}

interface CartState extends IState {
	customerId: number,
	timestamp: Date,
	products: {
		[sku: string]: number // QTY
	}
}

class CartStateStore implements IStateStore<CartState> {
	load(){}
	publish(){}
}
class CartEventStore implements IEventStore {
	retrieve(){}
	publish(event: CartEvent){}
}

class CartCommandReducer implements ICommandHandler<CartCommand, CartEvent>{
	async execute(command: CartCommand): Promise<CartEvent>{
		let event: CartEvent = {
			eventName: "add",
			timestamp: new Date(),
			version: 0
		}

		return event
	}
}

class CartProjection implements IProjector<CartEvent, CartState>{}

export class ProductUpdateEvent implements IEvent {
	eventName= "AddProductToCart"
	version=1
	timestamp: Date

	constructor(public sku:string, public quantity: number){
		this.timestamp = new Date()
	}
}


class CartClient extends Client<CartCommand, CartEvent, CartState> {
	constructor() {
		super(new CartCommandReducer(), new CartProjection(), new CartEventStore(), new CartStateStore() )
	}
}

CartClient.execute()

// class AddProductToCartProjector implements IProjector<AddProductToCart, CartState> {
//  	async project(currentState: CartState, event: AddProductToCart): Promise<CartState> {
// 		return {
// 			index: currentState.index + 1,
// 			products: {
// 				...currentState.products,
// 				[event.sku]: (currentState.products[event.sku] ?? 0) + event.quantity,
// 			}
// 		}
// 	}
// }

// // Plays each event and aggregates from the original state
// const ProjectFromStore = (async () => {
// 	let state: CartState = {
// 		index: 0,
// 		products: {}
// 	}
// 
// 	const addProductProjector = new AddProductToCartProjector()
// 
// 	for (const event of db) {
// 		console.log("==============================")
// 		console.log({event, state})
// 		state = await addProductProjector.project(state, event)
// 		console.log({state})
// 	}
// })()


// Event type
let eventType = KeyMirror.create([
	'SHOPPING_LIST_CREATED',
	'SHOPPING_ITEM_CREATED'
])

let command = {
	createShoppingList: (state, {payload: {name}})=>{
		type: eventType.SHOPPING_LIST_CREATED
	},
	createShoppingItem: (state, {payload: {name}})=>{
		type: eventType.SHOPPING_ITEM_CREATED
	}
}
