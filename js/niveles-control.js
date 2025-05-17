// niveles-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const visorNivel = document.getElementById("zonaNivel");

let usuarioActual = null;

// Datos simulados de nivel para prueba beta
const nivelesSimulados = [
  { nombre: "Bronce", tokensRequeridos: 0 },
  { nombre: "Plata", tokensRequeridos: 5000 },
  { nombre: "Oro", tokensRequeridos: 10000 },
  { nombre: "Estrella VIP", tokensRequeridos: 20000 },
  { nombre: "Leyenda", tokensRequeridos: 50000 }
];

const progresoActualSimulado = 13400; // Simula los tokens acumulados

// Calcular nivel
function calcularNivel(tokens) {
  let nivelActual = nivelesSimulados[0];
  let siguienteNivel = nivelesSimulados[1] || null;

  for (let i = 0; i < nivelesSimulados.length; i++) {
    if (tokens >= nivelesSimulados[i].tokensRequeridos) {
      nivelActual = nivelesSimulados[i];
      siguienteNivel = nivelesSimulados[i + 1] || null;
    }
  }

  return { nivelActual, siguienteNivel };
}

// Renderizar la zona de nivel
function renderizarNivel() {
  if (!visorNivel) return;

  const { nivelActual, siguienteNivel } = calcularNivel(progresoActualSimulado);

  let porcentaje = 100;
  if (siguienteNivel) {
    const base = nivelActual.tokensRequeridos;
    const meta = siguienteNivel.tokensRequeridos;
    porcentaje = ((progresoActualSimulado - base) / (meta - base)) * 100;
    porcentaje = Math.min(porcentaje, 100).toFixed(1);
  }

  visorNivel.innerHTML = `
    <div style="background:#111; padding:16px; border-radius:10px; color:white;">
      <h3 style="color:#00ffff;">Nivel Actual: ${nivelActual.nombre}</h3>
      ${
        siguienteNivel
          ? `<p>Progreso hacia <strong>${siguienteNivel.nombre}</strong> (${porcentaje}%)</p>`
          : `<p><strong>¡Nivel máximo alcanzado!</strong></p>`
      }
      <div style="background:#333; height:18px; border-radius:10px; overflow:hidden; margin-top:6px;">
        <div style="width:${porcentaje}%; background:#ff00ff; height:100%;"></div>
      </div>
      <p style="margin-top:6px;">Tokens acumulados: <strong>${progresoActualSimulado}</strong></p>
    </div>
  `;

  mostrarNotificacion("Nivel actualizado", `Estás en ${nivelActual.nombre}`, "info");
}

// Inicializar módulo
function inicializarNiveles() {
  if (!visorNivel) {
    console.warn("No se encontró la zona de niveles.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarNivel();
    } else {
      visorNivel.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver tu nivel.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarNiveles);
