import {Request, Response, Router} from 'express'
import AuthApi, {passport} from './AuthApi'
import TestApi from './TestApi'

const router = Router()

router.use('/test', TestApi)
router.use('/auth', AuthApi)


//router.use('/pass', passport.authenticate('jwt', { session: false}), TestApi)
//router.use(passport.initialize())

passport.serializeUser((user:any,done)=>done(null,user))
passport.deserializeUser((user:any,done)=>done(null,user))

// api router will now load all passport strategy rules
router.use(passport.initialize())

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'hi, you not suppose to be here',
  });
});

export default router
