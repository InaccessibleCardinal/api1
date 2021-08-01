import { err, ok, Result } from 'neverthrow';
import makeHttpRequest from '../../http/makeHttpRequest';
import { Team, Player } from '../../types/Teams';

const { TEAMS_HOST, TEAMS_PATH } = process.env;

interface TeamResponse {
  team: Team;
  players: Player[];
}

export default async function getTeam(
  teamId: string
): Promise<Result<TeamResponse, Error>> {
  const [teamsResponse, playersResponse] = await Promise.all([
    makeHttpRequest({
      hostname: TEAMS_HOST,
      path: TEAMS_PATH,
      method: 'GET',
    }),
    makeHttpRequest({
      hostname: TEAMS_HOST,
      path: `/json/named.roster_40.bam?team_id=${teamId}`,
      method: 'GET',
    }),
  ]);
  if (teamsResponse.isOk() && playersResponse.isOk()) {
    const team = teamsResponse.value.team_all_season.queryResults.row.find(
      (t: Team) => t.team_id === teamId
    );
    const players = playersResponse.value.roster_40.queryResults.row;
    if (!team) return err(new Error(`No team with id: ${teamId}`));

    if (!players) return err(new Error(`No players on team_id: ${teamId}`));

    return ok({ team, players });
  }
  return err(new Error('bad things'));
}
