// retiros-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos (esperan que luego se conecten desde HTML)
const montoInput = document.getElementById("montoRetiro");
const metodoSelect = document.getElementById("metodoRetiro");
const solicitarBtn = document.getElementById("solicitarRetiroBtn");

// Evento de solicitud
solicitarBtn?.addEventListener("click", () => {
  const monto = parseFloat(montoInput?.value);
  const metodo = metodoSelect?.value;

  if (!monto || monto < 10) {
    mostrarNotificacion("Monto inválido", "El retiro mínimo es de $10 USD", "error");
    return;
  }

  if (!metodo) {
    mostrarNotificacion("Método inválido", "Selecciona un método de retiro", "error");
    return;
  }

  // Simulación de envío de solicitud
  mostrarNotificacion("Solicitud enviada", `Tu retiro de $${monto} por ${metodo} está en proceso`, "éxito");

  // Resetear campos (opcional)
  if (montoInput) montoInput.value = "";
  if (metodoSelect) metodoSelect.selectedIndex = 0;
});
