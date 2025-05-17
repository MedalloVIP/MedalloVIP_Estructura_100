// tokens-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorTokens = document.getElementById("saldoTokens");
const btnSimularIngreso = document.getElementById("btnSumarTokens");
const btnSimularGasto = document.getElementById("btnRestarTokens");

let usuarioActual = null;
let saldoActual = 0;

// Recuperar saldo desde localStorage
function cargarSaldo() {
  const clave = `tokens_${usuarioActual.email}`;
  saldoActual = parseInt(localStorage.getItem(clave)) || 0;
  actualizarVisor();
}

// Guardar nuevo saldo
function guardarSaldo() {
  const clave = `tokens_${usuarioActual.email}`;
  localStorage.setItem(clave, saldoActual);
  actualizarVisor();
}

// Actualizar visor de tokens
function actualizarVisor() {
  if (visorTokens) {
    visorTokens.textContent = `${saldoActual.toLocaleString()} MedalloCoins`;
  }
}

// Simular ingreso de tokens
function sumarTokens() {
  saldoActual += 5000;
  guardarSaldo();
  mostrarNotificacion("Tokens añadidos", "+5,000 MedalloCoins", "success");
}

// Simular gasto de tokens
function restarTokens() {
  if (saldoActual < 1000) {
    mostrarNotificacion("Saldo insuficiente", "No tienes tokens suficientes", "warning");
    return;
  }
  saldoActual -= 1000;
  guardarSaldo();
  mostrarNotificacion("Tokens gastados", "-1,000 MedalloCoins", "info");
}

// Inicializar módulo
function inicializarTokens() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      cargarSaldo();

      if (btnSimularIngreso) btnSimularIngreso.addEventListener("click", sumarTokens);
      if (btnSimularGasto) btnSimularGasto.addEventListener("click", restarTokens);
    } else {
      if (visorTokens) {
        visorTokens.textContent = "Inicia sesión para ver tus tokens";
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarTokens);
