import { appState } from "../state/app.state.js";
import { savePending } from "../services/storage.service.js";
import { resetCurrentSelection } from "./flow.controller.js";

/**
 * Set units from input (numeric)
 */
export function setUnits(units) {
  appState.current.units = Number(units);
}

/**
 * Save current selection into pending submissions.
 * One size = one SKU = one pending row.
 */
export function saveCurrentSelection() {
  const { styleId, sizes, units } = appState.current;
  if (!styleId || !sizes.length || !units || units <= 0) return;

  const style = appState.stylesMap[styleId];
  if (!style) return;

  sizes.forEach(size => {
    const skuObj = style.skusBySize[size];
    if (!skuObj) return;

    appState.pending.push({
      sku: skuObj.sku,
      styleId,
      size,
      units
    });
  });

  savePending(appState.pending);
  resetCurrentSelection();
}
