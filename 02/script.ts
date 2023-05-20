import { readBdFile, writeToDbFile } from "../01/script";

type Address = {
  zipCode: string,
  road: string,
  complement?: string,
  neighborhood: string,
  city: string
}

type User = {
  name: string,
  email: string,
  cpf: number,
  profession?: string,
  address: Address | null
}

export const registerUser = async (user: User): Promise<User | string> => {
  try {
    const usersDb: string = await readBdFile();

    const users: User[] = JSON.parse(usersDb);

    const newUserAdded: User[] = [...users, user];

    await writeToDbFile(newUserAdded);

    return user;

  } catch (error) {
    return "Erro ao cadastrar usuário";
  }
}

export const listRegisteredUsers = async (): Promise<User[] | string> => {
  try {
    const users: User[] = JSON.parse(await readBdFile());
    return users;

  } catch (error) {
    return "Erro ao listar usuários cadastrados";
  }
}
