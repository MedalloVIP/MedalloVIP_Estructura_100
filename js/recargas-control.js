// recargas-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorRecargas = document.getElementById("listaRecargas");

let usuarioActual = null;

// Recargas simuladas para la beta
const recargasSimuladas = [
  { fecha: "2025-05-10", monto: 10000, metodo: "USDC / Solana", estado: "Completado" },
  { fecha: "2025-05-14", monto: 20000, metodo: "Stripe", estado: "Pendiente" },
  { fecha: "2025-05-15", monto: 5000, metodo: "Coinbase Wallet", estado: "Completado" }
];

// Renderizar recargas
function renderizarRecargas() {
  if (!visorRecargas) return;

  visorRecargas.innerHTML = "";

  recargasSimuladas.forEach(rec => {
    const colorEstado = rec.estado === "Pendiente" ? "#ffaa00" : "#00ff88";

    const item = document.createElement("div");
    item.className = "recarga-item";
    item.style = `
      background: #111;
      padding: 14px;
      margin-bottom: 12px;
      border-left: 4px solid ${colorEstado};
      border-radius: 10px;
      color: white;
    `;

    item.innerHTML = `
      <strong>Recarga de ${rec.monto.toLocaleString()} tokens</strong><br>
      <span style="color:#ccc;">Método: ${rec.metodo}</span><br>
      <span style="color:${colorEstado}; font-weight:bold;">${rec.estado}</span><br>
      <small style="color:#aaa;">Fecha: ${rec.fecha}</small>
    `;

    visorRecargas.appendChild(item);
  });

  mostrarNotificacion("Recargas actualizadas", "Historial de recargas cargado con éxito", "info");
}

// Inicializar
function inicializarRecargas() {
  if (!visorRecargas) {
    console.warn("No se encontró el contenedor de recargas.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarRecargas();
    } else {
      visorRecargas.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus recargas.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarRecargas);
