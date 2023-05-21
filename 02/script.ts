import { readBdFile, writeToDbFile } from "../01/script";
import { filterUsersByProfession } from "../05/script";
import serverErrors from "../errorMessage/serverErrors";
import { User } from "../types/User";

export const registerUser = async (user: User): Promise<User | string> => {
  try {
    const usersDb: User[] | string = await readBdFile();

    if (typeof usersDb === "string") return serverErrors.critical;

    const users: User[] = usersDb;

    const newUserAdded: User[] = [...users, user];

    const error: string | void = await writeToDbFile(newUserAdded);

    if (error === "string") return serverErrors.critical;

    return user;

  } catch (error) {
    return serverErrors.critical;
  }
}

export const listRegisteredUsersOrFilterByProfession = async (profession?: string): Promise<User[] | string> => {
  try {
    if (profession) {
      return await filterUsersByProfession(profession);
    }

    const users: User[] | string = await readBdFile();

    if (typeof users === "string") return serverErrors.critical;

    return users;

  } catch (error) {
    return serverErrors.critical;
  }
}
