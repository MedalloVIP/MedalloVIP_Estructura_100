// perfil-estudio-control.js

import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos HTML
const inputNombre = document.getElementById("nombreEstudio");
const inputUbicacion = document.getElementById("ubicacionEstudio");
const inputDescripcion = document.getElementById("descripcionEstudio");
const btnGuardar = document.getElementById("btnGuardarEstudio");
const visorResumen = document.getElementById("resumenEstudio");

let estudioActual = null;

// Mostrar información del estudio en el visor
function cargarPerfilEstudio(user) {
  const email = user.email;
  const datos = JSON.parse(localStorage.getItem(`estudio_${email}`)) || {
    nombre: "",
    ubicacion: "",
    descripcion: ""
  };

  inputNombre.value = datos.nombre;
  inputUbicacion.value = datos.ubicacion;
  inputDescripcion.value = datos.descripcion;

  if (visorResumen) {
    visorResumen.innerHTML = `
      <p><strong>Correo del estudio:</strong> ${email}</p>
      <p><strong>Nombre:</strong> ${datos.nombre || "No definido"}</p>
      <p><strong>Ubicación:</strong> ${datos.ubicacion || "No definida"}</p>
    `;
  }
}

// Guardar cambios del perfil del estudio
function guardarPerfilEstudio() {
  const nombre = inputNombre.value.trim();
  const ubicacion = inputUbicacion.value.trim();
  const descripcion = inputDescripcion.value.trim();

  if (!nombre || !ubicacion) {
    mostrarNotificacion("Datos incompletos", "Nombre y ubicación son obligatorios", "warning");
    return;
  }

  const datos = {
    nombre,
    ubicacion,
    descripcion
  };

  localStorage.setItem(`estudio_${estudioActual.email}`, JSON.stringify(datos));
  mostrarNotificacion("Perfil guardado", "Los datos del estudio fueron actualizados", "success");
  cargarPerfilEstudio(estudioActual);
}

// Inicializar módulo
function inicializarPerfilEstudio() {
  if (!inputNombre || !inputUbicacion || !inputDescripcion || !btnGuardar) {
    console.warn("Faltan campos del perfil de estudio.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      estudioActual = user;
      cargarPerfilEstudio(user);
      btnGuardar.addEventListener("click", guardarPerfilEstudio);
    } else {
      mostrarNotificacion("No autenticado", "Inicia sesión como estudio para acceder al perfil", "warning");
    }
  });
}

const auth = getAuth(app);
window.addEventListener("DOMContentLoaded", inicializarPerfilEstudio);
