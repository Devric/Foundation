import { createProxyMiddleware } from 'http-proxy-middleware'

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

function entries<T>(obj: T): Entries<T> {
  return Object.entries(obj) as any;
}

class LoadBalancer {
	private _ROUND_INDEX:number = 0

	constructor() {}

	public ROUND_ROBIN(services:any=[]):string {
		let target = this._ROUND_INDEX

		// if more than one, start round robbin, otherwise just return index 0
		if (services.length > 1){
			let newIndex = ++this._ROUND_INDEX >= services.length ? 0 : this._ROUND_INDEX

			// increment index
			this._ROUND_INDEX = newIndex
		}
		return services[target]
	}

	// TODO
	public ROUND_ROBIN_WEIGHTED() {}
	public LEAST_CONNECTIONS() {}
	public LEAST_CONNECTIONS_WEIGHTED() {}
	public IP_HASH() {}
	public RANDOM() {}
	public URL_BASED() {}
	public GEO_BASED() {}
	public CONTENT_BASED() {}
	public DYNAMIC() {}
}

export function SetupLoadBalancer(app: any, routes: any) {
	// forward by routes
	for (const [key,val] of entries(routes)){
		var LB = new LoadBalancer()

		app.use(key, (req:any, res:any, next:any)=>{
			let target = LB.ROUND_ROBIN(val.targets)
			createProxyMiddleware(target)(req,res,next)
		})

		//app.use('/posts', createProxyMiddleware('http://localhost:9999'))
		//app.use('/comments', createProxyMiddleware('http://localhost:9999'))
	}
}
