// reacciones-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Reacciones disponibles
const reacciones = [
  { tipo: "aplauso", emoji: "👏", sonido: "notificacion" },
  { tipo: "corazon", emoji: "❤️", sonido: "éxito" },
  { tipo: "fuego", emoji: "🔥", sonido: "éxito" },
  { tipo: "beso", emoji: "😘", sonido: "info" }
];

// Generar botones dinámicamente
function crearBotonesReaccion() {
  const contenedor = document.getElementById("zonaReacciones");

  if (!contenedor) {
    console.error("No se encontró la zona de reacciones");
    return;
  }

  reacciones.forEach(reaccion => {
    const btn = document.createElement("button");
    btn.textContent = reaccion.emoji;
    btn.title = reaccion.tipo;
    btn.style = `
      font-size: 22px;
      margin: 6px;
      padding: 8px;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      cursor: pointer;
      transition: transform 0.2s ease;
    `;

    btn.addEventListener("click", () => {
      mostrarNotificacion("¡Reacción enviada!", `Enviaste ${reaccion.tipo}`, reaccion.sonido);
    });

    contenedor.appendChild(btn);
  });
}

window.addEventListener("DOMContentLoaded", crearBotonesReaccion);
