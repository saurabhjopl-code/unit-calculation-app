import { appState } from "./state/app.state.js";
import { loadPending, clearPending } from "./services/storage.service.js";
import { loadStylesData } from "./services/styles.service.js";
import { renderUI } from "./ui/ui.binding.js";
import { renderPendingTable } from "./ui/pending.ui.js";
import { submitToGoogleDrive } from "./services/drive.service.js";

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
  bindSubmit();

  renderUI();
  renderPendingTable();
  updateSubmitButtonState();

  console.log("App ready (V1.2.2 STABLE)");
}

/* ---------- SUBMIT BUTTON STATE ---------- */

function updateSubmitButtonState() {
  const btn = document.querySelector(".submit-button");
  if (!btn) return;

  if (appState.pending.length > 0) {
    btn.disabled = false;
    btn.classList.add("is-active");
  } else {
    btn.disabled = true;
    btn.classList.remove("is-active");
  }
}

/* ---------- BINDINGS ---------- */

function bindSearch() {
  const input = document.querySelector(".card:first-of-type .input-field");

  input.addEventListener("input", e => {
    const value = e.target.value.trim();
    if (!value) {
      clearSuggestions();
      return;
    }
    renderSuggestions(getStyleSuggestions(value));
  });
}

function bindVerify() {
  document
    .querySelector(".verify-button")
    .addEventListener("click", verifyStyle);
}

function bindSizes() {
  document
    .querySelector(".size-selection")
    .addEventListener("click", e => {
      if (!e.target.classList.contains("size-chip")) return;
      toggleSize(e.target.textContent);
    });
}

function bindUnits() {
  document
    .querySelector(".input-number")
    .addEventListener("input", e => {
      setUnits(e.target.value);
    });
}

function bindSave() {
  document
    .querySelector(".save-button")
    .addEventListener("click", () => {
      saveCurrentSelection();          // ✅ localStorage save restored
      renderPendingTable();
      updateSubmitButtonState();
    });
}

/* ---------- GOOGLE DRIVE SUBMIT ---------- */

function bindSubmit() {
  const btn = document.querySelector(".submit-button");

  btn.addEventListener("click", async () => {
    if (!appState.pending.length) {
      alert("No Data to Submit.");
      return;
    }

    btn.disabled = true;
    btn.classList.remove("is-active");
    btn.textContent = "Submitting...";

    try {
      const result = await submitToGoogleDrive(appState.pending);

      if (result.success) {
        clearPending();
        appState.pending = [];
        renderPendingTable();
        updateSubmitButtonState();
        alert("Data successfully submitted to Google Sheet ✅");
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      btn.textContent = "Submit to Google Drive";
      updateSubmitButtonState();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
