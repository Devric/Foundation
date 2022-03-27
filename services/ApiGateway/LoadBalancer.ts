class LoadBalancer {
	constructor() {}

	ROUND_INDEX:number = 0
	ROUND_ROBIN(services:any=[]):string {
		let target = this.ROUND_INDEX

		// if more than one, start round robbin, otherwise just return index 0
		if (services.length > 1){
			let newIndex = ++this.ROUND_INDEX >= services.length ? 0 : this.ROUND_INDEX

			// increment index
			this.ROUND_INDEX = newIndex
		}
		return services[target]
	}
}

export default LoadBalancer
