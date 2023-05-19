import fs from "node:fs/promises";

const dbFilePath: string = "./db.json";

const readBdFile = async (): Promise<string> => {
  try {
    const fileBuffer: Buffer = await fs.readFile(dbFilePath);

    return fileBuffer.toString();

  } catch (error) {
    return "Erro ao ler arquivo bd.json";
  }
}

const writeToDbFile = async (content: any): Promise<void> => {
  await fs.writeFile(dbFilePath, JSON.stringify(content));
}

const writeRead = async (content: any): Promise<void> => {
  await writeToDbFile(content);

  const textFile: string = await readBdFile();

  console.log(textFile);
}

writeRead("Do javascript ao typescript");
