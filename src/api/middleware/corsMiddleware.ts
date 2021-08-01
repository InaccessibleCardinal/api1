import { Request, Response, NextFunction } from 'express';

function setCorsHeaders(res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default function corsMiddlware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  setCorsHeaders(res);
  next();
}
