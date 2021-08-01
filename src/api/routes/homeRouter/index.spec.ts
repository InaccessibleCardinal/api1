import { Request, Response } from 'express';
import { handleHome } from './';

describe('handleHome function', () => {
  it('should return hello world', async () => {
    const mockRequest = { url: '/' } as Request;
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn((data) => data),
    } as unknown as Response;
    return expect(handleHome(mockRequest, mockResponse)).resolves.toEqual({
      message: 'hello world.',
    });
  });
});
