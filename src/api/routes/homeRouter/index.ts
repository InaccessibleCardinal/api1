import { Router, Request, Response } from 'express';
import Routes from '../../types/Routes';

const homeRouter = Router();

export async function handleHome(req: Request, res: Response) {
  return res.status(200).json({ message: 'hello world.' });
}

homeRouter.get(Routes.HOME, handleHome);

export default homeRouter;
