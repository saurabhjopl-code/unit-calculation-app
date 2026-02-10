export async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const obj = {};

    headers.forEach((h, i) => {
      obj[h] = values[i] || "";
    });

    return obj;
  });
}
