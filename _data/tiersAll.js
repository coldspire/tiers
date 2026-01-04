import { readdir } from "node:fs/promises";

const tiersPathFromWorkspaceRoot = "./tiers/";

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
    const fileContents = (await import(filePath)).default;
    if (file === "_about.js") {
      tiers = {
        ...tiers,
        ...fileContents, // The About file contains information about all the tiers, so it's added to the top level properties
      };
    } else {
      const tierEntry = {
        id: file.split(".")[0],
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
