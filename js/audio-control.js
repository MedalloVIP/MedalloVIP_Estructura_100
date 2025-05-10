// audio-control.js

export function inicializarControlMicrofono(audioTrack, btnMic) {
  if (!audioTrack || !btnMic) return;

  let micEnabled = true;

  btnMic.onclick = () => {
    micEnabled = !micEnabled;
    audioTrack.muted = !micEnabled;

    btnMic.textContent = micEnabled ? "Silenciar Micrófono" : "Activar Micrófono";
    btnMic.style.backgroundColor = micEnabled ? "#ff00ff" : "#ff3333";
  };
}
