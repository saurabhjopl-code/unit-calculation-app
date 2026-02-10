/**
 * Load CSV / TSV file and parse rows safely
 */
export async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();
  return parseCSV(text);
}

/**
 * Auto-detect delimiter (comma or tab)
 */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];

  const delimiter = lines[0].includes("\t") ? "\t" : ",";

  const headers = lines[0]
    .split(delimiter)
    .map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim());
    const obj = {};

    headers.forEach((header, i) => {
      obj[header] = values[i] || "";
    });

    return obj;
  });
}
