/**
 * Utility functions for reading and processing JSON data files.
 * @module util/data
 */

import fs from "node:fs/promises";

/**
 * Reads a file, parses its JSON content, and optionally maps each element.
 *
 * @param {string} file - The path to the file.
 * @param {function(*): *} [map=null] - Optional mapping function applied to each element.
 * @returns {Promise<*>} A promise that resolves to the parsed JSON data, optionally mapped.
 */
export async function readAndParseData(file, map = null) {
  const data = await fs.readFile(file, "utf8");

  if (map) {
    return JSON.parse(data).map(map);
  } else {
    return JSON.parse(data);
  }
}

/**
 * Finds an entry in a JSON data file that satisfies a specified condition.
 *
 * @param {string} file - The path to the file.
 * @param {function(*): boolean} lambda - A predicate function to test each element.
 * @returns {Promise<*>} A promise that resolves to the first element that satisfies the condition, or undefined if none is found.
 */
export async function findEntryInData(file, lambda) {
  const entries = await readAndParseData(file);
  return entries.find(lambda)
}
