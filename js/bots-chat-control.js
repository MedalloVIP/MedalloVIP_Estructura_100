// bots-chat-control.js

export function iniciarBotMensajes(chatElement) {
  const mensajesAutomaticos = [
    "¡Bienvenido a MedalloVIP, disfruta del show!",
    "No olvides enviar tus tokens si te está gustando el espectáculo.",
    "Activa el modo privado para una experiencia única.",
    "Sigue a tu modelo favorita para no perderte nada.",
    "¡Participa en el ranking de fans del mes!"
  ];

  let contador = 0;

  setInterval(() => {
    if (!chatElement) return;
    const mensaje = document.createElement("div");
    mensaje.className = "mensaje-bot";
    mensaje.textContent = mensajesAutomaticos[contador % mensajesAutomaticos.length];
    chatElement.appendChild(mensaje);
    contador++;
    chatElement.scrollTop = chatElement.scrollHeight;
  }, 60000); // cada 60 segundos
}

export function mensajeBienvenida(chatElement, nombreUsuario) {
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje-bot";
  mensaje.textContent = `Hola ${nombreUsuario}, ¡bienvenido al show!`;
  chatElement.appendChild(mensaje);
  chatElement.scrollTop = chatElement.scrollHeight;
}
