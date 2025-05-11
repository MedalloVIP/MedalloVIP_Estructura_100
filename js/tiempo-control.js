// tiempo-control.js

function actualizarRelojes() {
  const relojEcosistema = document.getElementById("relojEcosistema");
  const relojUsuario = document.getElementById("relojUsuario");
  const fechaActual = document.getElementById("fechaActual");

  const ahora = new Date();

  // Tiempo del ecosistema (UTC universal)
  const tiempoUTC = ahora.toUTCString().split(" ")[4];
  if (relojEcosistema) relojEcosistema.textContent = tiempoUTC;

  // Tiempo local del usuario
  const tiempoLocal = ahora.toLocaleTimeString("es-CO", { hour12: false });
  if (relojUsuario) relojUsuario.textContent = tiempoLocal;

  // Fecha actual formateada
  const fecha = ahora.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  if (fechaActual) fechaActual.textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
}

// Actualizar cada segundo
setInterval(actualizarRelojes, 1000);

// Ejecutar al iniciar
window.addEventListener("DOMContentLoaded", actualizarRelojes);
