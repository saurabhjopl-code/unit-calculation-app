import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";
import { renderUI } from "../ui/ui.binding.js";

export function toggleSize(size) {
  // ✅ FORCE SINGLE SIZE SELECTION
  appState.current.sizes = [size];

  // Move forward once size is selected
  goToStep(STEPS.UNIT_ENTERED);

  renderUI();
}
