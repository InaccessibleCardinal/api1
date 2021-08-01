import { Request, Response, NextFunction } from 'express';
import authenticationMiddlware from './authenticationMiddleware';

const mockReq = {
  headers: {},
} as unknown as Request;
const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn() as NextFunction;

afterEach(jest.resetAllMocks);

describe('authenticationMiddlware function', () => {
  it('should respond with a 400 error', () => {
    authenticationMiddlware(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bad Request' });
  });

  it('should just call next', () => {
    const req = { headers: { authorization: 'someauth' } } as Request;
    authenticationMiddlware(req, mockRes, mockNext);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
