// trasmitir-control.js

import { connect, createLocalVideoTrack, createLocalAudioTrack } from "https://cdn.skypack.dev/livekit-client";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos del DOM
const videoElement = document.getElementById("videoModelo");
const btnIniciar = document.getElementById("btnIniciarTransmision");
const btnDetener = document.getElementById("btnDetenerTransmision");

const auth = getAuth(app);

let room = null;
let usuario = null;

// Configura LiveKit
const URL_SERVIDOR = "wss://medallovip-zxlixdwt.livekit.cloud"; // Reemplaza si cambia
let tokenLivekit = null; // Debe generarse dinámicamente en producción

// Generador de token de prueba (solo para fase beta)
function generarToken(nombreUsuario) {
  // Solo para pruebas. En producción, se genera desde backend seguro
  return fetch(`https://tu-backend.com/api/token?nombre=${nombreUsuario}`)
    .then(res => res.text());
}

// Iniciar transmisión
async function iniciarTransmision() {
  if (!usuario) return;

  try {
    mostrarNotificacion("Cargando", "Conectando a LiveKit...", "info");

    if (!tokenLivekit) {
      tokenLivekit = await generarToken(usuario.email.split("@")[0]);
    }

    room = await connect(URL_SERVIDOR, tokenLivekit);

    const videoTrack = await createLocalVideoTrack();
    const audioTrack = await createLocalAudioTrack();

    await room.localParticipant.publishTrack(videoTrack);
    await room.localParticipant.publishTrack(audioTrack);

    videoElement.srcObject = new MediaStream([videoTrack.mediaStreamTrack]);
    videoElement.play();

    mostrarNotificacion("Transmisión activa", "Estás en vivo", "success");
  } catch (error) {
    mostrarNotificacion("Error", "No se pudo iniciar la transmisión", "error");
    console.error(error);
  }
}

// Detener transmisión
function detenerTransmision() {
  if (room) {
    room.disconnect();
    videoElement.pause();
    videoElement.srcObject = null;
    mostrarNotificacion("Transmisión finalizada", "Se cerró la sala", "info");
  }
}

// Autenticación del modelo
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuario = user;
    if (btnIniciar) btnIniciar.addEventListener("click", iniciarTransmision);
    if (btnDetener) btnDetener.addEventListener("click", detenerTransmision);
  } else {
    mostrarNotificacion("Inicia sesión", "Solo modelos pueden transmitir", "warning");
  }
});
