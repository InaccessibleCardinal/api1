import { Request, Response, NextFunction } from 'express';
import loggerMiddlware from './loggerMiddlware';

const mockReq = {
  method: 'GET',
  url: '/',
} as Request;

const mockRes = {} as Response;

const mockNext = jest.fn() as NextFunction;

jest.spyOn(console, 'info');

describe('loggerMiddlware function', () => {
  it('should log url and method', () => {
    loggerMiddlware(mockReq, mockRes, mockNext);
    expect(console.info).toHaveBeenCalledWith('/', 'GET');
  });
});
