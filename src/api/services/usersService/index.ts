import path from 'path';
import { ok, err, Result } from 'neverthrow';
import readFromDb from '../../utils/readFromDb';
import { User } from '../../types/User';

const { USERS_DB } = process.env;

export async function getUsersFromDB(): Promise<Result<User[], Error>> {
  try {
    const usersBuffer = await readFromDb(
      path.join(__dirname, `../../${USERS_DB}`)
    );
    const users: User[] = JSON.parse(usersBuffer.toString());
    return ok(users);
  } catch (e) {
    return err(e);
  }
}
