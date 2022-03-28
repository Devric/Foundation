import {EventBasedService, ICommand, ICommandHandler, IEvent, IEventStore, IProjector, IState} from "esaucy"

const generateRandomNumber = ():number => Math.floor(Math.random() * 100)+ 1

interface BetAmountCommand extends ICommand {
    id: string
    date: Date
    amountBet: number
}
interface BetPlacedEvent extends IEvent {
    amountBet: number,
    numberRolled: number,
    won: boolean
}

class UserMoneyState implements IState {
    index: number = 0
    money: number = 0
}

class BetAmountCommandHandler implements ICommandHandler<BetAmountCommand, BetPlacedEvent>{
    async execute(command: BetAmountCommand): Promise<BetPlacedEvent> {
        const number = generateRandomNumber()

        const event:BetPlacedEvent = {
            numberRolled: number,
            amountBet: command.amountBet,
            timestamp: new Date(),
            eventName: `betPlaced-${new Date()}`,
			version: 0,
            won: false
        }

        if(number > 52) event.won = true
        else event.won = false

		console.log(`2 Commnad Handler reduces the command event: produce newReducedEvent`)
		console.log(event)
        return event;
    }

}

class BetPlacedProjector implements IProjector<BetPlacedEvent, UserMoneyState>{
    async project(currentState: UserMoneyState, event: BetPlacedEvent): Promise<UserMoneyState> {
		console.log(`4 Projecting new state, recieve both currentState, newEvent: and output newState `)
        const newState: UserMoneyState = {
            index: currentState.index +1,
            money: event.won? currentState.money+event.amountBet: currentState.money-event.amountBet
        }
        return newState;
    }

}


class LocalEventStore implements IEventStore{
    private store : any = {}
    async publish(event: IEvent): Promise<boolean> {
		console.log(`6 EventStore publishes the newReducedEvent from step 2`)
		console.log(event)
        this.store[event.version] = event

        return true
    }

}

class BetService extends EventBasedService<BetAmountCommand,BetPlacedEvent,UserMoneyState> {

    constructor(){
        super(new BetAmountCommandHandler(), new BetPlacedProjector(), new LocalEventStore())
    }

    protected async  updateState(_: UserMoneyState): Promise<void> { 
		console.log(`5 Service triggers updateState and recieves newState. Does not output`)
		console.log(_)
	}

    protected async getCurrentState(_: BetPlacedEvent): Promise<UserMoneyState> {
		console.log(`3 Service gets currentState with new reduced event passed in here: `)
        return {
            index: 0,
            money: 0
        }
    }

}

const service = new BetService()

const input = { amountBetBTC: 1.2342627 }
const command:BetAmountCommand = {
    amountBet: input.amountBetBTC,
    date: new Date(),
    id: "AmountBetBTC"
}

console.log(`1 Service Executes Command`)
service.execute(command).then(result => {
	console.log(`7 Service.execute resiive result of new State from step 4 projection`)
    console.log(result)
})

// Service.Execute(Command) → CommandHandler → Service.getCurrentState → Projector → Service.updateState → LocalStore → Return result to Service.execute(command)
