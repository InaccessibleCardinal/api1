import path from 'path';
import { err } from 'neverthrow';
import { getUsersFromDB } from './';
import readFromDb from '../../utils/readFromDb';

jest.mock('../../utils/readFromDb', () => {
  return {
    default: jest.fn(),
    __esModule: true,
  };
});

jest.mock('path', () => {
  return {
    join: jest.fn()
  };
});

describe('getUsersFromDB function', () => {
  it('should read users from the db and return users', async () => {
    const mockUsers = [{ gender: 'f' }, { gender: 'm' }];
    const mockBuffer = Buffer.from(JSON.stringify(mockUsers));
    (readFromDb as jest.Mock).mockResolvedValueOnce(mockBuffer);

    const usersResponse = await getUsersFromDB();
    expect(usersResponse.isOk()).toBe(true);
    if (usersResponse.isOk()) {
      expect(usersResponse.value).toEqual(mockUsers);
    }
    expect(path.join).toHaveBeenCalledWith(__dirname, `../../${process.env.USERS_DB}`);
  });

  it('should return an err result', async () => {
    const error = new Error('you mad');
    (readFromDb as jest.Mock).mockRejectedValueOnce(error);
    return expect(getUsersFromDB()).resolves.toEqual(err(error));
  });
});
