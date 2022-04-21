// import { EventStore, Commands, Command, ICommandHandler, IMediatorMiddleware, AbstractBaseCommand, Entity } from "cqrs"
import CQRS from "cqrs"

// Typescript Interface export unable to import directly
let { Command, AbstractBaseCommand, Entity, EventStore,  } = CQRS


export let CartEventStore = new EventStore()
