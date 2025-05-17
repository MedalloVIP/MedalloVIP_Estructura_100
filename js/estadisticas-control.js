// estadisticas-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorEstadisticas = document.getElementById("contenedorEstadisticas");

// Datos simulados para prueba beta
const datosSimulados = {
  seguidores: 1284,
  tokensGenerados: 54500,
  transmisiones: 32,
  fansVIP: 85,
  rankingGlobal: 12
};

// Mostrar las estadísticas
function mostrarEstadisticas() {
  if (!visorEstadisticas) return;

  visorEstadisticas.innerHTML = `
    <div style="display:grid; gap:12px;">
      <div class="estadistica">Seguidores: <strong style="color:#00ffff;">${datosSimulados.seguidores}</strong></div>
      <div class="estadistica">Tokens generados: <strong style="color:#ff00ff;">${datosSimulados.tokensGenerados}</strong></div>
      <div class="estadistica">Transmisiones realizadas: <strong>${datosSimulados.transmisiones}</strong></div>
      <div class="estadistica">Fans VIP: <strong>${datosSimulados.fansVIP}</strong></div>
      <div class="estadistica">Ranking global: <strong>#${datosSimulados.rankingGlobal}</strong></div>
    </div>
  `;

  mostrarNotificacion("Estadísticas", "Datos cargados correctamente", "info");
}

// Inicializar estadísticas
function inicializarEstadisticas() {
  if (!visorEstadisticas) {
    console.warn("No se encontró el contenedor de estadísticas.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      mostrarEstadisticas();
    } else {
      visorEstadisticas.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus estadísticas.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarEstadisticas);
