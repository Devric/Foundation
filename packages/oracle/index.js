"use strict";
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
// Old copy directly injects to window
(function (window) {
    let _host, _allowedOrigins, _module, _modules = [], _origins, subscribeHandler;
    // Constructor
    // ===============================
    window.Oracle = function Oracle(origins) {
        // should be type chcked from d.ts
        _origins = origins;
    };
    // For host to create, Remote may cause cross origin error message
    window.Oracle.prototype.createHost = function createHost(origins) {
        var _a;
        var self = this;
        _allowedOrigins = origins; // ["http://127.0.0.1:4444","http://127.0.0.1:4445"]
        // Register host listener
        (_a = window === null || window === void 0 ? void 0 : window.top) === null || _a === void 0 ? void 0 : _a.addEventListener('message', event => {
            // block anything that is not in origins
            if (!_allowedOrigins.includes(event === null || event === void 0 ? void 0 : event.origin))
                return;
            // listen for register event
            if (event.data.type === 'register') {
                let mod = event.data.module;
                _modules.push({
                    module: mod,
                    actions: event.data.actions,
                    origin: event.origin
                });
                return; // we do not want register event to continue
            }
            // ignore anything that is not registered
            if (!_modules.map(mod => mod.module).includes(event.data.module))
                return;
            // Broadcast to all registered modules
            // modules are registered by iframes
            document.querySelectorAll('iframe').forEach(function (frame) {
                var _a;
                var frameOrigin = new URL(frame.src).origin;
                if (!_allowedOrigins.includes(frameOrigin))
                    return; // we dont want to sent it to other iframes
                (_a = frame === null || frame === void 0 ? void 0 : frame.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(event.data, frameOrigin);
            });
        });
    };
    // Remote module to register into HOST
    // Through localWindow postMessage
    window.Oracle.prototype.register = function register(registerOpt) {
        _host = registerOpt.host;
        _module = registerOpt.module;
        window.top.postMessage({
            type: 'register',
            module: registerOpt.module,
            actions: registerOpt.actions
        }, registerOpt.host);
    };
    // Remote module to publish into HOST
    window.Oracle.prototype.dispatch = function publish(obj) {
        window.top.postMessage(Object.assign({ module: _module }, obj), _host);
    };
    // this is a local subscribe
    // TODO consider allow multiple subscriptions
    window.Oracle.prototype.subscribe = function (handler) {
        var self = this;
        subscribeHandler = function (event) {
            if (event.data.type === 'register')
                return; // we dont want register events
            if (!event.data.module)
                return; // we dont want none module events
            handler(event);
        };
        window.addEventListener('message', subscribeHandler);
    };
    window.Oracle.prototype.unsubscribe = function () {
        window.removeEventListener('message', subscribeHandler);
    };
    // return read only modules,
    // Used at parent contaienr, to list everything
    window.Oracle.prototype.displayModules = function () {
        return [..._modules];
    };
})(this);
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
