// clubfans-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const estadoClub = document.getElementById("clubStatus");
const btnUnirse = document.getElementById("subscribeBtn");

let usuarioActual = null;

// Obtener estado local del club
function obtenerEstadoClub(email) {
  return localStorage.getItem(`clubFans_${email}`) === "activo";
}

// Guardar estado del club
function guardarEstadoClub(email, estado) {
  localStorage.setItem(`clubFans_${email}`, estado ? "activo" : "inactivo");
}

// Renderizar estado
function mostrarEstadoClub(email) {
  const activo = obtenerEstadoClub(email);

  if (estadoClub) {
    estadoClub.innerHTML = activo
      ? "<span style='color:#00ff88;'>Eres parte del Club de Fans VIP</span>"
      : "<span style='color:#aaa;'>Aún no eres parte del Club de Fans</span>";
  }

  if (btnUnirse) {
    btnUnirse.textContent = activo ? "Salir del Club" : "Unirse al Club";
    btnUnirse.style.backgroundColor = activo ? "#ff4444" : "#00ffff";
  }
}

// Alternar membresía
function alternarClub() {
  if (!usuarioActual) return;

  const estadoActual = obtenerEstadoClub(usuarioActual.email);
  const nuevoEstado = !estadoActual;

  guardarEstadoClub(usuarioActual.email, nuevoEstado);
  mostrarEstadoClub(usuarioActual.email);

  const mensaje = nuevoEstado ? "¡Bienvenido al Club de Fans VIP!" : "Has salido del Club de Fans";
  mostrarNotificacion("Estado actualizado", mensaje, nuevoEstado ? "success" : "warning");
}

// Inicializar control
function inicializarClubFans() {
  if (!estadoClub || !btnUnirse) {
    console.warn("Faltan elementos del Club de Fans en el DOM.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      mostrarEstadoClub(user.email);

      btnUnirse.addEventListener("click", alternarClub);
    } else {
      estadoClub.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver o unirte al Club de Fans.</p>";
      btnUnirse.disabled = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarClubFans);
