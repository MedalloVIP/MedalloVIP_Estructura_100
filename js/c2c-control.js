// c2c-control.js

const videoUsuario = document.getElementById("videoUsuario");
const btnCamara = document.getElementById("btnCamara");

let streamActivo = null;

// Activar cámara del usuario
async function activarCamaraUsuario() {
  try {
    streamActivo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    videoUsuario.srcObject = streamActivo;
    videoUsuario.play();

    btnCamara.textContent = "Detener Cámara";
    btnCamara.style.backgroundColor = "#ff3333";
  } catch (error) {
    console.error("Error al acceder a la cámara:", error);
    alert("No se pudo acceder a la cámara. Verifica los permisos.");
  }
}

// Desactivar cámara
function detenerCamaraUsuario() {
  if (streamActivo) {
    streamActivo.getTracks().forEach(track => track.stop());
    videoUsuario.srcObject = null;
    streamActivo = null;

    btnCamara.textContent = "Activar Cámara";
    btnCamara.style.backgroundColor = "#00ffff";
  }
}

// Alternar entre activar y detener
function alternarCamara() {
  if (streamActivo) {
    detenerCamaraUsuario();
  } else {
    activarCamaraUsuario();
  }
}

// Inicializar botón
function inicializarControlCamara() {
  if (!videoUsuario || !btnCamara) {
    console.warn("Faltan elementos de cámara en el DOM.");
    return;
  }

  btnCamara.addEventListener("click", alternarCamara);
}

window.addEventListener("DOMContentLoaded", inicializarControlCamara);

// Exportar si es necesario en otros módulos
export { activarCamaraUsuario, detenerCamaraUsuario };
