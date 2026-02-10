import { appState } from "../state/app.state.js";
import { renderUI } from "../ui/ui.binding.js";

export function toggleSize(size) {
  // ❌ Block if style not verified
  if (!appState.current?.styleId) return;

  // ✅ Enforce SINGLE size selection
  appState.current.size = size;

  renderUI();
}
