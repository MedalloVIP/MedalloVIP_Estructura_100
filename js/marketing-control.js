// marketing-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const contenedorPromo = document.getElementById("contenedorMarketing");

let usuarioActual = null;

// Promociones simuladas para la beta
const promocionesSimuladas = [
  {
    id: "promo1",
    titulo: "Duplica tus Tokens",
    descripcion: "Recarga hoy y obtén el doble de tokens en tu primera compra",
    activa: true
  },
  {
    id: "promo2",
    titulo: "Premio Semanal VIP",
    descripcion: "Los modelos top recibirán bonificaciones en efectivo cada viernes",
    activa: true
  }
];

// Renderizar promociones activas
function renderizarPromociones() {
  if (!contenedorPromo) return;

  contenedorPromo.innerHTML = "";

  const vistas = JSON.parse(localStorage.getItem(`promo_vistas_${usuarioActual.email}`)) || [];

  promocionesSimuladas.forEach(promo => {
    if (promo.activa && !vistas.includes(promo.id)) {
      const div = document.createElement("div");
      div.className = "promo-banner";
      div.style = `
        background: linear-gradient(135deg, #00ffff33, #ff00ff33);
        padding: 16px;
        border-radius: 10px;
        margin-bottom: 15px;
        color: white;
        border: 1px solid #00ffff;
      `;

      div.innerHTML = `
        <h3>${promo.titulo}</h3>
        <p>${promo.descripcion}</p>
        <button style="margin-top: 8px; background: #00ffff; color: black; border: none; border-radius: 6px; padding: 6px 12px; cursor: pointer;"
          onclick="ocultarPromocion('${promo.id}')">Cerrar</button>
      `;

      contenedorPromo.appendChild(div);
    }
  });

  mostrarNotificacion("Promociones activas", "Campañas cargadas correctamente", "info");
}

// Ocultar promoción marcada como vista
window.ocultarPromocion = function(id) {
  const key = `promo_vistas_${usuarioActual.email}`;
  const vistas = JSON.parse(localStorage.getItem(key)) || [];
  vistas.push(id);
  localStorage.setItem(key, JSON.stringify(vistas));
  renderizarPromociones();
}

// Inicializar marketing
function inicializarMarketing() {
  if (!contenedorPromo) {
    console.warn("No se encontró el contenedor de promociones.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioActual = user;
      renderizarPromociones();
    } else {
      contenedorPromo.innerHTML = "<p style='color:#aaa;'>Inicia sesión para ver campañas activas.</p>";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarMarketing);
