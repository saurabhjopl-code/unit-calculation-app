import { appState, STEPS } from "../state/app.state.js";
import { goToStep } from "./flow.controller.js";

/**
 * Called when user selects a style from search
 */
export function selectStyle(styleId) {
  const style = appState.stylesMap[styleId];
  if (!style) return;

  appState.current.styleId = styleId;
  appState.current.imageUrl = style.image.url;
  appState.current.sizes = [];
  appState.current.units = null;

  goToStep(STEPS.STYLE_VERIFIED);
}

/**
 * Called when user clicks Verify Style
 */
export function verifyStyle() {
  goToStep(STEPS.SIZE_SELECTED);
}
