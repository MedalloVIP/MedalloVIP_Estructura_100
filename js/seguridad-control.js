// seguridad-control.js

import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorSeguridad = document.getElementById("zonaSeguridad");
const btnReset = document.getElementById("btnResetPassword");
const btnVerificacion = document.getElementById("btnVerificarEmail");

let usuarioActual = null;

// Mostrar estado de seguridad
function mostrarEstadoSeguridad() {
  if (!usuarioActual || !visorSeguridad) return;

  const verificado = usuarioActual.emailVerified;

  visorSeguridad.innerHTML = `
    <p><strong>Correo electrónico:</strong> ${usuarioActual.email}</p>
    <p><strong>Estado de verificación:</strong> 
      <span style="color:${verificado ? '#00ff88' : '#ffaa00'}">
        ${verificado ? "Verificado" : "No verificado"}
      </span>
    </p>
    <p style="color:#aaa;">Para cambiar tu contraseña o verificar tu cuenta, usa los botones a continuación.</p>
  `;
}

// Enviar verificación por correo
function verificarEmail() {
  if (!usuarioActual) return;

  sendEmailVerification(usuarioActual)
    .then(() => {
      mostrarNotificacion("Correo enviado", "Revisa tu bandeja para verificar tu cuenta", "success");
    })
    .catch((error) => {
      mostrarNotificacion("Error", error.message, "error");
      console.error(error);
    });
}

// Enviar correo para cambio de contraseña
function resetearPassword() {
  if (!usuarioActual) return;

  sendPasswordResetEmail(auth, usuarioActual.email)
    .then(() => {
      mostrarNotificacion("Correo enviado", "Revisa tu email para cambiar la contraseña", "info");
    })
    .catch((error) => {
      mostrarNotificacion("Error", error.message, "error");
      console.error(error);
    });
}

// Inicializar seguridad
function inicializarSeguridad() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      mostrarEstadoSeguridad();

      if (btnVerificacion) {
        btnVerificacion.addEventListener("click", verificarEmail);
      }

      if (btnReset) {
        btnReset.addEventListener("click", resetearPassword);
      }
    } else {
      if (visorSeguridad) {
        visorSeguridad.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tu configuración de seguridad.</p>";
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarSeguridad);
