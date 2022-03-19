import {Request, Response, NextFunction, Router} from 'express'
import AuthApi, {
	passport,
	jwtRefreshMiddleware
} from './AuthApi'
import TestApi from './TestApi'

const router = Router()

router.use(jwtRefreshMiddleware)  // ANY '/api' route should refresh JWT

router.use('/test', TestApi)
router.use('/auth', AuthApi)

// api router will now load all passport strategy rules
passport.serializeUser((user:any,done)=>done(null,user))
passport.deserializeUser((user:any,done)=>done(null,user))
router.use(passport.initialize())

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'hi, you not suppose to be here',
  });
});

export default router
