import {Router} from 'express'
import TestApi from './TestApi'

const router = Router()

router.use('/', TestApi)

export default router
