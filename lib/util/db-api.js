import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(dir, "../../db/db.json");

/**
 * Read all entries in the db file
 * @returns array containing all notes from the file
 */
export const read = async () => {
  try {
    const data = await readFile(FILE, { encoding: "utf-8" });
    return JSON.parse(data.length < 1 ? `[]` : data);
  } catch (err) {
    console.error(err);
    throw `Unable to get items from the database at this time.`;
  }
};

/**
 * Remove an existing entry from the db file
 * @param {string} id 
 * @returns void
 */
export const remove = async (id) => {
  if(!id) return; 
  const data = await read();
  let newData = data.filter((i) => i.id !== id);
  writeToDb(newData);
}

/**
 * Update an existing entry in the db
 * note: not used in this solution
 * @param {string} id 
 * @param {note} note 
 */
export const update = async (id, note) => {
  const data = await read();
  let newData = data.map((d) => {
    if (d.id === id) {
      d = { ...d, ...note };
    }
    return d;
  });
  writeToDb(newData);
};

/**
 * Writes array to db file having notes
 * @param {Array} arr 
 */
const writeToDb = async (arr) => {
  if (arr) await writeFile(FILE, JSON.stringify(arr));
};

/**
 * Create a new note entry in the db file
 * @param {string} title 
 * @param {string} text 
 * @returns 
 */
export const create = async (title, text) => {
  //every note needs an id and uuid is best
  let id = randomUUID();
  if (!title || !text) {
    throw "A title and text is required";
  }
  let i = { "title": title, "text": text, "id": id};

  //get existing from db
  const data = await read();
  //add new to existing
  data.push(i);
  //write the update to db
  writeToDb(data);
  //return a new constructed note
  return i;
};
