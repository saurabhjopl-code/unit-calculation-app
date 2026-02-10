import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";
import { renderUI } from "../ui/ui.binding.js";

export function selectStyle(styleId) {
  const style = appState.stylesMap[styleId];
  if (!style) return;

  appState.current.styleId = styleId;
  appState.current.imageUrl = style.image.url;
  appState.current.sizes = [];
  appState.current.units = null;

  goToStep(STEPS.STYLE_VERIFIED);
  renderUI();
}

export function verifyStyle() {
  goToStep(STEPS.SIZE_SELECTED);
  renderUI();
}
