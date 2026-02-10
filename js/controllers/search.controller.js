import { appState } from "../state/app.state.js";
import { selectStyle } from "./style.controller.js";

/**
 * Filter styles based on input value
 */
export function getStyleSuggestions(query) {
  if (!query) return [];

  const q = query.toLowerCase();

  return Object.keys(appState.stylesMap)
    .filter(styleId => styleId.toLowerCase().includes(q))
    .slice(0, 20); // hard limit for safety
}

/**
 * Render suggestions into DOM
 */
export function renderSuggestions(suggestions) {
  const container = document.querySelector(".search-suggestions");
  if (!container) return;

  container.innerHTML = "";

  suggestions.forEach(styleId => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = styleId;

    div.addEventListener("click", () => {
      selectStyle(styleId);
      clearSuggestions();
      setSearchInput(styleId);
    });

    container.appendChild(div);
  });
}

/**
 * Clear suggestions list
 */
export function clearSuggestions() {
  const container = document.querySelector(".search-suggestions");
  if (container) container.innerHTML = "";
}

/**
 * Set input value programmatically
 */
export function setSearchInput(value) {
  const input = document.querySelector(".input-field");
  if (input) input.value = value;
}
