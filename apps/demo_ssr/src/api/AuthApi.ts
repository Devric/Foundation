import { Request, Response, Router, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import passport from 'passport'
import {Strategy as localStrategy} from 'passport-local'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

import { UserModel, userRepository } from  '../server/data/UserStore'
import DB from '../server/data/_db'



const router = Router();

const tempAppSecret = 'shhhhh'

const userDb = DB('user')

class NotFoundError extends Error {}

/**
 * Login
 * ==================================
 */
passport.use(new localStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try{
		// Find user
		let dbUser = await userDb.find({email: email})

		// expect record in collection unique
		if (dbUser.length !== 1) throw new Error('Incorrect user or password');

		// check user password
		const validPass = await bcrypt.compare(password, dbUser[0].pass)
		console.log(validPass)

		if (!validPass) throw new Error('Incorrect user or password');

		const token = jwt.sign({
			id: dbUser[0]._id,
			email: dbUser[0].email,
			meta: { msg: "some message" }
		}, tempAppSecret, { expiresIn: '15m'})


		done(null,{user:{
			email: email,
			token: token
		}})
		// res.header("token", token).send({"token": token})
	} catch (err) { done(err) }

}));

// use passport local rules and return passport local done(user)
router.post('/login', passport.authenticate('local'), async (req: Request, res: Response, next: NextFunction) => { res.json(req.user)});

/**
 * Register
 * ==================================
 */
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			email = "",
			pass = ""
		} : {email:string, pass:string} = req.body

		// @TODO validate email

		// check existing user before continue
		let existingUser: UserModel[] = await userRepository
									.find({email: email})

		// email should be unique, therefore no user should be found
		// TODO error types
		if (existingUser.length) throw new Error("Incorrect User or password found")

		// Hash Password
		// TODO password validation
		if (pass === null) throw new Error("Incorrect User or password found")

		const salt:string = await bcrypt.genSalt(10)
		const hashPassword:string = await bcrypt.hash(pass, salt)

		// create user object
		var user: UserModel = await new UserModel({email:email, pass:hashPassword})

		var createdUser = await userRepository.insert(user)

		res.status(200).send('User created please login');
	} catch(err) { next(err) }
});


export default router;

interface UserRequest extends Request{
	user: string
}

// middleware for other routes to verify if jwt user has permission
export function authenticatedMiddleware(level: string) {
	return function (req: UserRequest,res: Response,next: Function) {
		let token = req.header("Authorization")
		if (!token) return res.status(401).send("Access Denied")

		try {
			if (token.startsWith('Bearer ')) token = token.slice(7, token.length).trimLeft();

			const verified = jwt.verify(token, tempAppSecret)

			// check user permission
			let isAdmin = level === 'admin'

			req.user = "verified user"
			next()
		} catch (err) {
			return res.status(400).send("Invalid user permission")
		}
	}
}


// passport.use(new JWTStrategy({secretOrKey: tempAppSecret, issuer:"a@a.com", jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()}, (jwt_payload:any, done: Function) => {
// 	console.log('payload   - ', jwt_payload)
// 
// 	done(null, false)
// }))

export { passport }
