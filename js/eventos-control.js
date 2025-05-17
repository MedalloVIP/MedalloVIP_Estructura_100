// eventos-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorEventos = document.getElementById("listaEventos");

// Eventos simulados
const eventosSimulados = [
  { nombre: "Lanzamiento Oficial", fecha: "2025-05-20", tipo: "global" },
  { nombre: "Día del Modelo", fecha: "2025-05-25", tipo: "celebración" },
  { nombre: "Evento Exclusivo VIP", fecha: "2025-05-28", tipo: "vip" }
];

// Renderizar eventos
function renderizarEventos() {
  if (!visorEventos) return;

  visorEventos.innerHTML = "";

  eventosSimulados.forEach(evento => {
    const item = document.createElement("div");
    item.className = "evento";
    item.style = `
      background: #111;
      border-left: 4px solid ${evento.tipo === "vip" ? "#ff00ff" : evento.tipo === "celebración" ? "#ffaa00" : "#00ffff"};
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 8px;
      color: white;
    `;

    item.innerHTML = `
      <strong>${evento.nombre}</strong><br>
      <span style="color: #ccc;">Fecha: ${evento.fecha}</span><br>
      <span style="font-size: 12px; color: #aaa;">Tipo: ${evento.tipo.toUpperCase()}</span>
    `;

    visorEventos.appendChild(item);
  });

  mostrarNotificacion("Eventos cargados", `${eventosSimulados.length} eventos activos`, "info");
}

// Inicializar módulo
function inicializarEventos() {
  if (!visorEventos) {
    console.warn("No se encontró el contenedor de eventos.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      renderizarEventos();
    } else {
      visorEventos.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver los eventos especiales.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarEventos);
