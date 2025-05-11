// movimientos-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Movimientos simulados
const historial = [
  { tipo: "recarga", detalle: "Recarga manual", cantidad: 1000, fecha: "2025-05-10 08:12" },
  { tipo: "propina", detalle: "Enviada a Valentina", cantidad: -300, fecha: "2025-05-10 08:34" },
  { tipo: "premio", detalle: "200 tokens por meta completada", cantidad: 200, fecha: "2025-05-10 09:01" },
  { tipo: "retiro", detalle: "Transferencia bancaria", cantidad: -1000, fecha: "2025-05-10 09:55" }
];

// Mostrar historial
function mostrarMovimientos() {
  const contenedor = document.getElementById("historialTokens");

  if (!contenedor) {
    console.error("No se encontró el contenedor de historial");
    return;
  }

  contenedor.innerHTML = "";

  historial.forEach((mov) => {
    const item = document.createElement("div");
    item.className = "movimiento-item";
    item.style = `
      padding: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    `;

    const signo = mov.cantidad > 0 ? "+" : "";
    const color = mov.cantidad >= 0 ? "#00ff99" : "#ff4444";

    item.innerHTML = `
      <span>${mov.detalle} <br><small style="color: #999;">${mov.fecha}</small></span>
      <span style="color: ${color}; font-weight: bold;">${signo}${mov.cantidad} tokens</span>
    `;

    contenedor.appendChild(item);
  });

  mostrarNotificacion("Movimientos actualizados", "Se cargó el historial de tokens", "info");
}

window.addEventListener("DOMContentLoaded", mostrarMovimientos);
