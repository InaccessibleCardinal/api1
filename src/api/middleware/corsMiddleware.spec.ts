import { Request, Response, NextFunction } from 'express';
import corsMiddlware from './corsMiddleware';

const mockRes = {
  headers: {},
  setHeader: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn() as NextFunction;

describe('corsMiddlware function', () => {
  it('should set headers and call next', () => {
    const req = {} as Request;
    corsMiddlware(req, mockRes, mockNext);
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Origin',
      '*'
    );
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, DELETE'
    );
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
