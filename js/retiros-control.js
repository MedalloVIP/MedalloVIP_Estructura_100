// retiros-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorRetiros = document.getElementById("listaRetiros");
const btnEnviarRetiro = document.getElementById("btnRetirar");
const inputMonto = document.getElementById("montoRetiro");
const selectorMetodo = document.getElementById("metodoRetiro");

let usuarioActual = null;

// Simulador de retiros para la beta
let retirosSimulados = JSON.parse(localStorage.getItem("retirosSimulados") || "[]");

// Renderizar lista de retiros
function renderizarRetiros() {
  if (!visorRetiros) return;

  visorRetiros.innerHTML = "";

  if (retirosSimulados.length === 0) {
    visorRetiros.innerHTML = "<p style='color:#aaa;'>No has realizado retiros aún.</p>";
    return;
  }

  retirosSimulados.forEach(ret => {
    const colorEstado = ret.estado === "Pendiente" ? "#ffaa00" : "#00ff88";

    const item = document.createElement("div");
    item.className = "retiro-item";
    item.style = `
      background: #111;
      padding: 14px;
      margin-bottom: 12px;
      border-left: 4px solid ${colorEstado};
      border-radius: 10px;
      color: white;
    `;

    item.innerHTML = `
      <strong>${ret.metodo}</strong><br>
      <span>Monto: <span style="color:#00ffff;">${ret.monto.toLocaleString()} tokens</span></span><br>
      <span style="color:${colorEstado}; font-weight: bold;">${ret.estado}</span><br>
      <small style="color:#aaa;">Fecha: ${ret.fecha}</small>
    `;

    visorRetiros.appendChild(item);
  });
}

// Enviar solicitud de retiro simulada
function enviarRetiro() {
  const monto = parseInt(inputMonto.value.trim());
  const metodo = selectorMetodo.value;

  if (!monto || monto <= 0 || !metodo) {
    mostrarNotificacion("Datos inválidos", "Debes ingresar un monto válido y seleccionar un método", "warning");
    return;
  }

  const nuevoRetiro = {
    monto,
    metodo,
    estado: "Pendiente",
    fecha: new Date().toLocaleDateString()
  };

  retirosSimulados.push(nuevoRetiro);
  localStorage.setItem("retirosSimulados", JSON.stringify(retirosSimulados));

  mostrarNotificacion("Solicitud enviada", "Tu retiro fue registrado", "success");
  inputMonto.value = "";
  renderizarRetiros();
}

// Inicializar módulo
function inicializarRetiros() {
  if (!visorRetiros || !btnEnviarRetiro || !inputMonto || !selectorMetodo) {
    console.warn("Faltan elementos para el control de retiros.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarRetiros();
      btnEnviarRetiro.addEventListener("click", enviarRetiro);
    } else {
      visorRetiros.innerHTML = "<p style='color:#aaa;'>Inicia sesión para gestionar tus retiros.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarRetiros);
