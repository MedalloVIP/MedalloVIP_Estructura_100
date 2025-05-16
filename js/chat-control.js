// chat-control.js

import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebase-config.js";
import { moderarMensaje } from "./moderación-control.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos del DOM
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

// Conexión a Firebase Realtime Database
const db = getDatabase(app);
const mensajesRef = ref(db, "mensajes");

// Enviar mensaje
function enviarMensaje() {
  const name = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (!name || !text) {
    mostrarNotificacion("Campos vacíos", "Escribe tu nombre y un mensaje antes de enviar", "warning");
    return;
  }

  const permitido = moderarMensaje(text, name);
  if (!permitido) {
    mostrarNotificacion("Mensaje bloqueado", "Tu mensaje fue filtrado por moderación", "error");
    return;
  }

  // Guardar mensaje en la base
  push(mensajesRef, { name, text })
    .then(() => {
      mostrarNotificacion("Mensaje enviado", "Tu mensaje fue enviado con éxito", "success");
      messageInput.value = "";
    })
    .catch((error) => {
      console.error("Error al enviar mensaje:", error);
      mostrarNotificacion("Error", "No se pudo enviar el mensaje", "error");
    });
}

// Mostrar mensajes en tiempo real
function escucharMensajes() {
  onChildAdded(mensajesRef, (data) => {
    const { name, text } = data.val();

    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong style="color:#00ffff;">${name}:</strong> ${text}`;
    div.style.marginBottom = "6px";

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Inicializar sistema de chat
function inicializarChat() {
  if (!chatBox || !usernameInput || !messageInput || !sendBtn) {
    console.warn("Faltan elementos del chat en el DOM.");
    return;
  }

  sendBtn.addEventListener("click", enviarMensaje);
  escucharMensajes();
}

window.addEventListener("DOMContentLoaded", inicializarChat);
