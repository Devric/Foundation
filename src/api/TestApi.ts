import { Request, Response, Router } from 'express';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to API',
  });
});

export default router;
