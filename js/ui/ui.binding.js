import { appState, STEPS } from "../state/app.state.js";

/**
 * Central UI renderer.
 * Call this AFTER every state change.
 */
export function renderUI() {
  renderCards();
  renderVerify();
  renderSizes();
  renderUnit();
}

/* ---------------- CARDS ---------------- */

function renderCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    if (index === 0) return; // Style search always enabled

    card.classList.add("card-disabled");
  });

  if (appState.step === STEPS.STYLE_VERIFIED) {
    cards[1].classList.remove("card-disabled");
  }

  if (appState.step === STEPS.SIZE_SELECTED) {
    cards[1].classList.remove("card-disabled");
    cards[2].classList.remove("card-disabled");
  }

  if (appState.step === STEPS.UNIT_ENTERED) {
    cards[1].classList.remove("card-disabled");
    cards[2].classList.remove("card-disabled");
    cards[3].classList.remove("card-disabled");
  }
}

/* ---------------- VERIFY ---------------- */

function renderVerify() {
  const btn = document.querySelector(".verify-button");
  const img = document.querySelector(".style-image");

  if (!btn || !img) return;

  btn.disabled = appState.step !== STEPS.STYLE_VERIFIED;
  img.src = appState.current.imageUrl || "./data/No-image.png";
}

/* ---------------- SIZES ---------------- */

function renderSizes() {
  const container = document.querySelector(".size-selection");
  if (!container) return;

  container.innerHTML = "";

  if (appState.step !== STEPS.SIZE_SELECTED && appState.step !== STEPS.UNIT_ENTERED) {
    return;
  }

  const style = appState.stylesMap[appState.current.styleId];
  if (!style) return;

  Object.keys(style.skusBySize).forEach(size => {
    const div = document.createElement("div");
    div.className = "size-chip";
    div.textContent = size;

    if (appState.current.sizes.includes(size)) {
      div.classList.add("size-chip-selected");
    }

    container.appendChild(div);
  });
}

/* ---------------- UNIT ---------------- */

function renderUnit() {
  const input = document.querySelector(".input-number");
  const btn = document.querySelector(".save-button");

  if (!input || !btn) return;

  input.disabled = appState.step !== STEPS.UNIT_ENTERED;
  btn.disabled = appState.step !== STEPS.UNIT_ENTERED;
}
