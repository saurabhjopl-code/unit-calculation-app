import { appState } from "../state/app.state.js";
import { savePending } from "../services/storage.service.js";

/**
 * Set units while typing
 */
export function setUnits(value) {
  appState.current.units = Number(value) || 0;
}

/**
 * Save current style + size + unit into pending list
 */
export function saveCurrentSelection() {
  const { styleId, selectedSizes, units } = appState.current;

  if (!styleId || !selectedSizes.length || !units) {
    return;
  }

  selectedSizes.forEach(size => {
    const sku = `${styleId}-${size}`;

    appState.pending.push({
      sku,
      style: styleId,   // ✅ FIX: STYLE IS NOW SAVED
      size,
      units
    });
  });

  savePending(appState.pending);

  /* ---- RESET CURRENT SELECTION ---- */
  appState.current = {
    styleId: null,
    selectedSizes: [],
    units: 0
  };
}
