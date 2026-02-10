import { appState } from "../state/app.state.js";
import { savePending } from "../services/storage.service.js";
import { resetCurrentSelection } from "./flow.controller.js";
import { renderUI } from "../ui/ui.binding.js";

export function setUnits(units) {
  appState.current.units = Number(units);
}

export function saveCurrentSelection() {
  const { styleId, sizes, units } = appState.current;
  if (!styleId || !sizes.length || !units) return;

  const style = appState.stylesMap[styleId];

  sizes.forEach(size => {
    const sku = style.skusBySize[size].sku;

    appState.pending.push({
      sku,
      styleId,
      size,
      units
    });
  });

  savePending(appState.pending);
  resetCurrentSelection();
  renderUI();
}
