import { Mediator, Command, ICommandHandler, IMediatorMiddleware, IMessage } from "./core/Command.Index"
import { v, TypeOf, compile } from 'suretype'


// created specifically for that service
// should not shared across service
abstract class AbstractCommandHandler<T, K> implements ICommandHandler<T, K> {
    abstract Validate(command: T): void;
    abstract Process(command: T): K;

    EventLog(payload: any) {
		var event:IMessage = {
			command: this.constructor.name,
			timestamp: new Date(),
			version: "1",
			payload: payload
		}

		// log to event store, happens after validation success
		console.log('abstracted log: ' + JSON.stringify(event) )
	}
}

@Command(Test.Command)
class Test extends AbstractCommandHandler<string, boolean> {
	public static get Command():string {return "TEST";}
	Validate(payload: string) {
		console.log('validate')
	}

	// outcome / agregate
	Process(payload:string){
		console.log('handle')
		return true
	}
}


// Command/AddCart.ts
// ----------------------------

// VALIDATION: Create validation object
let AddCartSchema = v.object({
	version: v.number().required()
}).additional(true)

// VALIDATION: transpile it to typescript type
type tAddCart = TypeOf<typeof AddCartSchema>; 

@Command(AddCart.Command)
class AddCart implements ICommandHandler<tAddCart, boolean> {
	public static get Command():string {return "ADD_CART";}

    EventLog(payload: any) {
		var event:IMessage = {
			command: this.constructor.name,
			timestamp: new Date(),
			version: "1",
			payload: payload
		}

		// log to event store, happens after validation success
		console.log('abstracted log: ' + JSON.stringify(event) )
	}

	Validate(payload: tAddCart){
		let valid = compile(AddCartSchema)(payload)
		if (!valid.ok) throw new Error(JSON.stringify(valid.errors))
	}

	Process(payload: tAddCart){
		return true
	}
}

// Command/AddCart.ts
// ----------------------------


// mediator service file
// ----------------------------

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

let m:Mediator = new Mediator()
m.Use(new LoggingMiddleware)


// entry trigger
m.Send(AddCart.Command, {version:6} as tAddCart)
m.Send(Test.Command, {"asdf":4560})
