import { appState, STEPS } from "../state/app.state.js";

export function goToStep(step) {
  appState.step = step;
}

export function resetCurrentSelection() {
  appState.current = {
    sku: null,
    styleId: null,
    imageUrl: null,
    sizes: [],
    units: null
  };
  appState.step = STEPS.STYLE_SEARCH;
}
