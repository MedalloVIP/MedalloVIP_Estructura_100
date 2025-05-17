// ver-trasmision-control.js

import { connect } from "https://cdn.skypack.dev/livekit-client";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

// Elementos del DOM
const videoCliente = document.getElementById("videoCliente");
const btnUnirse = document.getElementById("btnUnirseStream");

const URL_SERVIDOR = "wss://medallovip-zxlixdwt.livekit.cloud";
let tokenLivekit = null;
let room = null;

// Simulador de generación de token para el usuario
function generarToken(nombreUsuario) {
  return fetch(`https://tu-backend.com/api/token?nombre=${nombreUsuario}`)
    .then(res => res.text());
}

// Unirse a la transmisión
async function verTransmision() {
  try {
    if (!tokenLivekit) {
      tokenLivekit = await generarToken("cliente_" + usuario.email.split("@")[0]);
    }

    room = await connect(URL_SERVIDOR, tokenLivekit);

    room.on("trackSubscribed", (track, publication, participant) => {
      if (track.kind === "video") {
        videoCliente.srcObject = new MediaStream([track.mediaStreamTrack]);
        videoCliente.play();
        mostrarNotificacion("Conectado", "Estás viendo la transmisión", "success");
      }
    });
  } catch (error) {
    mostrarNotificacion("Error", "No se pudo conectar al stream", "error");
    console.error(error);
  }
}

// Inicializar cliente
let usuario = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    usuario = user;
    if (btnUnirse) {
      btnUnirse.addEventListener("click", verTransmision);
    } else {
      verTransmision(); // Auto play si no hay botón
    }
  } else {
    mostrarNotificacion("Inicia sesión", "Debes iniciar sesión para ver transmisiones", "warning");
  }
});
