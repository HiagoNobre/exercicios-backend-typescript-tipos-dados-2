import fs from "node:fs/promises";
import { User } from "../types/User";

const dbFilePath: string = "./db.json";

export const readBdFile = async (): Promise<User[] | string> => {
  try {
    const fileBuffer: Buffer = await fs.readFile(dbFilePath);

    return JSON.parse(fileBuffer.toString());

  } catch (error) {
    return "Erro ao ler arquivo bd.json";
  }
}

export const writeToDbFile = async (content: User[]): Promise<void | string> => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(content));
  } catch (error) {
    return "Erro ao gravar informações no arquivo bd.json";
  }
}
