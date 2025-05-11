import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebase-config.js";
import { moderarMensaje } from "./moderación-control.js";

const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat-box");

function agregarMensajeAlChat(username, message) {
  const mensajeHTML = `<p><strong style="color:#00ffff;">${username}:</strong> ${message}</p>`;
  chatBox.innerHTML += mensajeHTML;
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!username || !message) return;

  const permitido = moderarMensaje(message, username);
  if (!permitido) return;

  agregarMensajeAlChat(username, message);
});
// Elementos del DOM
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

// Conexión a Firebase
const db = getDatabase(app);
const mensajesRef = ref(db, "mensajes");

// Enviar mensaje
sendBtn.onclick = () => {
  const name = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (name !== "" && text !== "") {
    push(mensajesRef, { name, text });
    messageInput.value = "";
  }
};

// Mostrar mensajes en tiempo real
onChildAdded(mensajesRef, (data) => {
  const { name, text } = data.val();
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong style="color:#ff00ff;">${name}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
