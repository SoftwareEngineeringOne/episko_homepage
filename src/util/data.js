import fs from "node:fs/promises";

export async function readAndParseData(file, map) {
  const data = await fs.readFile(file, "utf8");

  if (map) {
    return JSON.parse(data).map(map);
  } else {
    return JSON.parse(data);
  }
}

export async function findEntryInData(file, lambda) {
  const entries = await readAndParseData(file);
  return entries.find(lambda)
}
