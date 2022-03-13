import { Request, Response, Router } from 'express';

const router = Router();

var name: string = "no name"
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
