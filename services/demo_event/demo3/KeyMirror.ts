/**
* Create KEY VALUE pair from array
*
* Usage
*
* let EVENT = create(['a','b'])
* // -> {a: 'a', b: 'b'}
* EVENT.a === 'a'
* EVENT.b === 'b'
*
* extend(EVENT, ['e'])
* EVENT.e === 'e'
*
* @param list: string[]
*/

export function create(list:string[]) {
	var obj:any = {}
	list.forEach( (item:string) => {
		obj[item] = item
	})
	return obj
}

/**
* EXTEND object with new key value pairs
*
* Usage
*
* extend(EVENT, ['e'])
* EVENT.e === 'e'
*
* @param baseObj: any
* @param list: string[]
*/

export function extend(baseObj:any, list:string[]){
	return Object.assign(baseObj, create(list))
}
