let {SchemaRegistry, readAVSCAsync, SchemaType} = require('@kafkajs/confluent-schema-registry')

const registry = new SchemaRegistry({
  host: "http://localhost:8085",
});

const registerSchema = async (avsc) => {
	try {
		const schema = await readAVSCAsync(avsc);

		const { id } = await registry.register({
			type: SchemaType.AVRO,
			schema: JSON.stringify(schema)
		});

		return id;
	} catch (e) {
		console.log(e);
	}
}

async function run() {
	let x = await registerSchema('./AnimalSchema.avsc');
	console.log(x)
	// var buf = await registry.encode(143, {"kind":"CAT", "name":"wally"})
	// var val = await registry.decode(buf)

	// console.log(buf)
	// console.log(val)


	// get ID by subject
	// const subject = 'com.example.Simple'
	// const id = await registry.getLatestSchemaId(subject)

	// GET schema by ID
	// const schema = await registry.getSchema(id)

	// get ID by Schema
	// const subject = 'com.example.Simple'
	// const schema = await avdlToAVSCAsync('path/to/protocol.avdl')
	// const id = await registry.getRegistryIdBySchema(subject, { type: SchemaType.AVRO, schema: JSON.stringify(schema) })
};
run()
 
exports.default = registerSchema

