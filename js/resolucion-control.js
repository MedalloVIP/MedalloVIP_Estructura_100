// resolucion-control.js

export function mostrarResolucion(videoTrack, elementoSalida) {
  if (!videoTrack || !videoTrack.mediaStreamTrack || !elementoSalida) return;

  const settings = videoTrack.mediaStreamTrack.getSettings();
  if (settings.width && settings.height) {
    elementoSalida.textContent = `Resolución: ${settings.width}x${settings.height}`;
  } else {
    elementoSalida.textContent = "Resolución: desconocida";
  }
}
