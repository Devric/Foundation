const avro = require('avsc');

const type = avro.Type.forSchema({
  type: 'record',
  name: 'test',
  namespace: 'example',
  fields: [
    {name: 'kind', type: {type: 'enum', symbols: ['CAT', 'DOG']}},
    {name: 'name', type: 'string'}
  ]
});

exports.default = type
// 
// const buf = type.toBuffer({kind: 'CAT', name: 'Albert'}); // Encoded buffer.
// const val = type.fromBuffer(buf); // = {kind: 'CAT', name: 'Albert'}
// console.log(buf)
// console.log(val)
// console.log(buf.length)
// console.log(JSON.stringify(val).length)
