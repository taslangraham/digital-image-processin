/**
 * This file contains utility functions that to creates common JS modules
 * that are missing in ESM.
 * Example, the `currentDirectory` function
 * returns the value that common JS' `__dirname` would return
 */

import path from 'path';
import * as url from 'url';

/**
 * returns the value that common JS' `__dirname` module would return.
 *
 * https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
 * https://nodejs.org/api/esm.html#no-__filename-or-__dirname
 *
 * @param {string} fileUrl - `import.meta.url`
 *
 * Example usage getCurrentDirectory(import.meta.url)
 */
export function getCurrentDirectory(fileUrl) {
  return path.dirname(getFilename(fileUrl));
}

/**
 * Returns value that common JS' `__filename` module would return.
 *
 * https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
 * https://nodejs.org/api/esm.html#no-__filename-or-__dirname
 * @param {string} fileUrl - `import.meta.url`
 * Example usage getFilename(import.meta.url)
 */
export function getFilename(fileUrl) {
  return url.fileURLToPath(fileUrl);
}
