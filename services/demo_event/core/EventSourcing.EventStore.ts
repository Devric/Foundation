export abstract class AbstractEventStore<T> {
	constructor(public store:any, public topic:string){}

	abstract appendEventStream():void
	abstract readStream(): any[]
}
