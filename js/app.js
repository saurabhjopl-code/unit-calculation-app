import { appState } from "./state/app.state.js";
import { loadPending } from "./services/storage.service.js";
import { loadStylesData } from "./services/styles.service.js";
import { renderUI } from "./ui/ui.binding.js";
import { renderPendingTable } from "./ui/pending.ui.js";

import {
  getStyleSuggestions,
  renderSuggestions,
  clearSuggestions
} from "./controllers/search.controller.js";

import { verifyStyle } from "./controllers/style.controller.js";
import { toggleSize } from "./controllers/size.controller.js";
import { setUnits, saveCurrentSelection } from "./controllers/unit.controller.js";

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
  renderPendingTable();

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
    .addEventListener("click", verifyStyle);
}

function bindSizes() {
  document.querySelector(".size-selection")
    .addEventListener("click", e => {
      if (!e.target.classList.contains("size-chip")) return;
      toggleSize(e.target.textContent);
    });
}

function bindUnits() {
  document.querySelector(".input-number")
    .addEventListener("input", e => {
      setUnits(e.target.value);
    });
}

function bindSave() {
  document.querySelector(".save-button")
    .addEventListener("click", saveCurrentSelection);
}

document.addEventListener("DOMContentLoaded", init);
