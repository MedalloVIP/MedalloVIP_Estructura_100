// moderación-control.js

// Lista básica de palabras prohibidas (puedes expandirla o cargarla desde servidor)
const palabrasProhibidas = ["puta", "mierda", "imbécil", "pedo", "asqueroso"];

// Escuchar mensajes en tiempo real desde el chat
function moderarMensaje(mensaje, usuario) {
  const mensajeEnMinusculas = mensaje.toLowerCase();

  const contieneProhibidas = palabrasProhibidas.some(palabra =>
    mensajeEnMinusculas.includes(palabra)
  );

  if (contieneProhibidas) {
    mostrarAlertaModeración(usuario, mensaje);
    bloquearTemporalmente(usuario);
    return false; // mensaje bloqueado
  }

  return true; // mensaje permitido
}

// Mostrar visualmente la alerta en pantalla
function mostrarAlertaModeración(usuario, mensaje) {
  const alerta = document.createElement("div");
  alerta.innerHTML = `
    <strong style="color:#ff0000;">¡ALERTA DE MODERACIÓN!</strong><br>
    Usuario: <span style="color:#00ffff;">${usuario}</span><br>
    Mensaje bloqueado: "${mensaje}"
  `;
  alerta.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 14px;
    font-family: sans-serif;
    border-radius: 10px;
    z-index: 9999;
  `;

  document.body.appendChild(alerta);
  setTimeout(() => alerta.remove(), 5000);
}

// Simulación de bloqueo temporal
function bloquearTemporalmente(usuario) {
  console.warn(`Usuario ${usuario} ha sido silenciado temporalmente.`);
  // Aquí podrías actualizar Firebase o base de datos real
}

// Exportar función si quieres llamarla desde otro módulo
export { moderarMensaje };
