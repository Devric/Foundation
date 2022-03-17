import { Joi, Model, iRepo } from './_baseModel'
import DB from './_db'


export class UserModel extends Model<{ id?:string, email: string, pass: string }>() {
	save(){
		var val = this._validate(this)
		if (val.error) {
			console.log(val.error)
		} else {
			// save to server
		}
	}

	private _validate(data:any=null){
		var UserSchema = Joi.object({
			name: Joi.string().min(1),
			age: Joi.number()
		}).unknown(true)
		return UserSchema.validate(data || this)
	}
}

class UserRepository implements iRepo<UserModel>{
	db: any
	constructor(){
		this.db = DB('user')
	}

	delete():Promise<boolean>{
		return new Promise(()=>{})
	}

	findById(id:string):Promise<UserModel>{
		return new Promise(()=>{})
	}

	find(data:any):Promise<UserModel[]>{
		return this.db.find(data)
					.then((result:any)=> result.map((item:any)=>new UserModel(item)))
	}

	// TODO move verify password function

	// TODO move hash password here
	insert(data: UserModel):Promise<boolean>{
		return this.db.insert(Object.assign({},data))
	}

	upsert(data: UserModel):Promise<boolean>{
		return this.db.insert(Object.assign({},data))
	}

	update(data: UserModel):Promise<boolean>{
		return this.db.insert(Object.assign({},data))
	}
}

export let userRepository = new UserRepository()


//  var z = new UserRepository()
//  // console.log(z.exists({"id":"asdfasdfsfiej2303"}))
//  
//  z.insert(new UserModel({name:"john", age:5}))
//  	.then((data:any)=> {
//  		console.log(new UserModel(data))
//  	})
