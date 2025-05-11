// auditoria-control.js

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Datos simulados (a futuro conectado con Firestore)
const registros = [
  { tipo: "login", mensaje: "Inicio de sesión exitoso", fecha: "2025-05-10 08:14" },
  { tipo: "perfil", mensaje: "Actualización de nombre y correo", fecha: "2025-05-10 08:30" },
  { tipo: "transmision", mensaje: "Transmisión en vivo iniciada", fecha: "2025-05-10 08:35" },
  { tipo: "retiro", mensaje: "Solicitud de retiro enviada", fecha: "2025-05-10 09:01" }
];

const auth = getAuth(app);
const visorAuditoria = document.getElementById("registroAuditoria");

function mostrarAuditoria() {
  if (!visorAuditoria) {
    console.error("No se encontró el visor de auditoría");
    return;
  }

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

  mostrarNotificacion("Auditoría cargada", "Se muestran los eventos recientes", "info");
}

window.addEventListener("DOMContentLoaded", mostrarAuditoria);
