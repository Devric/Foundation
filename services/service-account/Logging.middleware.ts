import morgan from 'morgan'

export function SetupLogging(app: any) {
	// TODO decide on using pino express-pino-logger
	app.use(morgan('combined'))
}

