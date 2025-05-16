// bots-chat-control.js

const chatBox = document.getElementById("chatBox");
const inputMsg = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

// Base de respuestas automáticas del bot
const respuestasBot = [
  { clave: "hola", respuesta: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  { clave: "precio", respuesta: "Los shows privados se valoran en tokens. Consulta la sección de paquetes." },
  { clave: "tokens", respuesta: "Puedes recargar tokens desde tu panel en cualquier momento." },
  { clave: "gracias", respuesta: "¡Con gusto! Estoy aquí para ayudarte." },
  { clave: "adiós", respuesta: "¡Hasta luego! Disfruta tu experiencia en MedalloVIP." }
];

// Función para agregar mensajes al chat
function agregarMensaje(texto, clase = "usuario") {
  const burbuja = document.createElement("div");
  burbuja.className = `mensaje mensaje-${clase}`;
  burbuja.style = `
    padding: 10px;
    margin: 8px 0;
    border-radius: 12px;
    max-width: 80%;
    background: ${clase === "usuario" ? "#00ffff22" : "#ff00ff22"};
    color: white;
  `;
  burbuja.textContent = texto;
  chatBox.appendChild(burbuja);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Procesar entrada y generar respuesta del bot
function procesarMensaje(msg) {
  const entrada = msg.toLowerCase();

  const respuestaEncontrada = respuestasBot.find(regla => entrada.includes(regla.clave));
  const respuesta = respuestaEncontrada
    ? respuestaEncontrada.respuesta
    : "Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";

  setTimeout(() => agregarMensaje(respuesta, "bot"), 800);
}

// Inicializar chat
function inicializarChatBot() {
  if (!chatBox || !inputMsg || !btnEnviar) {
    console.warn("Faltan elementos del DOM para el chat.");
    return;
  }

  btnEnviar.addEventListener("click", () => {
    const msg = inputMsg.value.trim();
    if (!msg) return;

    agregarMensaje(msg, "usuario");
    procesarMensaje(msg);
    inputMsg.value = "";
  });
}

window.addEventListener("DOMContentLoaded", inicializarChatBot);
