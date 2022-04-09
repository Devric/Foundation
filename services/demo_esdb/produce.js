let {
	EventStoreDBClient,
	jsonEvent,
	FORWARDS,
	START,
	JSONEventType,
	//EventType
} = require( "@eventstore/db-client" );

// const client = new EventStoreDBClient({ endpoint: "http://localhost:2113", });

const client = EventStoreDBClient.connectionString`esdb://admin:changeit@127.0.0.1:2113?tls=false`;

async function simpleTest() {
  const streamName = "es_supported_clients";

  const event = jsonEvent({
    type: "grpc-client",
    data: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });


  const appendResult = await client.appendToStream(streamName, [event]);
}

simpleTest()
