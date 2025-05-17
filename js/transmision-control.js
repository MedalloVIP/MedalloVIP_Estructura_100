// trasmision-control.js

import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const db = getDatabase(app);
const auth = getAuth(app);

// Elementos DOM
const inputTitulo = document.getElementById("tituloStream");
const selectCategoria = document.getElementById("categoriaStream");
const btnActivar = document.getElementById("btnActivarStream");
const btnFinalizar = document.getElementById("btnFinalizarStream");
const visorEstado = document.getElementById("estadoStream");

let usuarioActual = null;

// Activar transmisión
function activarTransmision() {
  const titulo = inputTitulo?.value.trim() || "Transmisión en vivo";
  const categoria = selectCategoria?.value || "General";

  const datos = {
    email: usuarioActual.email,
    nombre: usuarioActual.displayName || usuarioActual.email,
    titulo,
    categoria,
    activa: true,
    timestamp: Date.now()
  };

  const ruta = `transmisiones/${usuarioActual.uid}`;
  set(ref(db, ruta), datos)
    .then(() => {
      mostrarNotificacion("Transmisión activa", "Tu estado fue publicado", "success");
      visorEstado.innerHTML = `<span style="color:#00ff88;">EN VIVO</span>`;
    })
    .catch((err) => {
      mostrarNotificacion("Error", "No se pudo activar la transmisión", "error");
      console.error(err);
    });
}

// Finalizar transmisión
function finalizarTransmision() {
  const ruta = `transmisiones/${usuarioActual.uid}`;
  remove(ref(db, ruta))
    .then(() => {
      mostrarNotificacion("Transmisión finalizada", "Ya no estás en vivo", "info");
      visorEstado.innerHTML = `<span style="color:#999;">OFFLINE</span>`;
    })
    .catch((err) => {
      mostrarNotificacion("Error", "No se pudo finalizar la transmisión", "error");
      console.error(err);
    });
}

// Inicializar módulo
function inicializarEstadoTransmision() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;

      if (btnActivar) btnActivar.addEventListener("click", activarTransmision);
      if (btnFinalizar) btnFinalizar.addEventListener("click", finalizarTransmision);

      const ruta = `transmisiones/${user.uid}`;
      onValue(ref(db, ruta), (snapshot) => {
        if (snapshot.exists()) {
          visorEstado.innerHTML = `<span style="color:#00ff88;">EN VIVO</span>`;
        } else {
          visorEstado.innerHTML = `<span style="color:#999;">OFFLINE</span>`;
        }
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarEstadoTransmision);
