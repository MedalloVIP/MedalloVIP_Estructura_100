// tiempo-control.js

const relojEcosistema = document.getElementById("relojEcosistema");
const relojUsuario = document.getElementById("relojUsuario");
const fechaActual = document.getElementById("fechaActual");

let inicioSesion = new Date();

// Formatear hora en formato HH:MM:SS
function formatearHora(date) {
  return date.toLocaleTimeString("es-CO", { hour12: false });
}

// Formatear fecha como DD/MM/YYYY
function formatearFecha(date) {
  return date.toLocaleDateString("es-CO");
}

// Actualizar relojes en tiempo real
function actualizarRelojes() {
  const ahora = new Date();

  if (relojEcosistema) {
    relojEcosistema.textContent = `Ecosistema: ${formatearHora(ahora)}`;
  }

  if (relojUsuario) {
    const tiempoActivo = new Date(ahora - inicioSesion);
    relojUsuario.textContent = `Usuario: ${formatearHora(tiempoActivo)}`;
  }

  if (fechaActual) {
    fechaActual.textContent = `Fecha: ${formatearFecha(ahora)}`;
  }
}

function inicializarRelojes() {
  actualizarRelojes();
  setInterval(actualizarRelojes, 1000);
}

window.addEventListener("DOMContentLoaded", inicializarRelojes);
