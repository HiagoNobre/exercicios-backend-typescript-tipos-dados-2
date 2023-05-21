import { readBdFile, writeToDbFile } from "../01/script";
import notFound from "../errorMessage/notFound";
import serverErrors from "../errorMessage/serverErrors";
import { User } from "../types/User";

export const deleteUser = async (cpf: number): Promise<User | string> => {
  try {
    const users: User[] | string = await readBdFile();

    if (typeof users === "string") return serverErrors.critical;

    if (users.length === 0) return notFound.user;

    let deletedUser: User | undefined;

    const listWithDeletedUser: User[] = users.filter(user => {
      if (user.cpf === cpf) {
        deletedUser = user;
      }

      return user.cpf !== cpf;
    });

    if (!deletedUser) return notFound.user;

    const error: string | void = await writeToDbFile(listWithDeletedUser);

    if (error === "string") return serverErrors.critical;

    return deletedUser;

  } catch (error) {
    return serverErrors.critical;
  }
}
