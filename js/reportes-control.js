// reportes-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorReportes = document.getElementById("listaReportes");

let usuarioActual = null;

// Reportes simulados para la beta
const reportesSimulados = [
  {
    tipo: "Comportamiento inapropiado",
    motivo: "Lenguaje ofensivo en el chat",
    estado: "Resuelto",
    fecha: "2025-05-10"
  },
  {
    tipo: "Contenido no autorizado",
    motivo: "Modelo compartió contenido externo sin permiso",
    estado: "En revisión",
    fecha: "2025-05-12"
  },
  {
    tipo: "Estafa o engaño",
    motivo: "Sospecha de usuario solicitando pagos fuera de la plataforma",
    estado: "Pendiente",
    fecha: "2025-05-14"
  }
];

// Renderizar reportes
function renderizarReportes() {
  if (!visorReportes) return;

  visorReportes.innerHTML = "";

  if (reportesSimulados.length === 0) {
    visorReportes.innerHTML = "<p style='color:#aaa;'>No hay reportes registrados aún.</p>";
    return;
  }

  reportesSimulados.forEach(rep => {
    const colorEstado =
      rep.estado === "Resuelto" ? "#00ff88" :
      rep.estado === "En revisión" ? "#ffaa00" :
      "#ff4444";

    const item = document.createElement("div");
    item.className = "reporte-item";
    item.style = `
      background: #111;
      padding: 14px;
      margin-bottom: 12px;
      border-left: 4px solid ${colorEstado};
      border-radius: 10px;
      color: white;
    `;

    item.innerHTML = `
      <strong>${rep.tipo}</strong><br>
      <span style="color:#ccc;">${rep.motivo}</span><br>
      <span style="color:${colorEstado}; font-weight:bold;">Estado: ${rep.estado}</span><br>
      <small style="color:#aaa;">Fecha: ${rep.fecha}</small>
    `;

    visorReportes.appendChild(item);
  });

  mostrarNotificacion("Reportes cargados", "Visualización de reportes actualizada", "info");
}

// Inicializar módulo
function inicializarReportes() {
  if (!visorReportes) {
    console.warn("No se encontró el contenedor de reportes.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarReportes();
    } else {
      visorReportes.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus reportes.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarReportes);
