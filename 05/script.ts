import { readBdFile } from "../01/script";
import serverErrors from "../errorMessage/serverErrors";
import { User } from "../types/User";

const validateCondition = (user: User, profession: string): boolean => {
  if (user.profession) {
    return user.profession.toLowerCase().includes(profession.toLowerCase());
  }
  return false;
}

export const filterUsersByProfession = async (profession: string): Promise<User[] | string> => {
  try {
    const users: User[] | string = await readBdFile();

    if (typeof users === "string") return serverErrors.critical;

    const filteredUsers: User[] = users.filter(user => {
      return validateCondition(user, profession);
    });

    return filteredUsers;

  } catch (error) {
    return serverErrors.critical;
  }
}
