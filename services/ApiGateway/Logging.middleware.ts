import morgan from 'morgan'
import Logger from './Logger'

export function SetupLogging(app: any) {
	// TODO decide on using pino express-pino-logger
	app.use(morgan('combined'))

	app.use((req: any, res: any, next:any)=> {
		Logger.info(JSON.stringify({
			headers: req.headers,
			body: req.body,
			query: req.query
		}))
		next()
	})
}

