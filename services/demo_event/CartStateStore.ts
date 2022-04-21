// demo StateStore
export namespace CORE {
	export interface IStore {
		get():any
		set():boolean
	}

	export class StateStore<T> implements IStore {
		revision: number = 0
		state: T = {} as T

		get() {
			return {...this}
		}

		set() {
			// this.revision = payload.revision

			return true
		}
	}

	export class Respository<IStore> {
		
	}
}

