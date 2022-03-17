import Datastore from 'nedb-promises'
import { default as path } from 'path'

var dbs: {[key: string]:any} = {}

export default function db(dbKey:string) {
	if (dbs[dbKey]) {
		return dbs[dbKey]
	} else{
		let dir = path.resolve(__dirname,`../../../temp/${dbKey}.db`)
		//console.log(dir)
		return dbs[dbKey] = Datastore.create(path.resolve(dir))
	}
}

// var x = db('test')
// x.insert({test:123})
// .then(( data:any )=> console.log(data))

