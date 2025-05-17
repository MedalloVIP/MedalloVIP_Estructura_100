// metas-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const contenedorMetas = document.getElementById("listaMetas");

let usuarioActual = null;

// Metas simuladas para la beta
const metasSimuladas = [
  {
    nombre: "Ganar 10,000 tokens",
    progreso: 6700,
    total: 10000
  },
  {
    nombre: "Realizar 20 transmisiones",
    progreso: 13,
    total: 20
  },
  {
    nombre: "Invitar 5 usuarios activos",
    progreso: 3,
    total: 5
  }
];

// Mostrar metas y progreso
function renderizarMetas() {
  if (!contenedorMetas) return;

  contenedorMetas.innerHTML = "";

  if (metasSimuladas.length === 0) {
    contenedorMetas.innerHTML = "<p style='color:#aaa;'>No tienes metas activas actualmente.</p>";
    return;
  }

  metasSimuladas.forEach(meta => {
    const porcentaje = Math.min((meta.progreso / meta.total) * 100, 100).toFixed(1);

    const div = document.createElement("div");
    div.className = "meta-item";
    div.style = `
      background: #111;
      padding: 12px;
      margin-bottom: 14px;
      border-radius: 10px;
      color: white;
    `;

    div.innerHTML = `
      <strong style="color:#00ffff;">${meta.nombre}</strong><br>
      <div style="background:#222; border-radius: 8px; overflow: hidden; margin-top:6px; height: 18px;">
        <div style="width:${porcentaje}%; background:#00ffff; height:100%;"></div>
      </div>
      <p style="font-size: 14px; margin-top: 4px;">${meta.progreso} / ${meta.total} (${porcentaje}%)</p>
    `;

    contenedorMetas.appendChild(div);
  });

  mostrarNotificacion("Metas cargadas", "Tu progreso ha sido actualizado", "info");
}

// Inicializar sistema
function inicializarMetas() {
  if (!contenedorMetas) {
    console.warn("No se encontró el contenedor de metas.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarMetas();
    } else {
      contenedorMetas.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus metas.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarMetas);
