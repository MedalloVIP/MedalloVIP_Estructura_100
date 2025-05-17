// favoritos-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const listaFavoritos = document.getElementById("listaFavoritos");

let usuarioActual = null;
let favoritos = [];

// Cargar favoritos desde localStorage
function cargarFavoritos(email) {
  const data = localStorage.getItem(`favoritos_${email}`);
  favoritos = data ? JSON.parse(data) : [];
  renderizarFavoritos();
}

// Guardar favoritos
function guardarFavoritos(email) {
  localStorage.setItem(`favoritos_${email}`, JSON.stringify(favoritos));
  renderizarFavoritos();
}

// Mostrar favoritos
function renderizarFavoritos() {
  if (!listaFavoritos) return;

  listaFavoritos.innerHTML = "";

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = "<p style='color:#aaa;'>No tienes modelos favoritos aún.</p>";
    return;
  }

  favoritos.forEach((nombre, index) => {
    const div = document.createElement("div");
    div.className = "favorito";
    div.style = "margin-bottom: 8px; color: white; background: #111; padding: 10px; border-radius: 8px;";

    div.innerHTML = `
      <strong style="color:#00ffff;">${nombre}</strong>
      <button onclick="eliminarFavorito(${index})" style="margin-left: 12px; background:#ff4444; color:white; border:none; border-radius:6px; padding:4px 8px;">Quitar</button>
    `;

    listaFavoritos.appendChild(div);
  });
}

// Agregar modelo a favoritos
function agregarFavorito(nombre) {
  if (!usuarioActual || favoritos.includes(nombre)) return;

  favoritos.push(nombre);
  guardarFavoritos(usuarioActual.email);
  mostrarNotificacion("Favorito agregado", `${nombre} se agregó a tu lista`, "success");
}

// Quitar modelo de favoritos
window.eliminarFavorito = function(index) {
  const eliminado = favoritos.splice(index, 1)[0];
  guardarFavoritos(usuarioActual.email);
  mostrarNotificacion("Favorito eliminado", `${eliminado} fue retirado de tus favoritos`, "warning");
}

// Inicializar
function inicializarFavoritos() {
  if (!listaFavoritos) {
    console.warn("No se encontró el contenedor de favoritos.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      cargarFavoritos(user.email);
    } else {
      listaFavoritos.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus favoritos.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarFavoritos);

// Exponer para botones externos
window.agregarFavorito = agregarFavorito;
