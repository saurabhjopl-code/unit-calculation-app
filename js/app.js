import { appState } from "./state/app.state.js";
import { loadPending } from "./services/storage.service.js";

function init() {
  appState.pending = loadPending();
  console.log("App initialized", appState);
}

document.addEventListener("DOMContentLoaded", init);
