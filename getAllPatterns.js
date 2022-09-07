import glob from "glob-promise";
import { promises as fs } from "node:fs";

export async function getAllPatterns() {
  const files = await glob("patterns/*.json");
  const patterns = [];
  for (const file of files) {
    const content = await fs.readFile(file);
    patterns.push({
      id: file.replace("patterns/", "").replace(".json", ""),
      ...JSON.parse(content),
    });
  }

  return patterns;
}
