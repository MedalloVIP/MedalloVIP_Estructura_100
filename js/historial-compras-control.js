// historial-compras-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorHistorial = document.getElementById("historialCompras");

let usuarioActual = null;

// Historial simulado para beta
const historialSimulado = [
  { producto: "Pack Lencería VIP", tokens: 800, fecha: "2025-05-10", estado: "Entregado" },
  { producto: "Show privado con Aylin", tokens: 1200, fecha: "2025-05-11", estado: "Completado" },
  { producto: "Accesorio especial", tokens: 400, fecha: "2025-05-13", estado: "Pendiente" }
];

// Mostrar historial en la interfaz
function renderizarHistorial() {
  if (!visorHistorial) return;

  visorHistorial.innerHTML = "";

  if (historialSimulado.length === 0) {
    visorHistorial.innerHTML = "<p style='color:#aaa;'>No tienes compras registradas aún.</p>";
    return;
  }

  historialSimulado.forEach(compra => {
    const item = document.createElement("div");
    item.className = "item-historial";
    item.style = `
      background: #111;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 8px;
      color: white;
      border-left: 4px solid ${compra.estado === "Pendiente" ? "#ffaa00" : "#00ff88"};
    `;

    item.innerHTML = `
      <strong>${compra.producto}</strong><br>
      Tokens: <span style="color:#00ffff;">${compra.tokens}</span><br>
      Fecha: <span style="color:#ccc;">${compra.fecha}</span><br>
      Estado: <span style="color:${compra.estado === "Pendiente" ? "#ffaa00" : "#00ff88"};">${compra.estado}</span>
    `;

    visorHistorial.appendChild(item);
  });

  mostrarNotificacion("Historial cargado", "Tus compras han sido listadas correctamente", "info");
}

// Inicializar historial
function inicializarHistorialCompras() {
  if (!visorHistorial) {
    console.warn("No se encontró el contenedor del historial.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarHistorial();
    } else {
      visorHistorial.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tu historial de compras.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarHistorialCompras);
