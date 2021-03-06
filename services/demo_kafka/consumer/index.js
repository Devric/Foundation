// Consumer
console.log('consumer')

const kafka = require('../kafka').default
const eventType = require('../eventType').default

const consumer = kafka.consumer({ groupId: 'test-group-3' })

const run = async () => {
	// Consuming
	await consumer.connect()
	await consumer.subscribe({ topic: 'test', fromBeginning: true })

	await consumer.run({
		autoCommit: false,
		eachMessage: async ({ topic, partition, message }) => {
			console.log(
				eventType.fromBuffer(message.value)
			)

			console.log({
				partition,
				offset: message.offset,
				// value: message.value.toString(),
			})
		},
	})
}

run().catch(console.error)
