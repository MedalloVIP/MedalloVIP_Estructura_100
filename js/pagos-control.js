// pagos-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorPagos = document.getElementById("listaPagos");

let usuarioActual = null;

// Pagos simulados para la beta
const pagosSimulados = [
  {
    tipo: "Retiro a cuenta bancaria",
    monto: 50000,
    fecha: "2025-05-10",
    estado: "Completado"
  },
  {
    tipo: "Pago pendiente",
    monto: 30000,
    fecha: "2025-05-14",
    estado: "En proceso"
  },
  {
    tipo: "Bonificación semanal",
    monto: 15000,
    fecha: "2025-05-17",
    estado: "Completado"
  }
];

// Renderizar pagos
function renderizarPagos() {
  if (!visorPagos) return;

  visorPagos.innerHTML = "";

  if (pagosSimulados.length === 0) {
    visorPagos.innerHTML = "<p style='color:#aaa;'>No tienes pagos registrados.</p>";
    return;
  }

  pagosSimulados.forEach(pago => {
    const item = document.createElement("div");
    item.className = "pago-item";
    item.style = `
      background: #111;
      padding: 12px;
      margin-bottom: 12px;
      border-radius: 10px;
      color: white;
      border-left: 4px solid ${
        pago.estado === "En proceso" ? "#ffaa00" : "#00ff88"
      };
    `;

    item.innerHTML = `
      <strong>${pago.tipo}</strong><br>
      Monto: <span style="color:#00ffff;">$${pago.monto.toLocaleString()}</span><br>
      Fecha: <span style="color:#ccc;">${pago.fecha}</span><br>
      Estado: <span style="color:${
        pago.estado === "En proceso" ? "#ffaa00" : "#00ff88"
      };">${pago.estado}</span>
    `;

    visorPagos.appendChild(item);
  });

  mostrarNotificacion("Pagos cargados", "Historial de pagos actualizado", "info");
}

// Inicializar módulo
function inicializarPagos() {
  if (!visorPagos) {
    console.warn("No se encontró el contenedor de pagos.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarPagos();
    } else {
      visorPagos.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus pagos.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPagos);
