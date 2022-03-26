const { Kafka } = require('kafkajs')

exports.default = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092']
})


