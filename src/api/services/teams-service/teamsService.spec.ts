import { ResultAsync } from 'neverthrow';
import makeHttpRequest from '../../http/makeHttpRequest';
import getTeam from './';
import { mockTeam, mockPlayers } from '../../routes/teamsRouter/__mocks__/mockTeam';

jest.mock('../../http/makeHttpRequest', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('getTeam function', () => {
  it('should return team and players', async () => {
    const otherMockTeam = { ...mockTeam, team_id: '111' };
    const teamsPromise = Promise.resolve({
      team_all_season: { queryResults: { row: [mockTeam, otherMockTeam] } }
    });
    const playersPromise = Promise.resolve({
      roster_40: { queryResults: { row: mockPlayers } }
    });
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(teamsPromise, () => null)
    );
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(playersPromise, () => null)
    );
    const results = await getTeam('119');
    results.map(value => expect(value).toEqual({ team: mockTeam, players: mockPlayers }));
    expect(makeHttpRequest).toHaveBeenNthCalledWith(1, {
      hostname: process.env.TEAMS_HOST,
      path: process.env.TEAMS_PATH,
      method: 'GET',
    });
    expect(makeHttpRequest).toHaveBeenNthCalledWith(2, {
      hostname: process.env.TEAMS_HOST,
      path: `/json/named.roster_40.bam?team_id=119`,
      method: 'GET',
    });
  });

  it('should handle an error if team is empty', async () => {
    const teamsPromise = Promise.resolve({
      team_all_season: { queryResults: { row: [] } }
    });
    const playersPromise = Promise.resolve({
      roster_40: { queryResults: { row: mockPlayers } }
    });
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(teamsPromise, () => null)
    );
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(playersPromise, () => null)
    );
    const results = await getTeam('119');
    results.mapErr(e => expect(e).toEqual(new Error(`No team with id: ${mockTeam.team_id}`)));
  });

  it('should handle an error if players are empty', async () => {
    const teamsPromise = Promise.resolve({
      team_all_season: { queryResults: { row: [mockTeam] } }
    });
    const playersPromise = Promise.resolve({
      roster_40: { queryResults: { row: null } }
    });
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(teamsPromise, () => null)
    );
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(playersPromise, () => null)
    );
    const results = await getTeam('119');
    results.mapErr(e => expect(e).toEqual(new Error(`No players on team_id: ${mockTeam.team_id}`)));
  });

  it('should handle a service call error', async () => {
    const httpError = new Error('http error');
    const teamsPromise = Promise.reject(httpError);
    const playersPromise = Promise.resolve({
      roster_40: { queryResults: { row: mockPlayers } }
    });
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(teamsPromise, (e) => e)
    );
    (makeHttpRequest as jest.Mock).mockResolvedValueOnce(
      ResultAsync.fromPromise(playersPromise, () => null)
    );
    const results = await getTeam('119');
    results.mapErr(e => expect(e).toEqual(new Error('bad things')));
  });
});
