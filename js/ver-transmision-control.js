// ver-transmision-control.js

import { connect } from "https://cdn.skypack.dev/livekit-client";
import { mostrarNotificacion } from "./notificaciones-control.js";

const videoViewer = document.getElementById("videoViewer");

// Configura la conexión LiveKit
const livekitURL = "wss://medallovip-zxlixdwt.livekit.cloud";
const token = "TOKEN_GENERADO_ESPECTADOR"; // Este debe venir desde tu backend según la sala

// Conectar automáticamente al cargar
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const room = await connect(livekitURL, token, {
      audio: true,
      video: true,
    });

    mostrarNotificacion("Conectado a la sala", "Disfruta el show en vivo", "info");

    room.on("trackSubscribed", (track, publication, participant) => {
      if (track.kind === "video") {
        track.attach(videoViewer);
      }
    });

    room.on("participantConnected", participant => {
      console.log(`${participant.identity} se conectó`);
    });

    room.on("participantDisconnected", participant => {
      console.log(`${participant.identity} salió`);
    });

  } catch (error) {
    console.error("Error al conectarse como espectador:", error);
    mostrarNotificacion("Error", "No se pudo conectar al stream", "error");
  }
});
