import createLogger from 'Logger'

export type log = {

}

export default createLogger({
	appName: 'API Gateway',
	facility:'Foundation',
	servers: [{host: 'localhost', port: 12201}],
	level: 'debug',
	env:'dev'
})
