import { getDeviceId } from "./device.service.js";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx2eGV4pt3MOWCOH05sLOinf2QDX-IzJX8J5QvjPFw3k86Ec0yHLl4qrzSLrU5ZGP4c/exec";

const SECRET_KEY = "SWASTIK6482";

export async function submitToGoogleDrive(rows) {
  const deviceId = getDeviceId();

  const payload = {
    secret: SECRET_KEY,
    deviceId,
    rows
  };

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(payload)
  });

  return response.json();
}
