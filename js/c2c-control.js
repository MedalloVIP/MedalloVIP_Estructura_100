// c2c-control.js

export async function activarCamaraUsuario(videoElement) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    videoElement.play();
    console.log("Cámara del usuario activada correctamente.");
  } catch (error) {
    console.error("Error al activar la cámara del usuario:", error);
    alert("No se pudo activar tu cámara. Verifica los permisos del navegador.");
  }
}
