// mensajes-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos del DOM
const inputMensaje = document.getElementById("mensajePrivado");
const btnEnviar = document.getElementById("btnEnviarMensaje");
const contenedorMensajes = document.getElementById("zonaMensajesPrivados");

// Datos simulados
const usuarioActual = "Tú";
const destinatario = "ModeloVIP";

// Enviar mensaje
btnEnviar?.addEventListener("click", () => {
  const texto = inputMensaje?.value.trim();

  if (!texto) {
    mostrarNotificacion("Mensaje vacío", "Escribe algo antes de enviar", "error");
    return;
  }

  agregarMensaje(usuarioActual, texto, "derecha");

  // Simulación de respuesta automática
  setTimeout(() => {
    agregarMensaje(destinatario, "Gracias por tu mensaje. Te responderé pronto.", "izquierda");
  }, 1500);

  mostrarNotificacion("Mensaje enviado", "Privado con éxito", "éxito");
  inputMensaje.value = "";
});

// Agregar mensaje al historial
function agregarMensaje(remitente, contenido, lado = "derecha") {
  const msg = document.createElement("div");
  msg.style = `
    background: ${lado === "derecha" ? "#00ffff" : "#ff00ff"};
    color: black;
    margin: 8px 0;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
    align-self: ${lado === "derecha" ? "flex-end" : "flex-start"};
  `;
  msg.textContent = `${remitente}: ${contenido}`;
  contenedorMensajes?.appendChild(msg);
  contenedorMensajes?.scrollTo(0, contenedorMensajes.scrollHeight);
}
