// inventario-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const contenedorInventario = document.getElementById("listaInventario");

let usuarioActual = null;

// Inventario simulado
const inventarioSimulado = [
  { nombre: "Accesorio de Lencería", tipo: "ropa", cantidad: 2 },
  { nombre: "Tótem VIP", tipo: "recompensa", cantidad: 1 },
  { nombre: "Cristal de Energía", tipo: "consumible", cantidad: 5 }
];

// Renderizar inventario
function renderizarInventario() {
  if (!contenedorInventario) return;

  contenedorInventario.innerHTML = "";

  if (inventarioSimulado.length === 0) {
    contenedorInventario.innerHTML = "<p style='color:#aaa;'>Tu inventario está vacío.</p>";
    return;
  }

  inventarioSimulado.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item-inventario";
    div.style = `
      background: #111;
      margin-bottom: 12px;
      padding: 12px;
      border-left: 4px solid #00ffff;
      border-radius: 10px;
      color: white;
    `;

    div.innerHTML = `
      <strong>${item.nombre}</strong><br>
      Tipo: <span style="color:#ccc;">${item.tipo}</span><br>
      Cantidad: <span style="color:#00ffff;">${item.cantidad}</span><br>
      <button onclick="usarItem(${index})" style="margin-top:6px; background:#00ff88; color:black; border:none; border-radius:6px; padding:6px 12px; cursor:pointer;">Usar</button>
    `;

    contenedorInventario.appendChild(div);
  });
}

// Usar un ítem (simulado)
window.usarItem = function(index) {
  const item = inventarioSimulado[index];
  if (item.cantidad > 0) {
    item.cantidad -= 1;
    mostrarNotificacion("Ítem usado", `${item.nombre} ha sido utilizado`, "info");
    renderizarInventario();
  }

  if (item.cantidad === 0) {
    inventarioSimulado.splice(index, 1);
    mostrarNotificacion("Agotado", `${item.nombre} fue removido del inventario`, "warning");
    renderizarInventario();
  }
}

// Inicializar sistema
function inicializarInventario() {
  if (!contenedorInventario) {
    console.warn("No se encontró el contenedor de inventario.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarInventario();
    } else {
      contenedorInventario.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tu inventario.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarInventario);
