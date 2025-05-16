// bloqueos-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const listaUsuarios = document.getElementById("usuariosBloqueables");
const visorBloqueados = document.getElementById("usuariosBloqueados");

let usuarioActual = null;
let bloqueados = [];

// Cargar bloqueados desde localStorage
function cargarBloqueados(email) {
  const data = localStorage.getItem(`bloqueos_${email}`);
  bloqueados = data ? JSON.parse(data) : [];
  renderizarBloqueados();
}

// Guardar bloqueados en localStorage
function guardarBloqueados(email) {
  localStorage.setItem(`bloqueos_${email}`, JSON.stringify(bloqueados));
  renderizarBloqueados();
}

// Renderizar lista de bloqueados
function renderizarBloqueados() {
  if (!visorBloqueados) return;

  visorBloqueados.innerHTML = "";

  if (bloqueados.length === 0) {
    visorBloqueados.innerHTML = "<p style='color: #aaa;'>No has bloqueado a nadie.</p>";
    return;
  }

  bloqueados.forEach(user => {
    const div = document.createElement("div");
    div.className = "usuario-bloqueado";
    div.style = "margin-bottom: 10px; color: #ff5555;";

    div.innerHTML = `
      <strong>${user}</strong>
      <button style="margin-left: 10px;" onclick="desbloquearUsuario('${user}')">Desbloquear</button>
    `;
    visorBloqueados.appendChild(div);
  });
}

// Función para bloquear
function bloquearUsuario(usuario) {
  if (!bloqueados.includes(usuario)) {
    bloqueados.push(usuario);
    guardarBloqueados(usuarioActual.email);
    mostrarNotificacion("Usuario bloqueado", `${usuario} ha sido bloqueado.`, "warning");
  }
}

// Función para desbloquear (expuesta globalmente)
window.desbloquearUsuario = function (usuario) {
  bloqueados = bloqueados.filter(u => u !== usuario);
  guardarBloqueados(usuarioActual.email);
  mostrarNotificacion("Desbloqueado", `${usuario} ha sido desbloqueado.`, "success");
};

// Simular lista de usuarios para bloquear
function renderizarListaUsuarios() {
  if (!listaUsuarios) return;

  const usuariosSimulados = ["modelo1@vip.com", "modelo2@vip.com", "usuario3@vip.com"];
  listaUsuarios.innerHTML = "";

  usuariosSimulados.forEach(usuario => {
    const div = document.createElement("div");
    div.className = "usuario-disponible";
    div.style = "margin-bottom: 8px;";

    const btn = document.createElement("button");
    btn.textContent = "Bloquear";
    btn.onclick = () => bloquearUsuario(usuario);

    div.innerHTML = `<span>${usuario}</span>`;
    div.appendChild(btn);
    listaUsuarios.appendChild(div);
  });
}

// Iniciar control de bloqueos
function inicializarBloqueos() {
  if (!listaUsuarios || !visorBloqueados) {
    console.warn("Faltan contenedores de usuarios.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      cargarBloqueados(user.email);
      renderizarListaUsuarios();
    } else {
      listaUsuarios.innerHTML = "<p>Inicia sesión para gestionar bloqueos.</p>";
      visorBloqueados.innerHTML = "";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarBloqueos);
