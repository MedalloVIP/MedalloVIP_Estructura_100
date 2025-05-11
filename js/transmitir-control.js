// transmitir-control.js

import { connect } from "https://cdn.skypack.dev/livekit-client";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos de la sala
const videoElement = document.getElementById("videoTransmision");
const iniciarBtn = document.getElementById("iniciarTransmisionBtn");

// Datos de conexión (LiveKit Cloud)
const livekitURL = "wss://medallovip-zxlixdwt.livekit.cloud"; // Tu URL real
const token = "AQUÍ_VA_TU_TOKEN_GENERADO"; // Generar desde backend o panel seguro

// Botón para iniciar la transmisión
iniciarBtn?.addEventListener("click", async () => {
  try {
    const room = await connect(livekitURL, token, {
      audio: true,
      video: true,
    });

    const localParticipant = room.localParticipant;
    const tracks = Array.from(localParticipant.videoTracks.values());

    if (tracks.length > 0) {
      const videoTrack = tracks[0].track;
      videoTrack.attach(videoElement);
    }

    mostrarNotificacion("¡Transmisión activa!", "Estás en vivo con MedalloVIP", "éxito");

    // Eventos para monitorear el estado
    room.on("participantConnected", participant => {
      mostrarNotificacion("Usuario conectado", `${participant.identity} se unió a tu sala`, "info");
    });

    room.on("participantDisconnected", participant => {
      mostrarNotificacion("Usuario desconectado", `${participant.identity} salió de la sala`, "info");
    });

  } catch (error) {
    console.error("Error al iniciar transmisión:", error);
    mostrarNotificacion("Error", "No se pudo conectar la cámara", "error");
  }
});
