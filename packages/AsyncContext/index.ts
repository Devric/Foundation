import { AsyncLocalStorage } from 'async_hooks'

let storage = new AsyncLocalStorage()

export default class AsyncContext<T> {
	costructor() {
		storage = new AsyncLocalStorage()
	}

	setContext(store:T):void {
		storage.enterWith(store);
	}

	getContext():T {
		return storage.getStore() as T;
	}
}

