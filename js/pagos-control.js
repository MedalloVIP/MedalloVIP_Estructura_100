// pagos-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos clave
const btnPagar = document.getElementById("btnConfirmarPago");
const totalPago = document.getElementById("totalCarrito");
let saldoUsuario = 8500; // Simulado, luego viene de Firebase o Blockchain

// Obtener total del carrito
function obtenerTotalCarrito() {
  const raw = totalPago?.textContent || "0";
  return parseInt(raw.replace(/[^\d]/g, ""));
}

// Confirmar pago
btnPagar?.addEventListener("click", () => {
  const total = obtenerTotalCarrito();

  if (total <= 0) {
    mostrarNotificacion("Carrito vacío", "No hay productos para pagar", "error");
    return;
  }

  if (total > saldoUsuario) {
    mostrarNotificacion("Fondos insuficientes", "No tienes tokens suficientes", "error");
    return;
  }

  saldoUsuario -= total;

  mostrarNotificacion("Pago exitoso", `Se descontaron ${total} tokens`, "éxito");

  // Vaciar carrito después del pago
  localStorage.setItem("carritoMedalloVIP", JSON.stringify([]));
  document.getElementById("zonaCarrito").innerHTML = "";
  document.getElementById("totalCarrito").textContent = "0 tokens";

  // Mostrar nuevo saldo si hay visor
  const visorSaldo = document.getElementById("saldoTokens");
  if (visorSaldo) {
    visorSaldo.textContent = `${saldoUsuario.toLocaleString()} tokens`;
  }
});
