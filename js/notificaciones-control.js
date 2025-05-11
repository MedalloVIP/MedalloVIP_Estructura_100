// notificaciones-control.js

// Mostrar notificación en pantalla con sonido
export function mostrarNotificacion(titulo, mensaje, tipo = "info") {
  const contenedor = document.createElement("div");

  contenedor.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${tipo === "éxito" ? "#00ff99" : tipo === "error" ? "#ff4444" : "#00ffff"};
    color: black;
    padding: 16px 20px;
    border-radius: 12px;
    font-weight: bold;
    font-family: sans-serif;
    box-shadow: 0 0 15px ${tipo === "éxito" ? "#00ffcc" : "#00ffff"};
    z-index: 9999;
    opacity: 0.95;
    animation: aparecer 0.4s ease-out;
  `;

  contenedor.innerHTML = `<strong>${titulo}</strong><br>${mensaje}`;
  document.body.appendChild(contenedor);

  // Reproduce sonido correspondiente
  reproducirSonido(tipo);

  // Elimina después de 4 segundos
  setTimeout(() => {
    contenedor.remove();
  }, 4000);
}

// Reproduce sonido según el tipo de notificación
function reproducirSonido(tipo) {
  let audio = new Audio();

  if (tipo === "éxito") {
    audio.src = "./sonidos/exito.mp3";
  } else if (tipo === "error") {
    audio.src = "./sonidos/error.mp3";
  } else {
    audio.src = "./sonidos/notificacion.mp3";
  }

  audio.volume = 0.6;
  audio.play();
}
