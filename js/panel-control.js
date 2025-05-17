// panel-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const saludo = document.getElementById("saludoUsuario");
const resumen = document.getElementById("resumenPanel");

function renderizarPanel(nombre) {
  if (saludo) {
    saludo.innerHTML = `Hola <strong style="color:#ff00ff;">${nombre}</strong>, bienvenido a tu panel`;
  }

  if (resumen) {
    resumen.innerHTML = `
      <div style="margin-top: 20px;">
        <p><strong>Seguidores:</strong> 1,284</p>
        <p><strong>Tokens disponibles:</strong> 5,450</p>
        <p><strong>Transmisiones activas:</strong> 2</p>
        <p><strong>Rango actual:</strong> Estrella VIP</p>
      </div>
    `;
  }

  mostrarNotificacion("Panel activo", `Cargado correctamente para ${nombre}`, "success");
}

// Inicializar el panel al detectar sesión
function inicializarPanel() {
  if (!saludo || !resumen) {
    console.warn("Faltan elementos del panel.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const nombre = user.displayName || user.email;
      renderizarPanel(nombre);
    } else {
      saludo.textContent = "Inicia sesión para ver tu panel.";
      resumen.innerHTML = "";
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPanel);
