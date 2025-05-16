// biografia-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const inputBio = document.getElementById("inputBiografia");
const btnGuardarBio = document.getElementById("btnGuardarBiografia");
const visorBio = document.getElementById("bioActual");

// Cargar biografía simulada desde localStorage (a futuro Firebase)
function cargarBiografia(usuario) {
  const key = `biografia_${usuario.email}`;
  const bioGuardada = localStorage.getItem(key);

  visorBio.textContent = bioGuardada || "Aún no has escrito tu biografía.";
  inputBio.value = bioGuardada || "";
}

// Guardar biografía en localStorage
function guardarBiografia(usuario) {
  const nuevaBio = inputBio.value.trim();
  const key = `biografia_${usuario.email}`;

  if (!nuevaBio) {
    mostrarNotificacion("Campo vacío", "La biografía no puede estar vacía", "warning");
    return;
  }

  localStorage.setItem(key, nuevaBio);
  visorBio.textContent = nuevaBio;

  mostrarNotificacion("Biografía actualizada", "Tu biografía fue guardada exitosamente", "success");
}

// Iniciar control al cargar
function inicializarBiografia() {
  if (!inputBio || !btnGuardarBio || !visorBio) {
    console.warn("Faltan elementos del DOM para biografía.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      cargarBiografia(user);

      btnGuardarBio.addEventListener("click", () => {
        guardarBiografia(user);
      });
    } else {
      visorBio.textContent = "Debes iniciar sesión para ver o editar tu biografía.";
      inputBio.disabled = true;
      btnGuardarBio.disabled = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarBiografia);
