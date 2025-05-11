// niveles-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Datos simulados de actividad del perfil (se integrará con Firebase)
const actividad = {
  transmisiones: 12,
  tokens: 8420,
  referidos: 8,
  seguidores: 243
};

// Definición de niveles
const niveles = [
  { nombre: "Recién llegada", requisitos: { transmisiones: 0, tokens: 0 } },
  { nombre: "Activa", requisitos: { transmisiones: 5, tokens: 1000 } },
  { nombre: "Modelo VIP", requisitos: { transmisiones: 10, tokens: 5000 } },
  { nombre: "Reina Elite", requisitos: { transmisiones: 20, tokens: 10000 } }
];

// Determinar el nivel actual
function evaluarNivel() {
  let nivelActual = niveles[0];

  for (let i = 0; i < niveles.length; i++) {
    const req = niveles[i].requisitos;
    if (
      actividad.transmisiones >= req.transmisiones &&
      actividad.tokens >= req.tokens
    ) {
      nivelActual = niveles[i];
    } else {
      break;
    }
  }

  mostrarNotificacion("¡Nivel actualizado!", `Tu nivel actual es: ${nivelActual.nombre}`, "info");

  const contenedorNivel = document.getElementById("nivelActual");
  if (contenedorNivel) contenedorNivel.textContent = nivelActual.nombre;
}

window.addEventListener("DOMContentLoaded", evaluarNivel);
