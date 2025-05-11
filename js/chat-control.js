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

// Conexión a la base de datos
const db = getDatabase(app);
const mensajesRef = ref(db, "mensajes");

// Enviar mensaje
sendBtn.onclick = () => {
  const name = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (name !== "" && text !== "") {
    const permitido = moderarMensaje(text, name);
    if (!permitido) {
      return; // mensaje bloqueado
    }

    // Guardar mensaje en Firebase
    push(mensajesRef, { name, text });

    // Notificación de éxito
    mostrarNotificacion("Mensaje enviado", "Tu mensaje fue enviado con éxito", "éxito");

    // Limpiar input
    messageInput.value = "";
  }
};

// Mostrar mensajes en tiempo real
onChildAdded(mensajesRef, (data) => {
  const { name, text } = data.val();
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong style="color:#00ffff;">${name}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
