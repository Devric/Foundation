type tCartProp = {
	_id?: string
	qty:number
}
class Cart extends Entity<tCartProp> implements tCartProp {
	_id?: string
	qty: number = 0

	constructor(prop?:tCartProp) {
		// define default if prop is allowed to be undefined
		if ( !prop ) {
			prop = { qty: 0 }
		}

		super(prop)
	}

	validate(updateProps?:any) {
		console.log("validate:", updateProps || this.asObject())
		return true
	}

	// computed
	get $price() {
		return 100
	}
}

var x = new Cart()
console.log(x._id)
console.log(x.$price)
console.log(x.asObject())
// test the updateAt date time
setTimeout(()=>{
	let input = {qty: 5}
	x.validate(input)
	x.update(input)
	console.log(x.asObject())

	x.qty = 500
	x.validate()
	x.update()
	console.log(x.asObject())
}, 1000)
