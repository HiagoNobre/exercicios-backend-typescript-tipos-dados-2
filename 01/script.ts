import fs from "node:fs/promises";

const dbFilePath: string = "./db.json";

export const readBdFile = async (): Promise<string> => {
  try {
    const fileBuffer: Buffer = await fs.readFile(dbFilePath);

    return fileBuffer.toString();

  } catch (error) {
    return "Erro ao ler arquivo bd.json";
  }
}

export const writeToDbFile = async (content: any): Promise<void> => {
  await fs.writeFile(dbFilePath, JSON.stringify(content));
}
