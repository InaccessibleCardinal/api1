import { Router, Request, Response } from 'express';
import Routes from '../../types/Routes';
import { getUsersFromDB } from '../../services/usersService';

const usersRouter = Router();

export async function handleUsers(req: Request, res: Response) {
  const usersResult = await getUsersFromDB();
  usersResult
    .map((users) => res.status(200).json(users))
    .mapErr((err) => res.status(500).json({ message: err.message }));
}

usersRouter.get(Routes.USERS, handleUsers);

export default usersRouter;
