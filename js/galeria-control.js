// galeria-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorGaleria = document.getElementById("galeriaContenido");
const btnAgregarImg = document.getElementById("btnAgregarImagen");

let usuarioActual = null;
let galeria = [];

// Cargar imágenes desde localStorage
function cargarGaleria(email) {
  const data = localStorage.getItem(`galeria_${email}`);
  galeria = data ? JSON.parse(data) : [];
  renderizarGaleria();
}

// Guardar en localStorage
function guardarGaleria(email) {
  localStorage.setItem(`galeria_${email}`, JSON.stringify(galeria));
  renderizarGaleria();
}

// Mostrar galería
function renderizarGaleria() {
  if (!visorGaleria) return;

  visorGaleria.innerHTML = "";

  if (galeria.length === 0) {
    visorGaleria.innerHTML = "<p style='color:#aaa;'>Tu galería está vacía. Agrega imágenes.</p>";
    return;
  }

  galeria.forEach((url, index) => {
    const contenedor = document.createElement("div");
    contenedor.style = `
      display: inline-block;
      margin: 10px;
      position: relative;
    `;

    const img = document.createElement("img");
    img.src = url;
    img.alt = `Imagen ${index + 1}`;
    img.style = `
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 12px;
      border: 2px solid #00ffff;
    `;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.style = `
      position: absolute;
      top: 6px;
      right: 6px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
    `;
    btnEliminar.onclick = () => {
      galeria.splice(index, 1);
      guardarGaleria(usuarioActual.email);
      mostrarNotificacion("Imagen eliminada", "Se quitó de tu galería", "warning");
    };

    contenedor.appendChild(img);
    contenedor.appendChild(btnEliminar);
    visorGaleria.appendChild(contenedor);
  });
}

// Simular agregar imagen (solo URL por ahora)
function agregarImagenSimulada() {
  const url = prompt("Pega la URL de la imagen:");

  if (!url || !url.startsWith("http")) {
    mostrarNotificacion("URL inválida", "Debes ingresar un enlace válido", "error");
    return;
  }

  galeria.push(url);
  guardarGaleria(usuarioActual.email);
  mostrarNotificacion("Imagen agregada", "Se añadió a tu galería", "success");
}

// Inicializar galería
function inicializarGaleria() {
  if (!visorGaleria || !btnAgregarImg) {
    console.warn("Faltan elementos para la galería.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      cargarGaleria(user.email);
      btnAgregarImg.addEventListener("click", agregarImagenSimulada);
    } else {
      visorGaleria.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tu galería.</p>";
      btnAgregarImg.disabled = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarGaleria);
