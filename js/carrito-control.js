// carrito-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const claveCarrito = "carritoMedalloVIP";
const contenedorCarrito = document.getElementById("zonaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

// Obtener productos
function obtenerCarrito() {
  const data = localStorage.getItem(claveCarrito);
  return data ? JSON.parse(data) : [];
}

// Guardar productos
function guardarCarrito(lista) {
  localStorage.setItem(claveCarrito, JSON.stringify(lista));
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  const productos = obtenerCarrito();
  productos.push({ nombre, precio });
  guardarCarrito(productos);
  mostrarNotificacion("Producto añadido", `${nombre} se añadió al carrito`, "éxito");
  mostrarCarrito();
}

// Mostrar el carrito visualmente
function mostrarCarrito() {
  const productos = obtenerCarrito();
  let total = 0;

  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = "";

  productos.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "item-carrito";
    item.style = `
      padding: 10px;
      margin-bottom: 6px;
      background: rgba(255,255,255,0.05);
      border-left: 3px solid #00ffff;
    `;
    item.innerHTML = `
      ${p.nombre} - <strong>${p.precio} tokens</strong>
      <button onclick="eliminarDelCarrito(${i})" style="float:right; color:red;">✖</button>
    `;
    contenedorCarrito.appendChild(item);
    total += p.precio;
  });

  if (totalCarrito) {
    totalCarrito.textContent = `${total.toLocaleString()} tokens`;
  }
}

// Eliminar un producto
window.eliminarDelCarrito = function(index) {
  const productos = obtenerCarrito();
  productos.splice(index, 1);
  guardarCarrito(productos);
  mostrarCarrito();
  mostrarNotificacion("Producto eliminado", "Item removido del carrito", "info");
};

// Vaciar carrito completo
btnVaciarCarrito?.addEventListener("click", () => {
  guardarCarrito([]);
  mostrarCarrito();
  mostrarNotificacion("Carrito vacío", "Todos los productos fueron eliminados", "info");
});

// Cargar al inicio
window.addEventListener("DOMContentLoaded", mostrarCarrito);

// Exportar función para uso externo
export { agregarAlCarrito };
