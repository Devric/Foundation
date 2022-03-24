/* Oracle 

	cross application communication, for Modefule Federation & nested Iframe through window.postMessage()
	Useful when we unable to use Module Federation and had to resolve with iframe.

	Usage:
	1. Init HOST(container) Oracle class
	Define allowed iframe origins/application

	<Container> init([allowed options])

	-----------------------------------------------------
	2. - register child module, by postMessage to HOST, this should include all availble ACTIONS

	<module X>   register(HOST:container domain, and moduleX metadata) --> <Container>

	-----------------------------------------------------
	3. - Start publish to HOST container, and attach create widow.listern event to listen for broadcasts from HOST

															 -->  <Module B>
															/
		<Module A> --> Publish -->  <HOST>   --  boardcasts -----> <Module X>
															\
															 -->  <Module A>

		NOTE: (module A will recieve its own published event from HOST, need to filter/handle this event)

	-----------------------------------------------------
	4. - Each module should create its own reducer to listen for broadcast event as part of the regsiter


	type Oracle{
		private Origns: string[]
		private modules: moduleMeta[]

		public constructor(allowedOrigins:string[])
		public register(opts: RegisterOptions) 			// Remote module to register into HOST
		public publish() 								// Remote module to publish into HOST
		private broadcast(eData:EventData) 				// Host module broadcast to all registered remotes
	}

	type RegisterOpts {

	}

	type EventData: {
		from:String // Module Name eg: 'Cart'
		action: // TODO decide if this is stateChanged or actions, preferebly stateChanged
	}
*/

type tModule = {
	module: string,
	actions: string[],
	origin: string
}

type tEventData = {
	action: string,
	value: any,
	meta?: any
}

type tRegisterData = {
	module: string,
	actions: string,
	host: string
}

export default class Oracle {
	#host: string = ""
	#allowedOrigins: string[] = []
	#module: string = ""
	#modules: tModule[] = <tModule[]>[]
	#subscribeHandler: {(event: MessageEvent) : void} = (event: MessageEvent) => {}

	constructor(){}

	/**
	 * 
	 * Create Host Oracle
	 * This is the parent frame
     * takes a list of allowed origins
     *
     */
	createHost(allowedOrigins: string[]){
		var self = this;

		this.#allowedOrigins = allowedOrigins // ["http://127.0.0.1:4444","http://127.0.0.1:4445"]

		// Register host listener
		window.top.addEventListener('message', event => {
			// block anything that is not in origins
			if (!self.#allowedOrigins.includes(event?.origin)) return

			// listen for register event
			if (event.data.type === 'register') {
				let mod = event.data.module
				self.#modules.push({
					module: mod,
					actions: event.data.actions,
					origin: event.origin
				})
				return // we do not want register event to continue
			}

			// ignore anything that is not registered
			if (!self.#modules.map(mod=>mod.module).includes(event.data.module)) return

			// Broadcast to all registered modules
			// modules are registered by iframes
			document.querySelectorAll('iframe').forEach(function(frame){
				var frameOrigin = new URL(frame.src).origin
				if (!self.#allowedOrigins.includes(frameOrigin)) return // we dont want to sent it to other iframes
				frame.contentWindow.postMessage(event.data, frameOrigin)
			})
		})
	}


	/**
	 * Register Module after create hosts from remote
	 */
	register(registerOpt: tRegisterData){
		this.#host = registerOpt.host
		this.#module = registerOpt.module
		window.top.postMessage({
			type: 'register',
			module: registerOpt.module,
			actions: registerOpt.actions
		}, registerOpt.host)
	}

	/**
	 * Dispatch messages to all listner
	 */
	dispatch(obj: tEventData){
		window.top.postMessage({
			module: this.#module,
			...obj
		}, this.#host)
	}

	/**
	 * Subscribe listner
	 */
	subscribe(handler: Function){
		var self = this

		self.#subscribeHandler = function(event: MessageEvent){
			if (event.data.type === 'register') return // we dont want register events
			if (!event.data.module) return // we dont want none module events
			handler(event)
		}

		window.addEventListener('message', self.#subscribeHandler);
	}

	/**
	 * Unsubscribe listner
	 */
	unsubscribe(){
		window.removeEventListener('message', this.#subscribeHandler);
	}

	/**
	 * Displays all registered modules
	 */
	displayModules(){
		return [...this.#modules]
	}
}

window.Oracle = Oracle

