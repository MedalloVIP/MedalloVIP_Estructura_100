// soporte-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const inputMensaje = document.getElementById("mensajeSoporte");
const selectorTipo = document.getElementById("tipoUsuarioSoporte");
const btnEnviar = document.getElementById("btnEnviarSoporte");
const visorSoporte = document.getElementById("historialSoporte");

let usuarioActual = null;

// Simulación de envíos de tickets
let ticketsSoporte = JSON.parse(localStorage.getItem("ticketsSoporte") || "[]");

// Renderizar tickets enviados
function renderizarTickets() {
  if (!visorSoporte) return;

  visorSoporte.innerHTML = "";

  if (ticketsSoporte.length === 0) {
    visorSoporte.innerHTML = "<p style='color:#aaa;'>No has enviado solicitudes de soporte aún.</p>";
    return;
  }

  ticketsSoporte
    .filter(t => t.email === usuarioActual.email)
    .forEach(ticket => {
      const item = document.createElement("div");
      item.className = "ticket";
      item.style = `
        background: #111;
        padding: 12px;
        margin-bottom: 10px;
        border-left: 4px solid #00ffff;
        border-radius: 10px;
        color: white;
      `;

      item.innerHTML = `
        <strong>${ticket.tipo}</strong> - <small style="color:#aaa;">${ticket.fecha}</small><br>
        <span>${ticket.mensaje}</span>
      `;

      visorSoporte.appendChild(item);
    });
}

// Enviar nuevo ticket de soporte
function enviarSoporte() {
  const mensaje = inputMensaje.value.trim();
  const tipo = selectorTipo.value;

  if (!mensaje || !tipo) {
    mostrarNotificacion("Campos incompletos", "Debes seleccionar un tipo y escribir un mensaje", "warning");
    return;
  }

  const nuevoTicket = {
    email: usuarioActual.email,
    tipo,
    mensaje,
    fecha: new Date().toLocaleString()
  };

  ticketsSoporte.push(nuevoTicket);
  localStorage.setItem("ticketsSoporte", JSON.stringify(ticketsSoporte));

  mostrarNotificacion("Soporte enviado", "Tu solicitud fue registrada con éxito", "success");
  inputMensaje.value = "";
  renderizarTickets();
}

// Inicializar módulo
function inicializarSoporte() {
  if (!inputMensaje || !selectorTipo || !btnEnviar || !visorSoporte) {
    console.warn("Faltan elementos del módulo de soporte.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarTickets();
      btnEnviar.addEventListener("click", enviarSoporte);
    } else {
      visorSoporte.innerHTML = "<p style='color:#aaa;'>Inicia sesión para enviar una solicitud de soporte.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarSoporte);
