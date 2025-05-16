// calendario-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorCalendario = document.getElementById("calendarioEventos");

// Eventos simulados (se pueden integrar desde Firestore después)
const eventosSimulados = [
  { titulo: "Show privado con Valentina", fecha: "2025-05-16", hora: "20:00", tipo: "show" },
  { titulo: "Concurso Top Model Semanal", fecha: "2025-05-17", hora: "18:00", tipo: "concurso" },
  { titulo: "Sesión AMA (Pregúntame lo que sea)", fecha: "2025-05-18", hora: "21:00", tipo: "interacción" }
];

// Mostrar eventos en el calendario
function renderizarEventos(usuario) {
  if (!visorCalendario) return;

  visorCalendario.innerHTML = "";

  if (eventosSimulados.length === 0) {
    visorCalendario.innerHTML = "<p style='color:#aaa;'>No hay eventos programados aún.</p>";
    return;
  }

  eventosSimulados.forEach(evento => {
    const item = document.createElement("div");
    item.className = "evento-calendario";
    item.style = `
      background: #111;
      border-left: 5px solid #00ffff;
      padding: 12px;
      margin-bottom: 10px;
      border-radius: 6px;
      color: white;
    `;

    item.innerHTML = `
      <strong>${evento.titulo}</strong><br>
      <span style="color: #aaa;">${evento.fecha} — ${evento.hora}</span><br>
      <span style="color: #ff00ff;">Tipo: ${evento.tipo}</span>
    `;

    visorCalendario.appendChild(item);
  });

  mostrarNotificacion("Eventos cargados", `Se encontraron ${eventosSimulados.length} eventos`, "info");
}

// Inicializar calendario
function inicializarCalendario() {
  if (!visorCalendario) {
    console.warn("No se encontró el visor de calendario.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      renderizarEventos(user);
    } else {
      visorCalendario.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus eventos.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarCalendario);
