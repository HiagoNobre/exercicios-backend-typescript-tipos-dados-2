import { readBdFile, writeToDbFile } from "../01/script";
import notFound from "../errorMessage/notFound";
import serverErrors from "../errorMessage/serverErrors";
import { User } from "../types/User";

export const updateUser = async (cpf: number, newInfos: User): Promise<User | string> => {
  try {
    const users: User[] | string = await readBdFile();

    if (typeof users === "string") return serverErrors.critical;

    let userNotFound: boolean = true;

    users.forEach((user, i) => {
      if (user.cpf === cpf) {
        users[i] = newInfos;

        userNotFound = false;
      }
    });

    if (userNotFound) return notFound.user;

    const error: string | void = await writeToDbFile(users);

    if (error === "string") return serverErrors.critical;

    return newInfos;

  } catch (error) {
    return serverErrors.critical;
  }
}

export const detailUser = async (cpf: number): Promise<User | string> => {
  try {
    const users: User[] | string = await readBdFile();

    if (typeof users === "string") return serverErrors.critical;

    const user: User | undefined = users.find(user => user.cpf === cpf);

    if (!user) return notFound.user;

    return user;

  } catch (error) {
    return serverErrors.critical;
  }
}
