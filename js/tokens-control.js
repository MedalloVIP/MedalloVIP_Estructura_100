// tokens-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

let saldoActual = 5000; // Puedes inicializarlo desde Firebase luego

const visorSaldo = document.getElementById("saldoTokens");
const inputRecarga = document.getElementById("valorRecarga");
const btnRecargar = document.getElementById("btnRecargar");

// Mostrar saldo actualizado
function actualizarSaldo() {
  if (visorSaldo) {
    visorSaldo.textContent = saldoActual.toLocaleString("es-CO") + " tokens";
  }
}

// Simular recarga de tokens
btnRecargar?.addEventListener("click", () => {
  const valor = parseInt(inputRecarga?.value || "0");

  if (!valor || valor <= 0) {
    mostrarNotificacion("Valor inválido", "Ingresa una cantidad mayor a 0", "error");
    return;
  }

  saldoActual += valor;
  actualizarSaldo();
  mostrarNotificacion("Recarga exitosa", `Has recargado ${valor} tokens`, "éxito");

  inputRecarga.value = "";
});

// Inicializar al cargar
window.addEventListener("DOMContentLoaded", actualizarSaldo);
