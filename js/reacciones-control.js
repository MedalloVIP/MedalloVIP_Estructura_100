// reacciones-control.js

import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth(app);

const contenedorReacciones = document.getElementById("zonaReacciones");
const visorReacciones = document.getElementById("visorReacciones");
const reaccionesRef = ref(db, "reacciones");

const listaEmojis = ["🔥", "❤️", "😍", "👏", "💋", "💎"];

let usuarioActual = null;

// Crear botones de reacción
function cargarBotonesReaccion() {
  if (!contenedorReacciones) return;

  contenedorReacciones.innerHTML = "";
  listaEmojis.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.textContent = emoji;
    btn.style = `
      font-size: 24px;
      background: none;
      border: none;
      cursor: pointer;
      margin: 0 6px;
    `;
    btn.onclick = () => enviarReaccion(emoji);
    contenedorReacciones.appendChild(btn);
  });
}

// Enviar reacción al backend (Firebase)
function enviarReaccion(emoji) {
  if (!usuarioActual) return;

  push(reaccionesRef, {
    emoji,
    usuario: usuarioActual.email,
    timestamp: Date.now()
  });
}

// Mostrar reacciones en pantalla
function activarReaccionesLive() {
  if (!visorReacciones) return;

  onChildAdded(reaccionesRef, (data) => {
    const { emoji } = data.val();
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style = `
      font-size: 30px;
      animation: flotar 1.5s ease-out forwards;
      position: absolute;
      bottom: 20px;
      left: ${Math.random() * 80 + 10}%;
      z-index: 999;
    `;

    visorReacciones.appendChild(span);

    setTimeout(() => {
      visorReacciones.removeChild(span);
    }, 1500);
  });
}

// Inicializar módulo
function inicializarReacciones() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      cargarBotonesReaccion();
      activarReaccionesLive();
    } else {
      if (contenedorReacciones) contenedorReacciones.innerHTML = "<p style='color:#aaa;'>Inicia sesión para reaccionar.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarReacciones);
