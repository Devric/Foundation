import {
	EventStoreDBClient,
	jsonEvent,
	//FORWARDS,
	//START,
	JSONEventType,
	//EventType
} from "@eventstore/db-client";

const client = new EventStoreDBClient({
	endpoint: "http://127.0.0.1:2113",
});

// interface Reservation {
// 	reservationId: string;
// 	movieId: string;
// 	userId: string;
// 	seatId: string;
// }

type SeatReservedEvent = JSONEventType<
"seat-reserved",
{
	reservationId: string;
	movieId: string;
	userId: string;
	seatId: string;
}
>;

// type SeatChangedEvent = JSONEventType<
// "seat-changed",
// {
// 	reservationId: string;
// 	newSeatId: string;
// }
// >;

//type ReservationEvents = SeatReservedEvent | SeatChangedEvent;

async function simpleTest(): Promise<void> {
	const streamName = "booking-abc123";

	const event = jsonEvent<SeatReservedEvent>({
		type: "seat-reserved",
		data: {
			reservationId: "abc123",
			movieId: "tt0368226",
			userId: "nm0802995",
			seatId: "4b",
		},
	});

	const appendResult = await client.appendToStream(streamName, event);
	console.log(appendResult)

	/*
	const events = await client.readStream<ReservationEvents>(streamName, {
		fromRevision: START,
		direction: FORWARDS,
		maxCount: 10,
	});

	const reservation: Partial<Reservation> = {};

	for (const { event<EventType> } of events) {
		switch (event.type) {
			case "seat-reserved": {
				reservation.reservationId = event.data.reservationId;
				reservation.movieId = event.data.movieId;
				reservation.seatId = event.data.seatId;
				reservation.userId = event.data.userId;
				break;
			}
			case "seat-changed": {
				reservation.seatId = event.data.newSeatId;
				break;
			}
			default: {
				const _exhaustiveCheck: never = event;
				break;
			}
		}
	}
	*/
}
simpleTest().then(result => {
	console.log(result)
})
