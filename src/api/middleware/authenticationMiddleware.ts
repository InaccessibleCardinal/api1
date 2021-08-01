import { Request, Response, NextFunction } from 'express';

export default function authenticationMiddlware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { headers } = req;
  if (!headers.authorization) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  return next();
}
