import { Router, Request, Response } from 'express';
import Routes from '../../types/Routes';
import getTeam from '../../services/teams-service';

const teamsRouter = Router();

export async function handleTeam(req: Request, res: Response) {
  const { teamId } = req.params;
  const team = await getTeam(teamId);
  team
    .map((value) => res.status(200).json(value))
    .mapErr((e) => {
      res.status(500).json({ message: (e as Error).message });
    });
}

teamsRouter.get(Routes.TEAMS, handleTeam);

export default teamsRouter;
