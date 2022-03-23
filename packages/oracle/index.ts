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


interface iModule {
	module: string
	actions: string[]
	origin: string
	host?: string
}

type tEventData = {
	module: string;
	action: string;
	value: any;
}

// TODO convert this to typescript
(function(window){
	let _host            : string,
		_allowedOrigins  : string[],
		_module          : string,
		_modules         : iModule[]=[],
		_origins		 : string[],
		subscribeHandler : any
	;

	// Constructor
	// ===============================
	window.Oracle = function Oracle(origins: string[]){
		// should be type chcked from d.ts
		_origins = origins
	}

	// For host to create, Remote may cause cross origin error message
	window.Oracle.prototype.createHost = function createHost(origins: string[]){
		var self = this;

		_allowedOrigins = origins // ["http://127.0.0.1:4444","http://127.0.0.1:4445"]

		// Register host listener
		window?.top?.addEventListener('message', event => {
			// block anything that is not in origins
			if (!_allowedOrigins.includes(event?.origin)) return

			// listen for register event
			if (event.data.type === 'register') {
				let mod = event.data.module
				_modules.push({
					module: mod,
					actions: event.data.actions,
					origin: event.origin
				})
				return // we do not want register event to continue
			}

			// ignore anything that is not registered
			if (!_modules.map(mod=>mod.module).includes(event.data.module)) return

			// Broadcast to all registered modules
			// modules are registered by iframes
			document.querySelectorAll('iframe').forEach(function(frame){
				var frameOrigin = new URL(frame.src).origin
				if (!_allowedOrigins.includes(frameOrigin)) return // we dont want to sent it to other iframes
				frame?.contentWindow?.postMessage(event.data, frameOrigin)
			})
		})
	}

	// Remote module to register into HOST
	// Through localWindow postMessage
	window.Oracle.prototype.register = function register(registerOpt: iModule){
		_host = registerOpt.host
		_module = registerOpt.module
		window.top.postMessage({
			type: 'register',
			module: registerOpt.module,
			actions: registerOpt.actions
		}, registerOpt.host)
	}

	// Remote module to publish into HOST
	window.Oracle.prototype.dispatch = function publish(obj: tEventData){
		window.top.postMessage({
			module: _module,
			...obj
		}, _host)
	}

	// this is a local subscribe
	// TODO consider allow multiple subscriptions
	window.Oracle.prototype.subscribe = function(handler: Function){
		var self = this

		subscribeHandler = function(event: MessageEvent){
			if (event.data.type === 'register') return // we dont want register events
			if (!event.data.module) return // we dont want none module events
			handler(event)
		}

		window.addEventListener('message', subscribeHandler);
	}

	window.Oracle.prototype.unsubscribe = function(){
		window.removeEventListener('message', subscribeHandler);
	}

	// return read only modules,
	// Used at parent contaienr, to list everything
	window.Oracle.prototype.displayModules = function() {
		return [..._modules]
	}

})(this)

// var handlers = {};
// window.publish = function (topic, message) {
//     window.dispatchEvent(new CustomEvent('pubsub', {
//         detail: { topic: topic, message: message }
//     }));
// };
// window.subscribe = function (topic, handler) {
//     var topicHandlers = handlers[topic] || [];
//     topicHandlers.push(handler);
//     handlers[topic] = topicHandlers;
// };
// window.unsubscribe = function (topic, handler) {
//     var topicHandlers = handlers[topic] || [];
//     var index = topicHandlers.indexOf(handler);
//     index >= 0 && topicHandlers.splice(index, 1);
// };
// window.addEventListener('pubsub', function (ev) {
//     var _a = ev.detail, topic = _a.topic, message = _a.message;
//     var topicHandlers = handlers[topic] || [];
//     topicHandlers.forEach(function (handler) { return handler(message); });
// });
