// estadisticas-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Datos simulados de ejemplo
const estadisticas = {
  transmisiones: 14,
  tokensGanados: 11200,
  seguidoresNuevos: 57,
  referidosActivos: 6,
  sesiones: 38,
  minutosOnline: 984
};

// Mostrar estadísticas en contenedores
function mostrarEstadisticas() {
  const elementos = {
    transmisiones: document.getElementById("statTransmisiones"),
    tokens: document.getElementById("statTokens"),
    seguidores: document.getElementById("statSeguidores"),
    referidos: document.getElementById("statReferidos"),
    sesiones: document.getElementById("statSesiones"),
    minutos: document.getElementById("statMinutos")
  };

  if (!elementos.transmisiones) {
    console.warn("No se encontró el contenedor de estadísticas");
    return;
  }

  elementos.transmisiones.textContent = estadisticas.transmisiones;
  elementos.tokens.textContent = estadisticas.tokensGanados.toLocaleString() + " tokens";
  elementos.seguidores.textContent = estadisticas.seguidoresNuevos;
  elementos.referidos.textContent = estadisticas.referidosActivos;
  elementos.sesiones.textContent = estadisticas.sesiones;
  elementos.minutos.textContent = estadisticas.minutosOnline + " min";

  mostrarNotificacion("Estadísticas cargadas", "Rendimiento actualizado correctamente", "info");
}

window.addEventListener("DOMContentLoaded", mostrarEstadisticas);
