// import { Commands, Command, ICommandHandler, IMediatorMiddleware, AbstractBaseCommand, Entity } from "cqrs"
import CQRS from "cqrs"
import { ADD_CART, REMOVE_CART, tCart } from "./CartCommand"
import { Billing } from "./BillingCommand"

// Typescript Interface export unable to import directly
let { Commands } = CQRS

// middleware/Logging.ts
// ----------------------------
// created specifically for that service
// should not shared across service
class LoggingMiddleware implements CQRS.IMediatorMiddleware {
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

