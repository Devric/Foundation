import {Request, Response, Router} from 'express'
import TestApi from './TestApi'

const router = Router()

router.use('/test', TestApi)

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'hi, you not suppose to be here',
  });
});

export default router
