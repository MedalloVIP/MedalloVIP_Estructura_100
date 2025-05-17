// envios-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const formEnvio = document.getElementById("formEnvio");
const visorResumen = document.getElementById("resumenEnvio");

let usuarioActual = null;

// Enviar datos de envío
function procesarEnvio(e) {
  e.preventDefault();

  const nombre = formEnvio.nombre.value.trim();
  const direccion = formEnvio.direccion.value.trim();
  const ciudad = formEnvio.ciudad.value.trim();
  const telefono = formEnvio.telefono.value.trim();

  if (!nombre || !direccion || !ciudad || !telefono) {
    mostrarNotificacion("Campos incompletos", "Por favor completa todos los campos", "warning");
    return;
  }

  const envio = { nombre, direccion, ciudad, telefono, fecha: new Date().toLocaleString() };
  const key = `envio_${usuarioActual.email}`;
  localStorage.setItem(key, JSON.stringify(envio));

  mostrarNotificacion("Envío procesado", "Tu solicitud de envío ha sido registrada", "success");
  renderizarResumen(envio);
  formEnvio.reset();
}

// Mostrar resumen de envío
function renderizarResumen(envio) {
  if (!visorResumen) return;

  visorResumen.innerHTML = `
    <h3 style="color:#00ffff;">Resumen del Envío</h3>
    <p><strong>Nombre:</strong> ${envio.nombre}</p>
    <p><strong>Dirección:</strong> ${envio.direccion}</p>
    <p><strong>Ciudad:</strong> ${envio.ciudad}</p>
    <p><strong>Teléfono:</strong> ${envio.telefono}</p>
    <p><strong>Fecha:</strong> ${envio.fecha}</p>
  `;
}

// Iniciar formulario
function inicializarEnvios() {
  if (!formEnvio || !visorResumen) {
    console.warn("Faltan elementos del formulario de envío.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;

      const envioGuardado = localStorage.getItem(`envio_${user.email}`);
      if (envioGuardado) {
        renderizarResumen(JSON.parse(envioGuardado));
      }

      formEnvio.addEventListener("submit", procesarEnvio);
    } else {
      visorResumen.innerHTML = "<p style='color:#aaa;'>Inicia sesión para registrar tus envíos.</p>";
      formEnvio.style.display = "none";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarEnvios);
