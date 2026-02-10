import { appState, STEPS } from "../state/app.state.js";

export function goToStep(step) {
  appState.step = step;
}

/**
 * Reset current selection AND clear related inputs
 */
export function resetCurrentSelection() {
  appState.current = {
    sku: null,
    styleId: null,
    imageUrl: null,
    sizes: [],
    units: null
  };

  // 🔥 Clear style search input
  const searchInput = document.querySelector(".card:first-of-type .input-field");
  if (searchInput) searchInput.value = "";

  // 🔥 Clear unit input
  const unitInput = document.querySelector(".input-number");
  if (unitInput) unitInput.value = "";

  appState.step = STEPS.STYLE_SEARCH;
}
