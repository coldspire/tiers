const { readdirSync } = require("node:fs");
const { resolve } = require("node:path");
const { readFile } = require("node:fs/promises");

/**
 * A tiers entry
 * @typedef {Object} Entry
 * @property {string} id
 * @property {string} title
 * @property {"S"|"A"|"B"|"C"|"D"|"F"} rank
 */

/**
 * Indexes for ranks
 * @readonly
 * @enum {number}
 */
const RankIndex = {
  S: 0,
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  F: 5,
};

function mapRankStringToIndex(rankAsStr) {
  switch (rankAsStr) {
    case "S":
      return RankIndex.S;
    case "A":
      return RankIndex.A;
    case "B":
      return RankIndex.B;
    case "C":
      return RankIndex.C;
    case "D":
      return RankIndex.D;
    case "F":
      return RankIndex.F;
  }
}

async function getDataFromTiersDir(directory) {
  const path = resolve(
    `${directory.path}/${directory.name}/${directory.name}.json`,
  );

  return JSON.parse(await readFile(path, { encoding: "utf8" }));
}

function addRanksToData(tiersData) {
  tiersData.ranks = [
    {
      rankName: "S",
      entries: [],
    },
    {
      rankName: "A",
      entries: [],
    },
    {
      rankName: "B",
      entries: [],
    },
    {
      rankName: "C",
      entries: [],
    },
    {
      rankName: "D",
      entries: [],
    },
    {
      rankName: "F",
      entries: [],
    },
  ];

  for (const entryName in tiersData.entries) {
    /**@type {Entry} */
    const entry = tiersData.entries[entryName];
    tiersData.ranks[mapRankStringToIndex(entry.rank)].entries.push({
      id: entry.id,
      title: entry.title,
    });
  }

  return tiersData;
}

async function getTiersData() {
  const tiersDirectory = resolve(__dirname, "../src/tiers");

  const tiersDirectoryEntries = readdirSync(tiersDirectory, {
    withFileTypes: true,
  }).filter((entry) => entry.isDirectory());

  const tiersAllData = [];
  for (const tierDirectory of tiersDirectoryEntries) {
    const tiersData = await getDataFromTiersDir(tierDirectory);
    addRanksToData(tiersData);
    tiersAllData.push(tiersData);
  }

  console.dir(JSON.stringify(tiersAllData));
  return tiersAllData;
}

module.exports = getTiersData;
