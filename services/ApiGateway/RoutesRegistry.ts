import { eSTRATEGIES, tProxy, tRateLimit, iRoute, tRoute  } from './types'

export class Route implements iRoute {
	strategy: eSTRATEGIES = eSTRATEGIES.ROUND_ROBIN
	targets: String[] = ['']
	rateLimit: tRateLimit = { window: 15 * 60 * 1000, max: 5 }
	proxy: tProxy = { changeOrigin: false, pathRewrite: null}
	auth: boolean = false
	constructor(route: tRoute) {
		Object.assign(this, route)
	}
}

export default {
	'/posts': new Route({
		url: '',
		strategy: eSTRATEGIES.ROUND_ROBIN,
		targets: [ 'http://localhost:9999', 'http://localhost:9998' ]
	}),
	'/comments': new Route({
		url: '',
		strategy: eSTRATEGIES.ROUND_ROBIN,
		targets: [ 'http://localhost:9999', 'http://localhost:9998' ]
	}),
	'/testProxy': new Route({
		url: '',
		strategy: eSTRATEGIES.ROUND_ROBIN,
		targets: [ 'https://www.google.com' ],
	}),
}

