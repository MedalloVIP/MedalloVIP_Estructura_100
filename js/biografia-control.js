// biografia-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const textareaBio = document.getElementById("bioInput");
const btnGuardarBio = document.getElementById("btnGuardarBio");
const visorBio = document.getElementById("bioUsuario");

// Obtener biografía desde almacenamiento local (puede ser Firestore luego)
function obtenerBiografia() {
  return localStorage.getItem("bioMedalloVIP") || "";
}

// Guardar biografía
function guardarBiografia(texto) {
  localStorage.setItem("bioMedalloVIP", texto);
}

// Mostrar biografía en visor
function mostrarBiografia() {
  if (visorBio) {
    visorBio.textContent = obtenerBiografia();
  }
  if (textareaBio) {
    textareaBio.value = obtenerBiografia();
  }
}

// Guardar desde textarea
btnGuardarBio?.addEventListener("click", () => {
  const texto = textareaBio?.value.trim();

  if (!texto || texto.length < 10) {
    mostrarNotificacion("Biografía muy corta", "Escribe al menos 10 caracteres", "error");
    return;
  }

  guardarBiografia(texto);
  mostrarBiografia();
  mostrarNotificacion("Biografía guardada", "Tu información fue actualizada", "éxito");
});

window.addEventListener("DOMContentLoaded", mostrarBiografia);
