import DB from '../src/server/data/_db'

import {UserModel, userRepository} from '../src/server/data/UserStore'

// 1# initialise
var userDb = DB('user')



// 2# clear all data
userDb.remove({}, { multi: true }).then(( data:any )=> console.log(data));

// 3# seed
// bob:bob
userRepository.insert(new UserModel({email:"bob", pass:"$2b$10$cLDGk/.01rWCnGHliP18ouUSouH9n/E9DBYK3K80fSm7E/ePgiAWK"}))
