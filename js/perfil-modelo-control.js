// perfil-modelo-control.js

import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos del DOM
const inputNombre = document.getElementById("nombreModelo");
const inputPresentacion = document.getElementById("presentacionModelo");
const inputRedes = document.getElementById("redesModelo");
const btnGuardar = document.getElementById("btnGuardarModelo");
const visorModelo = document.getElementById("resumenModelo");

let modeloActual = null;

// Mostrar datos guardados
function cargarPerfilModelo(user) {
  const email = user.email;
  const datos = JSON.parse(localStorage.getItem(`modelo_${email}`)) || {
    nombre: user.displayName || "",
    presentacion: "",
    redes: ""
  };

  inputNombre.value = datos.nombre;
  inputPresentacion.value = datos.presentacion;
  inputRedes.value = datos.redes;

  if (visorModelo) {
    visorModelo.innerHTML = `
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Nombre artístico:</strong> ${datos.nombre}</p>
      <p><strong>Redes:</strong> ${datos.redes || "No agregadas"}</p>
    `;
  }
}

// Guardar cambios del perfil
function guardarPerfilModelo() {
  const nombre = inputNombre.value.trim();
  const presentacion = inputPresentacion.value.trim();
  const redes = inputRedes.value.trim();

  if (!nombre) {
    mostrarNotificacion("Campo requerido", "El nombre artístico no puede estar vacío", "warning");
    return;
  }

  updateProfile(modeloActual, {
    displayName: nombre
  })
    .then(() => {
      const datos = { nombre, presentacion, redes };
      localStorage.setItem(`modelo_${modeloActual.email}`, JSON.stringify(datos));
      mostrarNotificacion("Perfil actualizado", "Tu perfil fue guardado exitosamente", "success");
      cargarPerfilModelo(modeloActual);
    })
    .catch((error) => {
      console.error(error);
      mostrarNotificacion("Error", "No se pudo actualizar tu perfil", "error");
    });
}

// Inicializar módulo
function inicializarPerfilModelo() {
  if (!inputNombre || !inputPresentacion || !inputRedes || !btnGuardar) {
    console.warn("Faltan campos del perfil de modelo.");
    return;
  }

  onAuthStateChanged(getAuth(app), (user) => {
    if (user) {
      modeloActual = user;
      cargarPerfilModelo(user);
      btnGuardar.addEventListener("click", guardarPerfilModelo);
    } else {
      mostrarNotificacion("Sesión requerida", "Inicia sesión para acceder a tu perfil", "warning");
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPerfilModelo);
