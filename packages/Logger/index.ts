var winston = require('winston');
var WinstonGraylog2 = require('winston-graylog2');

type tServer = {
	host: string,
	port: number
}

type LoggerInput = {
	appName: string,
	facility: string,
	servers: tServer[],
	level: string,
	env: string
}

export default (LoggerInput: LoggerInput ) => {
	var options = {
		name: 'Graylog',
		level: LoggerInput.level,
		silent: false,
		handleExceptions: false,
		graylog: {
			servers: LoggerInput.servers,
			hostname: LoggerInput.appName,
			facility: LoggerInput.facility,
			bufferSize: 1400
		},
		staticMeta: {env: LoggerInput.env}
	};

	return winston.createLogger({
		exitOnError:false,
		transports: [
			new WinstonGraylog2(options)
		]
	})
	return {
		info: (text:any)=>{return text}
	}
}
