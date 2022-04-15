// import { Commands, Command, ICommandHandler, IMediatorMiddleware, AbstractBaseCommand, Entity } from "cqrs"
import CQRS from "cqrs"
import { v, TypeOf, compile } from 'suretype'

// Typescript Interface export unable to import directly
let { Commands, Command, AbstractBaseCommand, Entity, EventStore } = CQRS

// Billing Service commands
// ============================================
let BillingEventStore = new EventStore()

@Command(Billing.Command)
export class Billing extends AbstractBaseCommand implements CQRS.ICommandHandler<any, boolean> {
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


