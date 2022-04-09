// Producer
console.log('producer')

const kafka = require('../kafka').default
const eventType = require('../eventType').default
const registerSchema = require('../SchemaRegistry').default
const createTopic = require('../createTopic').default

const producer = kafka.producer()

const run = async () => {
	// Producing
	await producer.connect()

	await createTopic()
	// await registerSchema('./AnimalSchema.avsc');

	let num = 0
	setInterval(async ()=>{
		await producer.send({
			topic: 'test',
			messages: [
				{
					value: eventType.toBuffer({kind: 'CAT', name: `Albert-${++num}`})
				}
				, // {kind: 'DOG', name: 'Wally'}
			],
		})
	}, 100)
}

run().catch(console.error)
