// Producer
console.log('producer')

let kafka = require('../kafka').default
let eventType = require('../eventType').default

const producer = kafka.producer()

const run = async () => {
	// Producing
	await producer.connect()

	const event = {
		kind: "DOG",
		name: "Wally"
	}


	setInterval(async ()=>{
		await producer.send({
			topic: 'test',
			messages: [
				{ value: 'Hello KafkaJS user!' },
			],
		})
	}, 3000)
}

run().catch(console.error)
