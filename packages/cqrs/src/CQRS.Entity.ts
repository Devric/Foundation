/**
 * Entity
 *
 * @category Entity
 * @subcategory All
 */

interface iEntityProp {
	readonly _id?: string
	createdAt?: Date
	updatedAt?: Date
}

interface makeEntity<T> {
	():T;
	<K extends keyof T>(props: K): T[K];
}

export abstract class Entity<T extends iEntityProp> {
	updatedAt: Date = new Date()
	readonly createdAt: Date = new Date()

	constructor(props: T) {
		if (!props._id) {
			props = Object.assign({_id:uuid()}, props)
		}
		Object.assign(this, props)
	}

	// CRUD
	update(props?: Partial<Omit<T, "_id, createdAt">>) {
		// TODO this should come from db, not class
		// props.updatedAt = new Date()
		Object.assign(this, props)
	}

	// validate should be called explicitly when using, this can be done via external classes
	abstract validate(props?:any): boolean

	// Transform
	asJson() { return JSON.stringify(this) }
	asObject() { return Object.assign({}, this) }
}

/**
 * UUID
 *
 * @Category Utility
 */
function uuid() {
    var h=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var k=['x','x','x','x','x','x','x','x','-','x','x','x','x','-','4','x','x','x','-','y','x','x','x','-','x','x','x','x','x','x','x','x','x','x','x','x'];
    var u='',i=0,rb=Math.random()*0xffffffff|0;
    while(i++<36) {
        var c=k[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
        u+=(c=='-'||c=='4')?c:h[v];rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
    }
    return u
}

