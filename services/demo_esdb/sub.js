let {
	EventStoreDBClient,
	jsonEvent,
	FORWARDS,
	START,
	JSONEventType,
    END,
	//EventType
} = require( "@eventstore/db-client" );

// const client = new EventStoreDBClient({ endpoint: "http://localhost:2113", });

const client = EventStoreDBClient.connectionString`esdb://admin:changeit@127.0.0.1:2113?tls=false`;

async function simpleTest() {
	// #1 From the begining
	// const subscription = client.subscribeToStream("es_supported_clients");

	// #2 From the end of the queue
	// const subscription = client.subscribeToStream("es_supported_clients", {
	// 	fromRevision: END
	// });

	// #3 From postition
	const subscription = client.subscribeToStream("es_supported_clients", {
		fromRevision: BigInt(3)
	});

	for await (const resolvedEvent of subscription) {
		console.log( `Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`);
		console.log(resolvedEvent.event.data)
		// await handleEvent(resolvedEvent);
	}
}

simpleTest()
