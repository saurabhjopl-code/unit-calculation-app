const KEY = "UNIT_CALC_PENDING";

/**
 * Load pending submissions from localStorage
 */
export function loadPending() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Persist pending submissions
 */
export function savePending(pending) {
  localStorage.setItem(KEY, JSON.stringify(pending));
}

/**
 * Clear pending submissions (used after Drive submit later)
 */
export function clearPending() {
  localStorage.removeItem(KEY);
}
