/**
 * @typedef {{ref: string, index: number, data: string, segment: number}} EdiElement
 * @typedef {{elementDelimiter: string, componentSeparator: string, segmentDelimiter: string, elements: EdiElement[]}} EdiFile
 */

/**
 * @param {string} fileContents
 * @returns {EdiFile}
 */
export function parseEdiFile(fileContents) {
  let lines = fileContents.split('\n');
  if (lines[0].slice(0, 3) !== 'ISA') {
    throw new Error('Invalid File');
  }

  const elementDelimiter = lines[0][3];
  const componentSeparator = lines[0].slice(-3, -2);
  const segmentDelimiter = lines[0].slice(-2, -1);
  const elements = [];

  lines = lines.map((line) => line.replace(componentSeparator, ''));
  lines = lines.map((line) => line.replace(segmentDelimiter, ''));

  lines.forEach((line, segment) => {
    const parts = line.split(elementDelimiter);

    parts.forEach((part, i) => {
      if (i > 0 && part.trim() !== '') {
        elements.push({ ref: parts[0], index: i, data: part, segment });
      }
    });
  });

  return { elementDelimiter, componentSeparator, segmentDelimiter, elements };
}
