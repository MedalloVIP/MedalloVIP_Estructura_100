// ranking-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorRanking = document.getElementById("listaRanking");

// Datos simulados para prueba beta
const rankingSimulado = [
  { nombre: "ValentinaVIP", puntos: 15890, tipo: "Modelo" },
  { nombre: "Estudio Éxito", puntos: 12350, tipo: "Estudio" },
  { nombre: "CamilaLatina", puntos: 11980, tipo: "Modelo" },
  { nombre: "Partner Medellín", puntos: 8750, tipo: "Partner" },
  { nombre: "SofiaHot", puntos: 8460, tipo: "Modelo" },
  { nombre: "CarlosUsuario", puntos: 6540, tipo: "Usuario" }
];

// Renderizar ranking
function renderizarRanking() {
  if (!visorRanking) return;

  visorRanking.innerHTML = "";

  rankingSimulado.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "ranking-item";
    div.style = `
      background: #111;
      padding: 14px;
      border-radius: 10px;
      margin-bottom: 12px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid ${item.tipo === "Modelo" ? "#ff00ff" : item.tipo === "Estudio" ? "#00ffff" : "#ffaa00"};
    `;

    div.innerHTML = `
      <div>
        <strong style="font-size: 16px;">#${index + 1} - ${item.nombre}</strong><br>
        <small style="color:#aaa;">${item.tipo}</small>
      </div>
      <div style="font-size: 16px; color: #00ff88;">
        ${item.puntos} pts
      </div>
    `;

    visorRanking.appendChild(div);
  });

  mostrarNotificacion("Ranking actualizado", "Clasificación cargada con éxito", "info");
}

// Inicializar ranking
function inicializarRanking() {
  if (!visorRanking) {
    console.warn("No se encontró el contenedor del ranking.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      renderizarRanking();
    } else {
      visorRanking.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver el ranking.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarRanking);
