// ranking-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Datos simulados de modelos destacados
const modelos = [
  { nombre: "Valentina", tokens: 9420, fans: 228 },
  { nombre: "AlexaMoon", tokens: 8590, fans: 201 },
  { nombre: "DomiXX", tokens: 7320, fans: 178 },
  { nombre: "NovaChloe", tokens: 6690, fans: 160 },
  { nombre: "JadeLuz", tokens: 5280, fans: 144 }
];

// Mostrar ranking
function cargarRanking() {
  const contenedor = document.getElementById("tablaRanking");

  if (!contenedor) {
    console.error("No se encontró el contenedor del ranking");
    return;
  }

  contenedor.innerHTML = "";

  modelos.sort((a, b) => b.tokens - a.tokens);

  modelos.forEach((modelo, index) => {
    const fila = document.createElement("div");
    fila.className = "fila-ranking";
    fila.style = `
      padding: 12px;
      margin-bottom: 6px;
      background: rgba(255,255,255,0.03);
      border: 1px solid #00ffff;
      border-radius: 8px;
    `;

    fila.innerHTML = `
      <strong style="color:#ff00ff;">#${index + 1}</strong> 
      <span style="margin-left: 12px;">${modelo.nombre}</span>
      <span style="float:right; color:#00ffff;">${modelo.tokens} tokens</span>
    `;

    contenedor.appendChild(fila);
  });

  mostrarNotificacion("Ranking actualizado", "Top 5 modelos más activas", "info");
}

window.addEventListener("DOMContentLoaded", cargarRanking);
