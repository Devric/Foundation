import Datastore from 'nedb-promises'

var dbs: {[key: string]:any} = {}

export default function db(dbKey:string) {
	if (dbs[dbKey]) {
		return dbs[dbKey]
	} else{
		return dbs[dbKey] = Datastore.create(`../../../temp/${dbKey}.db`)
	}
}

// var x = db('test')
// x.insert({test:123})
// .then(( data:any )=> console.log(data))

