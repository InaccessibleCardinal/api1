import { Request, Response } from 'express';
import { err, ok } from 'neverthrow';
import { getUsersFromDB } from '../../services/usersService';
import { handleUsers } from './';

jest.mock('../../services/usersService', () => {
  return {
    getUsersFromDB: jest.fn(),
  };
});

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn((data) => data),
} as unknown as Response;

afterEach(jest.restoreAllMocks);

describe('handleUsers function', () => {
  it('should respond with users', async () => {
    const mockUsers = [{ gender: 'f' }, { gender: 'm' }];
    const mockUsersResult = ok(mockUsers);
    (getUsersFromDB as jest.Mock).mockResolvedValueOnce(mockUsersResult);
    await handleUsers(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should respond with a 500', async () => {
    const mockErrResult = err(new Error('you mad'));
    (getUsersFromDB as jest.Mock).mockResolvedValueOnce(mockErrResult);
    await handleUsers(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'you mad' });
  });
});
