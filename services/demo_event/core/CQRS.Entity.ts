export abstract class Entity<T> {
	protected readonly _id: string
	protected props: T

	constructor(props: T, id?:string) {
		this.props = props
		this._id = id ? id : uuid() // TODO should _id handled this way?
	}

	update() {}

	validate() {}

	toJson() {
		return JSON.stringify(this)
	}

	toObject() {
		return Object.assign({}, this)
	}

}

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

