// perfil-usuario-control.js

import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos del DOM
const inputNombre = document.getElementById("nombreUsuario");
const inputBiografia = document.getElementById("bioUsuario");
const inputRedSocial = document.getElementById("redUsuario");
const btnGuardar = document.getElementById("btnGuardarUsuario");
const visorResumen = document.getElementById("resumenUsuario");

let usuarioActual = null;

// Cargar datos del perfil
function cargarPerfilUsuario(user) {
  const email = user.email;
  const datos = JSON.parse(localStorage.getItem(`usuario_${email}`)) || {
    nombre: user.displayName || "",
    biografia: "",
    red: ""
  };

  inputNombre.value = datos.nombre;
  inputBiografia.value = datos.biografia;
  inputRedSocial.value = datos.red;

  if (visorResumen) {
    visorResumen.innerHTML = `
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Nombre:</strong> ${datos.nombre || "No definido"}</p>
      <p><strong>Red favorita:</strong> ${datos.red || "No asignada"}</p>
    `;
  }
}

// Guardar cambios del perfil
function guardarPerfilUsuario() {
  const nombre = inputNombre.value.trim();
  const biografia = inputBiografia.value.trim();
  const red = inputRedSocial.value.trim();

  if (!nombre) {
    mostrarNotificacion("Nombre requerido", "El nombre no puede estar vacío", "warning");
    return;
  }

  updateProfile(usuarioActual, {
    displayName: nombre
  })
    .then(() => {
      const datos = { nombre, biografia, red };
      localStorage.setItem(`usuario_${usuarioActual.email}`, JSON.stringify(datos));
      mostrarNotificacion("Perfil actualizado", "Tu perfil fue guardado con éxito", "success");
      cargarPerfilUsuario(usuarioActual);
    })
    .catch((error) => {
      console.error(error);
      mostrarNotificacion("Error", "No se pudo actualizar tu perfil", "error");
    });
}

// Inicializar módulo
function inicializarPerfilUsuario() {
  if (!inputNombre || !inputBiografia || !inputRedSocial || !btnGuardar) {
    console.warn("Faltan campos del perfil de usuario.");
    return;
  }

  onAuthStateChanged(getAuth(app), (user) => {
    if (user) {
      usuarioActual = user;
      cargarPerfilUsuario(user);
      btnGuardar.addEventListener("click", guardarPerfilUsuario);
    } else {
      mostrarNotificacion("No autenticado", "Inicia sesión para gestionar tu perfil", "warning");
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPerfilUsuario);
