// movimientos-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorMovimientos = document.getElementById("listaMovimientos");

let usuarioActual = null;

// Simulación de movimientos
const movimientosSimulados = [
  { tipo: "Recarga", monto: 5000, moneda: "tokens", fecha: "2025-05-10", estado: "Completado" },
  { tipo: "Retiro", monto: 3000, moneda: "tokens", fecha: "2025-05-11", estado: "Pendiente" },
  { tipo: "Propina recibida", monto: 800, moneda: "tokens", fecha: "2025-05-12", estado: "Completado" },
  { tipo: "Compra en tienda", monto: 1200, moneda: "tokens", fecha: "2025-05-13", estado: "Completado" }
];

// Renderizar los movimientos
function renderizarMovimientos() {
  if (!visorMovimientos) return;

  visorMovimientos.innerHTML = "";

  if (movimientosSimulados.length === 0) {
    visorMovimientos.innerHTML = "<p style='color:#aaa;'>Aún no hay movimientos registrados.</p>";
    return;
  }

  movimientosSimulados.forEach(mov => {
    const item = document.createElement("div");
    item.className = "movimiento";
    item.style = `
      background: #111;
      padding: 12px;
      margin-bottom: 10px;
      border-radius: 10px;
      border-left: 4px solid ${
        mov.estado === "Pendiente" ? "#ffaa00" : "#00ff88"
      };
      color: white;
    `;

    item.innerHTML = `
      <strong>${mov.tipo}</strong><br>
      <span style="color:#00ffff;">${mov.monto} ${mov.moneda}</span><br>
      <span style="color:#ccc;">${mov.fecha}</span><br>
      <span style="color:${mov.estado === "Pendiente" ? "#ffaa00" : "#00ff88"};">${mov.estado}</span>
    `;

    visorMovimientos.appendChild(item);
  });

  mostrarNotificacion("Movimientos actualizados", "Lista de transacciones cargada", "info");
}

// Inicializar módulo
function inicializarMovimientos() {
  if (!visorMovimientos) {
    console.warn("No se encontró el contenedor de movimientos.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarMovimientos();
    } else {
      visorMovimientos.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus movimientos.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarMovimientos);
