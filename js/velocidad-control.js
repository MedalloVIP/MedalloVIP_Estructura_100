// velocidad-control.js

const selectorVelocidad = document.getElementById("selectorVelocidad");
const video = document.querySelector("video"); // Asegúrate de tener un <video> en pantalla

function aplicarVelocidadGuardada() {
  const velocidadGuardada = localStorage.getItem("velocidadVideo") || "1.0";
  if (selectorVelocidad) selectorVelocidad.value = velocidadGuardada;
  if (video) video.playbackRate = parseFloat(velocidadGuardada);
}

function cambiarVelocidad() {
  const nuevaVelocidad = selectorVelocidad?.value || "1.0";
  if (video) video.playbackRate = parseFloat(nuevaVelocidad);
  localStorage.setItem("velocidadVideo", nuevaVelocidad);
}

function inicializarControlVelocidad() {
  aplicarVelocidadGuardada();
  if (selectorVelocidad) {
    selectorVelocidad.addEventListener("change", cambiarVelocidad);
  }
}

window.addEventListener("DOMContentLoaded", inicializarControlVelocidad);
