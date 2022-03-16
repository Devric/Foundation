import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserRepository } from  '../server/data/UserStore'

const router = Router();

const tempAppSecret = 'shhhhh'

class NotFoundError extends Error {}

/**
 * Login
 * ==================================
 */
var name: string = "no name"
router.post('/login', async (req: Request, res: Response) => {
	const {
		pass  = null,
		email = null
	} = req.body

	try {
		// Find user
		var user = {
			id: 'bob',
			password: '1234'
		}

		// // check user password
		// const vallidPass = await bcrypt.compare(pass, user.password)

		// if (!vallidPass) return res.status(400).send('Incorrect password');

		const token = jwt.sign({
			id: user.id,
			meta: { msg: "some message" }
		}, tempAppSecret, { expiresIn: '15m'})

		res.header("token", token).send({"token": token})
	} catch (err) {
		if (err instanceof NotFoundError) {
			res.status(401).send("Email/Password incorrect")
		} else {
			res.status(500).send("Error loging in")
		}
	}
});


/**
 * Register
 * ==================================
 */
router.post('/register', async (req: Request, res: Response) => {
	const {
		password = null,
		email    = null
	} = req.body

	// check existing user before continue

	// Hash Password
	if (password === null) return
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	// create user object

	// send back message
	res.status(200).send('ok');
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

