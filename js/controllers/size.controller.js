import { appState } from "../state/app.state.js";
import { renderUI } from "../ui/ui.binding.js";

export function toggleSize(size) {
  // 🔒 HARD BLOCK: style must be verified
  if (!appState.current.styleId) {
    console.warn("Size blocked: style not verified");
    return;
  }

  // 🔒 SINGLE SIZE RULE (no multi-select)
  appState.current.size = size;

  renderUI();
}
