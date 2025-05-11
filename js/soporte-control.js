// soporte-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const btnEnviarSoporte = document.getElementById("btnSoporte");
const inputMensaje = document.getElementById("mensajeSoporte");

// Evento al enviar soporte
btnEnviarSoporte?.addEventListener("click", () => {
  const mensaje = inputMensaje?.value.trim();

  if (!mensaje || mensaje.length < 5) {
    mostrarNotificacion("Mensaje muy corto", "Escribe al menos 5 caracteres", "error");
    return;
  }

  // Simulación de envío
  console.log("Mensaje enviado al soporte:", mensaje);

  mostrarNotificacion("Mensaje enviado", "Nuestro equipo te responderá pronto", "éxito");

  inputMensaje.value = "";
});
