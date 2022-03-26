// Consumer
console.log('consumer')

let kafka = require('../kafka').default

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
	// Consuming
	await consumer.connect()
	await consumer.subscribe({ topic: 'test', fromBeginning: true })

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				partition,
				offset: message.offset,
				value: message.value.toString(),
			})
		},
	})
}

run().catch(console.error)
