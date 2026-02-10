const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx2eGV4pt3MOWCOH05sLOinf2QDX-IzJX8J5QvjPFw3k86Ec0yHLl4qrzSLrU5ZGP4c/exec";

const SECRET_KEY = "SWASTIK6482";

/**
 * Submit pending rows to Google Sheet
 */
export async function submitToGoogleDrive(rows) {
  // 🔐 Always normalize rows before sending
  const normalizedRows = rows.map(r => {
    let style = r.style;

    // 🛡️ FAILSAFE: derive style from SKU if missing
    if (!style && r.sku) {
      style = r.sku.split("-")[0];
    }

    return {
      sku: r.sku || "",
      style: style || "",
      size: r.size || "",
      units: r.units || 0,
      deviceId: r.deviceId || "UNKNOWN_DEVICE"
    };
  });

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({
      secret: SECRET_KEY,
      rows: normalizedRows
    })
  });

  return response.json();
}
