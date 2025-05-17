// mensajes-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorMensajes = document.getElementById("listaMensajes");
const formRespuesta = document.getElementById("formRespuesta");

let usuarioActual = null;

// Mensajes simulados (pueden conectarse a Firebase después)
let mensajesSimulados = [
  {
    de: "modelo_valentina@vip.com",
    asunto: "¡Gracias por tu apoyo!",
    contenido: "Eres increíble, pronto haré un show especial solo para ti.",
    leido: false
  },
  {
    de: "admin@medallovip.live",
    asunto: "Bienvenido a MedalloVIP",
    contenido: "Tu cuenta ha sido activada exitosamente.",
    leido: true
  }
];

// Mostrar mensajes
function renderizarMensajes() {
  if (!visorMensajes) return;

  visorMensajes.innerHTML = "";

  if (mensajesSimulados.length === 0) {
    visorMensajes.innerHTML = "<p style='color:#aaa;'>No tienes mensajes en este momento.</p>";
    return;
  }

  mensajesSimulados.forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "mensaje-privado";
    div.style = `
      background: #111;
      padding: 12px;
      margin-bottom: 10px;
      border-left: 4px solid ${msg.leido ? "#00ff88" : "#ffaa00"};
      border-radius: 8px;
      color: white;
    `;

    div.innerHTML = `
      <strong>${msg.asunto}</strong><br>
      <span style="color:#00ffff;">De:</span> ${msg.de}<br>
      <p style="margin-top: 8px;">${msg.contenido}</p>
      <button onclick="responderMensaje('${msg.de}', '${msg.asunto}')" 
        style="background:#00ffff; color:black; border:none; border-radius:6px; padding:6px 12px; cursor:pointer;">Responder</button>
    `;

    visorMensajes.appendChild(div);
  });
}

// Simular respuesta (modo beta)
window.responderMensaje = function(destinatario, asuntoOriginal) {
  if (!formRespuesta) return;
  formRespuesta.style.display = "block";

  formRespuesta.destinatario.value = destinatario;
  formRespuesta.asunto.value = `RE: ${asuntoOriginal}`;
  formRespuesta.mensaje.value = "";
  formRespuesta.scrollIntoView({ behavior: "smooth" });
}

// Enviar mensaje simulado
function enviarMensaje(e) {
  e.preventDefault();

  const destinatario = formRespuesta.destinatario.value.trim();
  const asunto = formRespuesta.asunto.value.trim();
  const mensaje = formRespuesta.mensaje.value.trim();

  if (!destinatario || !asunto || !mensaje) {
    mostrarNotificacion("Campos incompletos", "Por favor completa todos los campos", "warning");
    return;
  }

  // Simular envío
  mostrarNotificacion("Mensaje enviado", `Tu mensaje a ${destinatario} fue enviado`, "success");
  formRespuesta.reset();
  formRespuesta.style.display = "none";
}

// Inicializar sistema
function inicializarMensajes() {
  if (!visorMensajes || !formRespuesta) {
    console.warn("Faltan elementos de mensajes.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarMensajes();
      formRespuesta.addEventListener("submit", enviarMensaje);
    } else {
      visorMensajes.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus mensajes.</p>";
      formRespuesta.style.display = "none";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarMensajes);
