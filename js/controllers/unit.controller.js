import { appState } from "../state/app.state.js";

export function setUnits(units) {
  appState.current.units = Number(units);
}
