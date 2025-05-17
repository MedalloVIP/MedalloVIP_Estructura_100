// resolucion-control.js

const selectorResolucion = document.getElementById("selectorResolucion");
const visorResolucion = document.getElementById("resolucionActual");

// Opciones disponibles
const resoluciones = {
  "240p": { ancho: 426, alto: 240 },
  "360p": { ancho: 640, alto: 360 },
  "480p": { ancho: 854, alto: 480 },
  "720p": { ancho: 1280, alto: 720 },
  "1080p": { ancho: 1920, alto: 1080 }
};

// Mostrar resolución actual
function mostrarResolucionActual(valor) {
  const datos = resoluciones[valor];
  if (visorResolucion) {
    visorResolucion.textContent = `Resolución seleccionada: ${valor} (${datos.ancho}x${datos.alto})`;
  }
}

// Guardar selección y simular aplicación
function cambiarResolucion() {
  const valor = selectorResolucion.value;
  localStorage.setItem("resolucionPreferida", valor);
  mostrarResolucionActual(valor);

  // A futuro: integración real con transmisiones (ej. LiveKit)
  console.log(`Resolución cambiada a ${valor}`);
}

// Inicializar el control
function inicializarResolucion() {
  if (!selectorResolucion) {
    console.warn("No se encontró el selector de resolución.");
    return;
  }

  // Cargar preferencia guardada o default
  const guardada = localStorage.getItem("resolucionPreferida") || "720p";
  selectorResolucion.value = guardada;
  mostrarResolucionActual(guardada);

  selectorResolucion.addEventListener("change", cambiarResolucion);
}

window.addEventListener("DOMContentLoaded", inicializarResolucion);
