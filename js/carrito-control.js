// carrito-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");

let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  const producto = { nombre, precio };
  carrito.push(producto);
  actualizarCarrito();
  mostrarNotificacion("Producto añadido", `${nombre} agregado al carrito`, "success");
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  const eliminado = carrito.splice(index, 1);
  actualizarCarrito();
  mostrarNotificacion("Producto eliminado", `${eliminado[0].nombre} fue retirado`, "warning");
}

// Calcular total y renderizar
function actualizarCarrito() {
  if (!listaCarrito || !totalCarrito) return;

  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const fila = document.createElement("div");
    fila.className = "item-carrito";
    fila.style = `
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      background: #111;
      padding: 8px 12px;
      border-radius: 8px;
      color: white;
    `;

    fila.innerHTML = `
      <span>${item.nombre} - <strong style="color:#00ffff">${item.precio} Tokens</strong></span>
      <button style="background:#ff4444; color:white; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;"
        onclick="eliminarDelCarrito(${index})">X</button>
    `;

    listaCarrito.appendChild(fila);
    total += item.precio;
  });

  totalCarrito.textContent = `Total: ${total} Tokens`;
}

// Inicialización global
function inicializarCarrito() {
  if (!listaCarrito || !totalCarrito) {
    console.warn("Elementos del carrito no encontrados.");
    return;
  }

  actualizarCarrito(); // por si hay productos preagregados
}

// Exponer funciones globales si se llama desde botones externos
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;

// Iniciar en carga
window.addEventListener("DOMContentLoaded", inicializarCarrito);
