import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";
import { renderUI } from "../ui/ui.binding.js";

export function toggleSize(size) {
  const index = appState.current.sizes.indexOf(size);

  if (index === -1) {
    appState.current.sizes.push(size);
  } else {
    appState.current.sizes.splice(index, 1);
  }

  if (appState.current.sizes.length > 0) {
    goToStep(STEPS.UNIT_ENTERED);
  }

  renderUI();
}
