import { readdir } from "node:fs/promises";

const tiersPathFromWorkspaceRoot = "./tiers/";

async function importJson(path) {
  const fileContents = await import(path, { with: { type: "json" } });
  return fileContents.default;
}

async function createTiersFromDir(dir) {
  const tiersId = dir;
  const files = await readdir(tiersPathFromWorkspaceRoot + tiersId);
  let tiers = {
    id: tiersId,
    title: "",
    text: "",
    ranks: {
      S: [],
      A: [],
      B: [],
      C: [],
      D: [],
      F: [],
      O: [],
    },
  };

  for (const file of files) {
    const filePath = "../" + tiersPathFromWorkspaceRoot + tiersId + "/" + file;
    const fileContents = await importJson(filePath);
    if (fileContents.id === "about") {
      tiers = {
        ...tiers,
        // Ignore the ID, since it's always "about"
        title: fileContents.title,
        text: fileContents.text,
      };
    } else {
      const tierEntry = {
        ...fileContents,
      };
      const rank = tierEntry.rank;
      tiers.ranks[rank].push({ ...tierEntry });
    }
  }

  return tiers;
}

async function getTierDirectories(path) {
  return await readdir(path);
}

async function getTiers() {
  const tiersDirs = await getTierDirectories(tiersPathFromWorkspaceRoot);
  const allTiers = [];
  for (const dir of tiersDirs) {
    const tiers = await createTiersFromDir(dir);
    allTiers.push(tiers);
  }

  return allTiers;
}

export default async function () {
  return await getTiers();
}
