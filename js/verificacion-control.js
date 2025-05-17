// verificacion-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const visorVerificacion = document.getElementById("estadoVerificacion");
const inputArchivo = document.getElementById("archivoVerificacion");
const btnEnviarVerificacion = document.getElementById("btnEnviarVerificacion");

let usuarioActual = null;

// Simulación de base de datos
function guardarEstadoVerificacion(estado) {
  localStorage.setItem(`verificacion_${usuarioActual.email}`, estado);
}

function obtenerEstadoVerificacion() {
  return localStorage.getItem(`verificacion_${usuarioActual.email}`) || "Sin enviar";
}

// Mostrar estado en pantalla
function renderizarEstado() {
  if (!visorVerificacion) return;

  const estado = obtenerEstadoVerificacion();
  let color = "#aaa";

  if (estado === "Aprobada") color = "#00ff88";
  else if (estado === "Rechazada") color = "#ff4444";
  else if (estado === "Pendiente") color = "#ffaa00";

  visorVerificacion.innerHTML = `
    <p>Estado de verificación: <strong style="color:${color};">${estado}</strong></p>
  `;
}

// Enviar archivo de verificación
function enviarVerificacion() {
  const archivo = inputArchivo?.files?.[0];

  if (!archivo) {
    mostrarNotificacion("Archivo requerido", "Debes seleccionar un documento o selfie", "warning");
    return;
  }

  guardarEstadoVerificacion("Pendiente");
  renderizarEstado();

  mostrarNotificacion("Verificación enviada", "Tu documento será revisado", "info");

  // Simulación de respuesta futura (solo en beta)
  setTimeout(() => {
    const aprobado = Math.random() > 0.3;
    guardarEstadoVerificacion(aprobado ? "Aprobada" : "Rechazada");
    renderizarEstado();
    mostrarNotificacion("Estado actualizado", aprobado ? "Verificación aprobada" : "Verificación rechazada", aprobado ? "success" : "error");
  }, 3000);
}

// Inicialización
function inicializarVerificacion() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarEstado();
      if (btnEnviarVerificacion) {
        btnEnviarVerificacion.addEventListener("click", enviarVerificacion);
      }
    } else {
      visorVerificacion.innerHTML = "<p style='color:#aaa;'>Inicia sesión para enviar tu verificación.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarVerificacion);
