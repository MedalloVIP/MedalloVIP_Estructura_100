// clubfans-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const botonUnirse = document.getElementById("subscribeBtn");
const estadoClub = document.getElementById("clubStatus");

botonUnirse.addEventListener("click", () => {
  // Simula que el usuario se une exitosamente
  estadoClub.innerText = "¡Ya eres parte del Club de Fans!";
  botonUnirse.disabled = true;
  botonUnirse.innerText = "Miembro activo";

  // Mostrar notificación sonora y visual
  mostrarNotificacion("¡Bienvenido al Club de Fans!", "Disfruta beneficios exclusivos desde ahora", "éxito");
});
