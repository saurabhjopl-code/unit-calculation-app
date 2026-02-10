const KEY = "UNIT_CALC_PENDING";

export function loadPending() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function savePending(pending) {
  localStorage.setItem(KEY, JSON.stringify(pending));
}
