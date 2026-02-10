import { appState } from "./state/app.state.js";
import { loadPending } from "./services/storage.service.js";
import { loadStylesData } from "./services/styles.service.js";

async function init() {
  appState.pending = loadPending();
  appState.stylesMap = await loadStylesData();

  console.log("App initialized");
  console.log("Styles map:", appState.stylesMap);
  console.log("Pending:", appState.pending);
}

document.addEventListener("DOMContentLoaded", init);
