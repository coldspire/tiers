import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const global = {
  pathWithFilename: null,
  pathDirOnly: null
};

function setGlobalFullPathOfJson(path) {
  const fullpath = resolve(path);
  global.pathWithFilename = fullpath;
  global.pathDirOnly = dirname(fullpath);
}

async function getRawEntries() {
  let contents;
  try {
    console.log("👀 Reading from", global.pathWithFilename);
    contents = await readFile(global.pathWithFilename, { encoding: "utf8" });
  } catch (err) {
    contents = null;
    console.error(err.message);
  }

  return JSON.parse(contents);
}

function getEntriesFromRaw(entriesRaw) {
  return Object.keys(entriesRaw["entries"]);
}

function writeEntryFiles(entries) {
  const fileContents = "---\nlayout: tier-item.liquid\n---\n";

  console.log("💾 Writing entries to", global.pathDirOnly);
  entries.forEach(async (entry) => {
    try {
      await writeFile(`${global.pathDirOnly}/${entry}.md`, fileContents, { flag: "wx" });
      console.log(`👍 Wrote file for ${entry}.`);
    } catch (err) {
      if (err.code === "EEXIST") {
        console.log(`⚠️ Skipped file for ${entry} because it exists.`);
      } else {
        console.error(err.message);
      }
    }
  });
}

try {
  setGlobalFullPathOfJson(process.argv[2]);
  const entriesRaw = await getRawEntries();
  const entries = getEntriesFromRaw(entriesRaw);

  await writeEntryFiles(entries);
} catch (err) {
  console.error(err);
}