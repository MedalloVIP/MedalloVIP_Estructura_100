// perfil-control.js

import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

// Elementos del DOM
const nombreInput = document.getElementById("perfilNombre");
const presentacionInput = document.getElementById("perfilPresentacion");
const guardarBtn = document.getElementById("btnGuardarPerfil");
const visorInfo = document.getElementById("infoPerfil");

let usuarioActual = null;

// Mostrar los datos del usuario en pantalla
function cargarPerfil(user) {
  const nombre = user.displayName || "";
  const email = user.email;

  if (visorInfo) {
    visorInfo.innerHTML = `
      <p><strong>Correo:</strong> ${email}</p>
    `;
  }

  if (nombreInput) nombreInput.value = nombre;
  if (presentacionInput) presentacionInput.value = localStorage.getItem(`presentacion_${email}`) || "";
}

// Guardar cambios del perfil
function guardarPerfil() {
  const nuevoNombre = nombreInput.value.trim();
  const nuevaPresentacion = presentacionInput.value.trim();

  if (!nuevoNombre) {
    mostrarNotificacion("Error", "El nombre no puede estar vacío", "warning");
    return;
  }

  updateProfile(usuarioActual, {
    displayName: nuevoNombre
  })
    .then(() => {
      localStorage.setItem(`presentacion_${usuarioActual.email}`, nuevaPresentacion);
      mostrarNotificacion("Perfil actualizado", "Tus datos se han guardado", "success");
    })
    .catch((error) => {
      console.error(error);
      mostrarNotificacion("Error", "No se pudo actualizar el perfil", "error");
    });
}

// Inicializar el perfil
function inicializarPerfil() {
  if (!nombreInput || !presentacionInput || !guardarBtn) {
    console.warn("Faltan elementos del perfil.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      cargarPerfil(user);
      guardarBtn.addEventListener("click", guardarPerfil);
    } else {
      mostrarNotificacion("Sin sesión", "Inicia sesión para ver tu perfil", "warning");
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPerfil);
