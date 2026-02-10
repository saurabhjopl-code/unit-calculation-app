const DEVICE_KEY = "unit_app_device_id"; // 🔒 SINGLE SOURCE OF TRUTH

export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_KEY);

  if (!id) {
    id = "DEV-" + crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }

  return id;
}
