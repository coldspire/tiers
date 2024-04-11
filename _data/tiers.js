const { readdirSync } = require("node:fs");
const { resolve } = require("node:path");
const { readFile } = require("node:fs/promises");

async function getJsonData(path) {
  return await readFile(path, { encoding: "utf8" });
}

async function getTiersData() {
  const tiersDirectory = resolve(__dirname, "../src/tiers");

  const tiersDirectoryEntries = readdirSync(tiersDirectory, {
    withFileTypes: true,
  }).filter((entry) => entry.isDirectory());

  const tiersData = [];
  for (const tierDirectory of tiersDirectoryEntries) {
    const path = resolve(
      `${tierDirectory.path}/${tierDirectory.name}/entries.json`,
    );
    const tierDataJson = await getJsonData(path);
    const tierData = {
      name: tierDirectory.name,
      entries: JSON.parse(tierDataJson),
    };
    tiersData.push(tierData);
  }

  return tiersData;
}

module.exports = getTiersData;
