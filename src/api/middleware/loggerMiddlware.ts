import { Request, Response, NextFunction } from 'express';
import { logInfo } from '../utils/log';

export default function loggerMiddlware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logInfo(req.url, req.method);
  next();
}
