import * as KeyMirror from './KeyMirror'

// TODO convert this to command?
type IEvent<
	EventTopic extends string = string,
	EventType extends string = string,
	EventData extends Record<string, unknown> = Record<string, unknown>
> = Readonly<{
	topic: Readonly<EventTopic>
	type: Readonly<EventType>;
	data: Readonly<EventData>;
	timestamp: Date;
	version: number;
}>;

// Define constants
let EventType = KeyMirror.create([
	"CART_ADDED"
])
let EventTopic = KeyMirror.create([
	"CART"
])

// Define Event
type CartAddPayload = {
	amount: number
}
type CartAddedEvent = IEvent<
	typeof EventTopic.CART,
	typeof EventType.CART_ADDED,
	CartAddPayload
>


// commmand
class CartAction {
	AddProduct(payload:CartAddPayload): CartAddedEvent {
		return {
			topic: EventTopic.CART,
			type: EventType.CART_ADDED,
			timestamp: new Date(),
			data: payload,
			version: 1
		}
	}
}

var x = new CartAction()
console.log(x.AddProduct({amount:0}))


// Actions
// Facts


class CartCommandService/* extends IService <StateStore,EventStore> */ {
	commands:[] = []
		// updateItem(){}
		// removeItem(){}
		// clearCart() {}

	regiester(method: any){}
	exec(payload:any){} // execute commands : return current state
}

/*

var x = new CartService()

x.register([ CartAdd, CartAddv2, stateProjector, countProjector ])


x.exec(request<IEvent>)


*/
