import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";

export function selectStyle(styleId, imageUrl) {
  appState.current.styleId = styleId;
  appState.current.imageUrl = imageUrl || "./data/No-image.png";
  goToStep(STEPS.STYLE_VERIFIED);
}

export function verifyStyle() {
  goToStep(STEPS.SIZE_SELECTED);
}
