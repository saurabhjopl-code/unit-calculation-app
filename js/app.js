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

  // 🔥 EXPOSE FOR DEBUGGING
  window.appState = appState;

  bindSearch();

  console.log("App ready");
  console.log("Styles loaded:", Object.keys(appState.stylesMap).length);
}

/**
 * Bind STYLE SEARCH input only
 */
function bindSearch() {
  const input = document.querySelector(".card:first-of-type .input-field");
  if (!input) {
    console.error("Style search input not found");
    return;
  }

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
