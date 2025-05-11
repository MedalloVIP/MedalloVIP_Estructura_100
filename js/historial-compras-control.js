// historial-compras-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const historialClave = "comprasMedalloVIP";
const visorHistorial = document.getElementById("zonaHistorialCompras");

// Obtener historial de compras
function obtenerCompras() {
  const data = localStorage.getItem(historialClave);
  return data ? JSON.parse(data) : [];
}

// Mostrar compras guardadas
function mostrarHistorial() {
  const compras = obtenerCompras();

  if (!visorHistorial) return;

  visorHistorial.innerHTML = "";

  if (compras.length === 0) {
    visorHistorial.innerHTML = "<p style='color: #ccc;'>No has realizado compras todavía.</p>";
    return;
  }

  compras.forEach(compra => {
    const item = document.createElement("div");
    item.style = `
      background: rgba(255,255,255,0.05);
      padding: 12px;
      margin-bottom: 8px;
      border-left: 3px solid #00ffff;
      border-radius: 6px;
    `;
    item.innerHTML = `
      <strong>${compra.producto}</strong><br>
      <span>${compra.tokens} tokens</span><br>
      <small>${compra.fecha}</small>
    `;
    visorHistorial.appendChild(item);
  });

  mostrarNotificacion("Historial cargado", "Compras anteriores disponibles", "info");
}

// Simulación de agregar una compra (llamar desde pagos-control.js)
function registrarCompra(producto, tokens) {
  const compras = obtenerCompras();
  compras.push({
    producto,
    tokens,
    fecha: new Date().toLocaleString("es-CO")
  });
  localStorage.setItem(historialClave, JSON.stringify(compras));
}

window.addEventListener("DOMContentLoaded", mostrarHistorial);

// Exportar para registrar desde otro módulo
export { registrarCompra };
