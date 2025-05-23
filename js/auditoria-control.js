// auditoria-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Datos simulados (se reemplazarán con Firestore en producción)
const registros = [
  { tipo: "login", mensaje: "Inicio de sesión exitoso", fecha: "2025-05-10 08:14" },
  { tipo: "perfil", mensaje: "Actualización de nombre y correo", fecha: "2025-05-10 08:30" },
  { tipo: "transmision", mensaje: "Transmisión en vivo iniciada", fecha: "2025-05-10 08:35" },
  { tipo: "retiro", mensaje: "Solicitud de retiro enviada", fecha: "2025-05-10 09:01" }
];

const auth = getAuth(app);
const visorAuditoria = document.getElementById("registroAuditoria");

function renderAuditoria(registros) {
  visorAuditoria.innerHTML = "";

  registros.forEach(reg => {
    const fila = document.createElement("div");
    fila.className = "registro-auditoria";
    fila.style = `
      padding: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      font-size: 14px;
      color: white;
    `;

    fila.innerHTML = `
      <strong style="color: #00ffff;">[${reg.tipo.toUpperCase()}]</strong> ${reg.mensaje}
      <br><span style="font-size: 12px; color: #aaa;">${reg.fecha}</span>
    `;

    visorAuditoria.appendChild(fila);
  });
}

function mostrarAuditoria() {
  if (!visorAuditoria) {
    console.warn("No se encontró el visor de auditoría.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      renderAuditoria(registros);
      mostrarNotificacion("Auditoría cargada", "Se muestran los eventos recientes", "info");
    } else {
      visorAuditoria.innerHTML = "<p style='color: #aaa;'>Inicia sesión para ver tu historial de auditoría.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", mostrarAuditoria);
