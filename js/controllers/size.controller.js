import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";

export function toggleSize(size) {
  const idx = appState.current.sizes.indexOf(size);

  if (idx === -1) {
    appState.current.sizes.push(size);
  } else {
    appState.current.sizes.splice(idx, 1);
  }

  if (appState.current.sizes.length > 0) {
    goToStep(STEPS.UNIT_ENTERED);
  }
}
