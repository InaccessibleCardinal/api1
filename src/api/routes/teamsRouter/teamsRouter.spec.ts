import { Request, Response } from 'express';
import { ResultAsync } from 'neverthrow';
import getTeam from '../../services/teams-service';
import { handleTeam } from './';
import { mockPlayers, mockTeam } from './__mocks__/mockTeam';

jest.mock('../../services/teams-service', () => {
  return {
    default: jest.fn(),
    __esModule: true,
  };
});

const mockReq = { params: { teamId: '119' } } as unknown as Request;
const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn((data) => data)
} as unknown as Response;
const mockNext = jest.fn();

afterEach(jest.restoreAllMocks);

describe('handleTeam function', () => {
  it('should return a team with players', async () => {
    (getTeam as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(Promise.resolve({ team: mockTeam, players: mockPlayers }), () => null)
    );
    await handleTeam(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(
      { team: mockTeam, players: mockPlayers }
    ));
  });

  it('should handle an error', async () => {
    (getTeam as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(Promise.reject(new Error('you mad')), (e) => e)
    );
    await handleTeam(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'you mad' });
  });
});