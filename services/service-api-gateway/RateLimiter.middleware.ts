import rateLimit from "express-rate-limit"
import { eSTRATEGIES, tProxy, tRateLimit, iRoute  } from './types'
import {Route} from './RoutesRegistry'

export function setupRateLimit(app:any, routes: {[key:string]: Route} ) {
	// routes.forEach((r: Route) => {
	// 	if (r.rateLimit) {
	// 		app.use(r.url, rateLimit(r.rateLimit));
	// 	}
	// })
}
