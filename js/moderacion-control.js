// moderación-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Lista de palabras prohibidas (puedes ampliar esto luego)
const palabrasProhibidas = [
  "puta", "imbécil", "malparido", "maldito", "asqueroso",
  "mierda", "pedo", "pendejo", "perra", "zorra", "culo"
];

// Modera un mensaje antes de enviarlo
function moderarMensaje(mensaje, usuario) {
  const texto = mensaje.toLowerCase();
  const contiene = palabrasProhibidas.some(palabra => texto.includes(palabra));

  if (contiene) {
    // Mostrar alerta al moderador o al mismo usuario
    mostrarNotificacion("¡Mensaje bloqueado!", `Lenguaje inapropiado detectado de ${usuario}`, "error");

    console.warn(`Mensaje bloqueado de ${usuario}: ${mensaje}`);
    return false; // mensaje no permitido
  }

  return true; // mensaje permitido
}

export { moderarMensaje };
