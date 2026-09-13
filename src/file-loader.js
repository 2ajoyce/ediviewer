/**
 * Reads a File's contents as text.
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read file as text'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
