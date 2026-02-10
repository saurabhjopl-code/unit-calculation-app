import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";

/**
 * Toggle size selection.
 * Size implicitly resolves to SKU via stylesMap.
 */
export function toggleSize(size) {
  const style = appState.stylesMap[appState.current.styleId];
  if (!style || !style.skusBySize[size]) return;

  const index = appState.current.sizes.indexOf(size);

  if (index === -1) {
    appState.current.sizes.push(size);
  } else {
    appState.current.sizes.splice(index, 1);
  }

  if (appState.current.sizes.length > 0) {
    goToStep(STEPS.UNIT_ENTERED);
  }
}
