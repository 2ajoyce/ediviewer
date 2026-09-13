/**
 * @param {string} value
 * @param {number} length
 * @returns {string}
 */
export function pad(value, length) {
  let result = value;
  while (result.length < length) {
    result = '0' + result;
  }
  return result;
}
