import { appState } from "../state/app.state.js";

/**
 * Render pending submissions table from appState.pending
 * Called on app load and after every save
 */
export function renderPendingTable() {
  const tbody = document.querySelector(".pending-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  appState.pending.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.sku}</td>
      <td>${row.styleId}</td>
      <td>${row.size}</td>
      <td>${row.units}</td>
    `;

    tbody.appendChild(tr);
  });
}

