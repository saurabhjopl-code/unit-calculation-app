import { appState } from "./state/app.state.js";
import { loadPending } from "./services/storage.service.js";
import { loadStylesData } from "./services/styles.service.js";
import { renderUI } from "./ui/ui.binding.js";

import {
  getStyleSuggestions,
  renderSuggestions,
  clearSuggestions
} from "./controllers/search.controller.js";

async function init() {
  appState.pending = loadPending();
  appState.stylesMap = await loadStylesData();

  window.appState = appState;

  bindSearch();
  bindVerify();
  bindSizes();
  bindUnits();
  bindSave();

  renderUI();

  console.log("App ready");
}

/* -------- BINDINGS -------- */

function bindSearch() {
  const input = document.querySelector(".card:first-of-type .input-field");

  input.addEventListener("input", e => {
    const value = e.target.value.trim();
    if (!value) return clearSuggestions();

    renderSuggestions(getStyleSuggestions(value));
  });
}

function bindVerify() {
  document.querySelector(".verify-button")
    .addEventListener("click", () => {
      import("./controllers/style.controller.js")
        .then(m => m.verifyStyle());
    });
}

function bindSizes() {
  document.querySelector(".size-selection")
    .addEventListener("click", e => {
      if (!e.target.classList.contains("size-chip")) return;

      import("./controllers/size.controller.js")
        .then(m => m.toggleSize(e.target.textContent));
    });
}

function bindUnits() {
  document.querySelector(".input-number")
    .addEventListener("input", e => {
      import("./controllers/unit.controller.js")
        .then(m => m.setUnits(e.target.value));
    });
}

function bindSave() {
  document.querySelector(".save-button")
    .addEventListener("click", () => {
      import("./controllers/unit.controller.js")
        .then(m => m.saveCurrentSelection());
    });
}

document.addEventListener("DOMContentLoaded", init);
