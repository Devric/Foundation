export enum eSTRATEGIES {
	ROUND_ROBIN = 'ROUND_ROBIN'
}

export type tRateLimit = {
	window: number,
	max: number
}

export type tProxy = {
	changeOrigin: boolean,
	pathRewrite?: { [k:string]: String } | null,
}

export type tRoute = {
	url?: String
	strategy: eSTRATEGIES,
	targets: String[],
	rateLimit?: tRateLimit,
	proxy?: tProxy,
	auth?: boolean
}

export interface iRoute {
	strategy: eSTRATEGIES
	targets: String[]
	rateLimit: tRateLimit
	proxy: tProxy
	auth: boolean
}
