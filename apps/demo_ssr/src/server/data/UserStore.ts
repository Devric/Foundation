import { Joi, Model, iRepo } from './_baseModel'
import DB from './_db'


export class UserModel extends Model<{ id?:string, name: string, age: number }>() {
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

export class UserRepository implements iRepo<UserModel>{
	db: any
	constructor(){
		this.db = DB('user')
	}

	exists(filter:any ):Promise<boolean>{
		return new Promise(()=>{})
	}

	delete():Promise<boolean>{
		return new Promise(()=>{})
	}

	findById(id:string):Promise<UserModel>{
		return new Promise(()=>{})
	}

	insert(data: UserModel):Promise<boolean>{
		return this.db.insert(Object.assign({},data))
	}

	upsert(data: UserModel):Promise<boolean>{
		return this.db.insert(Object.assign({},data))
	}
}


 var z = new UserRepository()
 // console.log(z.exists({"id":"asdfasdfsfiej2303"}))
 
 z.insert(new UserModel({name:"john", age:5}))
 	.then((data:any)=> {
 		console.log(new UserModel(data))
 	})
