// bonificaciones-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorBonos = document.getElementById("bonificacionesUsuario");

// Bonificaciones simuladas para la prueba beta
const bonosSimulados = [
  { nombre: "Bono de bienvenida", valor: 500, estado: "activo", fecha: "2025-05-01" },
  { nombre: "Bono por transmisión", valor: 300, estado: "pendiente", fecha: "2025-05-10" },
  { nombre: "Bono por ranking semanal", valor: 1000, estado: "activo", fecha: "2025-05-13" }
];

// Renderizar los bonos
function mostrarBonificaciones(usuario) {
  if (!visorBonos) return;

  visorBonos.innerHTML = "";

  if (bonosSimulados.length === 0) {
    visorBonos.innerHTML = "<p style='color:#aaa;'>No tienes bonificaciones activas por ahora.</p>";
    return;
  }

  bonosSimulados.forEach(bono => {
    const div = document.createElement("div");
    div.className = "bono";
    div.style = `
      background: #111;
      border: 1px solid #00ffff44;
      padding: 12px;
      margin-bottom: 10px;
      border-radius: 10px;
      color: white;
    `;

    div.innerHTML = `
      <strong style="color: #00ffff;">${bono.nombre}</strong><br>
      Valor: <span style="color: #ff00ff;">${bono.valor} Tokens</span><br>
      Estado: <span style="color: ${bono.estado === "activo" ? "#00ff88" : "#ffaa00"};">${bono.estado}</span><br>
      Fecha: <span style="color: #ccc;">${bono.fecha}</span>
    `;

    visorBonos.appendChild(div);
  });

  mostrarNotificacion("Bonificaciones", `Se han cargado ${bonosSimulados.length} bonificaciones`, "info");
}

// Iniciar sistema de bonificaciones
function inicializarBonificaciones() {
  if (!visorBonos) {
    console.warn("No se encontró el visor de bonificaciones.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      mostrarBonificaciones(user);
    } else {
      visorBonos.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus bonificaciones.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarBonificaciones);
