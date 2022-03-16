export { default as Joi } from 'joi'

/** 
 * 
 * auto implement modle type https://github.com/microsoft/TypeScript/issues/38442
 * instead of defining the property and assigning manully from constructor
 * 	class User {
 * 		name: string;
 * 		age: number
 * 		constructor({ {name,age}: { name: string, age:number } }) {
 *			this.name = name
 *			this.age = age
 * 		}
 * 	}
 *  new UserModel({name:"xyz", age:5})
 *
 * Usage
 *
 * interface Data { name: string, age: number}
 * class UserModel extends Model<Data>() { }
 *
 * new UserModel({name:"xyz", age:5})
 *
 */

export function Model<T>() {
    return class {
        constructor(data: T) {
            Object.assign(this, data)
        }
    } as new (data: T) => T
}

export interface iRepo<T> {
	exists(t: T): Promise<boolean>;
	delete(t: T): Promise<any>;
	findById(id: string): Promise<T>;
	insert(t: T): Promise<any>;
	upsert(t: T): Promise<any>;
}

