const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx2eGV4pt3MOWCOH05sLOinf2QDX-IzJX8J5QvjPFw3k86Ec0yHLl4qrzSLrU5ZGP4c/exec";

const SECRET_KEY = "SWASTIK6482";

/**
 * Submit pending rows to Google Sheet
 */
export async function submitToGoogleDrive(rows) {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      secret: SECRET_KEY,
      rows
    })
  });

  return response.json();
}
