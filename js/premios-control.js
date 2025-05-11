// premios-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Premios simulados (se pueden conectar a Firebase luego)
const premiosDesbloqueados = [
  { nombre: "200 tokens", descripcion: "Meta de $50 alcanzada", tipo: "bono" },
  { nombre: "Fan destacado", descripcion: "5 referidos activos", tipo: "ranking" },
  { nombre: "Premio sorpresa", descripcion: "Transmisión de 10 horas", tipo: "logro" }
];

// Mostrar los premios
function mostrarPremios() {
  const contenedor = document.getElementById("listaPremios");

  if (!contenedor) {
    console.error("No se encontró el contenedor de premios");
    return;
  }

  contenedor.innerHTML = "";

  premiosDesbloqueados.forEach((premio, index) => {
    const item = document.createElement("div");
    item.className = "premio-item";
    item.style = `
      background: rgba(255,255,255,0.03);
      padding: 14px;
      margin-bottom: 10px;
      border: 1px solid #00ffff;
      border-radius: 10px;
    `;

    item.innerHTML = `
      <strong style="color:#00ffff;">${premio.nombre}</strong><br>
      <span style="font-size: 13px;">${premio.descripcion}</span>
    `;

    contenedor.appendChild(item);

    setTimeout(() => {
      mostrarNotificacion("¡Premio desbloqueado!", premio.nombre, "éxito");
    }, 800 + index * 1000);
  });
}

window.addEventListener("DOMContentLoaded", mostrarPremios);
