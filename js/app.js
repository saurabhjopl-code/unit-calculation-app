import { appState } from "./state/app.state.js";
import { loadPending } from "./services/storage.service.js";
import { loadStylesData } from "./services/styles.service.js";

import {
  getStyleSuggestions,
  renderSuggestions,
  clearSuggestions
} from "./controllers/search.controller.js";

async function init() {
  appState.pending = loadPending();
  appState.stylesMap = await loadStylesData();

  bindSearch();
  console.log("App ready", appState);
}

/**
 * Bind search input events
 */
function bindSearch() {
  const input = document.querySelector(".input-field");
  if (!input) return;

  input.addEventListener("input", e => {
    const value = e.target.value.trim();
    if (!value) {
      clearSuggestions();
      return;
    }

    const suggestions = getStyleSuggestions(value);
    renderSuggestions(suggestions);
  });
}

document.addEventListener("DOMContentLoaded", init);
