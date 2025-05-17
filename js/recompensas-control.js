// recompensas-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorRecompensas = document.getElementById("listaRecompensas");

let usuarioActual = null;

// Simulador de recompensas activas
const recompensasSimuladas = [
  { id: 1, nombre: "Bono de bienvenida", descripcion: "Obtén 1,000 tokens al registrarte", disponible: true },
  { id: 2, nombre: "Conexión diaria", descripcion: "Recibe 100 tokens por conectarte hoy", disponible: true },
  { id: 3, nombre: "Primer show en vivo", descripcion: "Recibe 2,000 tokens por tu primer stream", disponible: false },
  { id: 4, nombre: "Meta mensual", descripcion: "5,000 tokens por superar los 20,000 tokens en el mes", disponible: false }
];

// Renderizar recompensas en pantalla
function renderizarRecompensas() {
  if (!visorRecompensas) return;

  visorRecompensas.innerHTML = "";

  recompensasSimuladas.forEach(recompensa => {
    const reclamada = localStorage.getItem(`recompensa_reclamada_${usuarioActual?.email}_${recompensa.id}`) === "true";

    const estado = reclamada
      ? "Reclamada"
      : recompensa.disponible
      ? "Disponible"
      : "Bloqueada";

    const colorEstado = estado === "Disponible" ? "#00ff88"
                      : estado === "Reclamada" ? "#999999"
                      : "#ffaa00";

    const item = document.createElement("div");
    item.className = "recompensa-item";
    item.style = `
      background: #111;
      padding: 14px;
      margin-bottom: 12px;
      border-radius: 10px;
      color: white;
      border-left: 4px solid ${colorEstado};
    `;

    item.innerHTML = `
      <strong>${recompensa.nombre}</strong><br>
      <span style="color:#aaa;">${recompensa.descripcion}</span><br>
      <span style="color:${colorEstado}; font-weight: bold;">${estado}</span>
      ${
        estado === "Disponible" && !reclamada
          ? `<br><button style="margin-top:8px; background:#00ffff; color:black; border:none; border-radius:6px; padding:6px 12px; cursor:pointer;"
               onclick="reclamarRecompensa('${recompensa.id}', '${recompensa.nombre}')">Reclamar</button>`
          : ""
      }
    `;

    visorRecompensas.appendChild(item);
  });
}

// Simular reclamo
window.reclamarRecompensa = function(id, nombre) {
  if (!usuarioActual) return;

  localStorage.setItem(`recompensa_reclamada_${usuarioActual.email}_${id}`, "true");
  mostrarNotificacion("Recompensa reclamada", `"${nombre}" fue entregada correctamente`, "success");
  renderizarRecompensas();
};

// Inicializar módulo
function inicializarRecompensas() {
  if (!visorRecompensas) {
    console.warn("No se encontró el contenedor de recompensas.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarRecompensas();
    } else {
      visorRecompensas.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus recompensas.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarRecompensas);
