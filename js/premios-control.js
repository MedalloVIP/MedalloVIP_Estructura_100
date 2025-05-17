// premios-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const contenedorPremios = document.getElementById("listaPremios");

let usuarioActual = null;

// Simulación de premios y progreso
const progresoSimulado = 75; // % completado del usuario

const premiosSimulados = [
  { nombre: "Bono de $50 USD", umbral: 10, estado: "disponible" },
  { nombre: "Smartphone gama media", umbral: 30, estado: "disponible" },
  { nombre: "Laptop profesional", umbral: 60, estado: "disponible" },
  { nombre: "Viaje a hotel 5 estrellas", umbral: 90, estado: "disponible" },
  { nombre: "Carro nuevo", umbral: 100, estado: "disponible" }
];

// Renderizar lista de premios
function renderizarPremios() {
  if (!contenedorPremios) return;

  contenedorPremios.innerHTML = "";

  premiosSimulados.forEach(premio => {
    const reclamado = localStorage.getItem(`reclamado_${usuarioActual?.email}_${premio.nombre}`) === "true";

    let estado = "No alcanzado";
    if (progresoSimulado >= premio.umbral) {
      estado = reclamado ? "Reclamado" : "Disponible";
    }

    const premioDiv = document.createElement("div");
    premioDiv.className = "premio";
    premioDiv.style = `
      background: #111;
      padding: 12px;
      border-radius: 10px;
      margin-bottom: 10px;
      color: white;
      border-left: 4px solid ${estado === "Disponible" ? "#00ff88" : estado === "Reclamado" ? "#999999" : "#ffaa00"};
    `;

    premioDiv.innerHTML = `
      <strong>${premio.nombre}</strong><br>
      Progreso requerido: ${premio.umbral}%<br>
      Estado: <span style="color:${estado === "Disponible" ? "#00ff88" : estado === "Reclamado" ? "#999" : "#ffaa00"};">${estado}</span>
      ${
        estado === "Disponible" && !reclamado
          ? `<br><button style="margin-top:6px; background:#00ffff; color:black; border:none; border-radius:6px; padding:6px 12px; cursor:pointer;"
               onclick="reclamarPremio('${premio.nombre}')">Reclamar premio</button>`
          : ""
      }
    `;

    contenedorPremios.appendChild(premioDiv);
  });
}

// Simular reclamo del premio
window.reclamarPremio = function(nombrePremio) {
  if (!usuarioActual) return;
  localStorage.setItem(`reclamado_${usuarioActual.email}_${nombrePremio}`, "true");
  mostrarNotificacion("¡Premio reclamado!", `${nombrePremio} fue registrado como entregado.`, "success");
  renderizarPremios();
};

// Inicializar
function inicializarPremios() {
  if (!contenedorPremios) {
    console.warn("No se encontró el contenedor de premios.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarPremios();
    } else {
      contenedorPremios.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tus premios.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPremios);
