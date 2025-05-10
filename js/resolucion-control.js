// resolucion-control.js
export function mostrarResolucion(videoTrack) {
  if (!videoTrack || !videoTrack.mediaStreamTrack) return;

  const settings = videoTrack.mediaStreamTrack.getSettings();
  const label = document.getElementById("resolucion");

  if (settings.width && settings.height && label) {
    label.textContent = `Resolución: ${settings.width}x${settings.height}`;
  }
}
