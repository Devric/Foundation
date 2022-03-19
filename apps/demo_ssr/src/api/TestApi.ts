import { Request, Response, Router } from 'express';
import { authoriseMiddleware } from './AuthApi'

const router = Router();

var name: string = "no name"
router.use(authoriseMiddleware('admin'))

router.get('/name', (req: Request, res: Response) => {
	res.send(name);
});
router.post('/name', (req: Request, res: Response) => {
	name = req.body.data
	res.status(200).send('ok');
});

router.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'Welcome to API',
	});
});

export default router;
