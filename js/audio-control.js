// audio-control.js

export function inicializarControlMicrofono(audioTrack, btnMic) {
  if (!audioTrack || !btnMic) {
    console.warn("AudioTrack o botón de micrófono no disponibles.");
    return;
  }

  let micEnabled = true;

  btnMic.onclick = () => {
    micEnabled = !micEnabled;

    // Silenciar o activar el track de audio
    if (audioTrack.track) {
      audioTrack.track.enabled = micEnabled;
    } else {
      audioTrack.enabled = micEnabled; // fallback
    }

    // Cambiar apariencia del botón
    btnMic.textContent = micEnabled ? "Silenciar Micrófono" : "Activar Micrófono";
    btnMic.style.backgroundColor = micEnabled ? "#ff00ff" : "#ff3333";
    btnMic.title = micEnabled ? "El micrófono está activo" : "El micrófono está silenciado";
  };
}
