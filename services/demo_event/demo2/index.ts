import {IState, IProjector} from "esaucy"
import {AddProductToCart} from './events/AddProductToCart'
import db from './EventStoreDB'

interface CartState extends IState {
	products: {
		[sku: string]: number // QTY
	}
}

class AddProductToCartProjector implements IProjector<AddProductToCart, CartState> {
 	async project(currentState: CartState, event: AddProductToCart): Promise<CartState> {
		return {
			index: currentState.index + 1,
			products: {
				...currentState.products,
				[event.sku]: (currentState.products[event.sku] ?? 0) + event.quantity,
			}
		}
	}
}

// Plays each event and aggregates from the original state
const ProjectFromStore = (async () => {
	let state: CartState = {
		index: 0,
		products: {}
	}

	const addProductProjector = new AddProductToCartProjector()

	for (const event of db) {
		console.log("==============================")
		console.log({event, state})
		state = await addProductProjector.project(state, event)
		console.log({state})
	}
})()

