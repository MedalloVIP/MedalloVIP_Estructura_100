// panel-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Inicializar autenticación
const auth = getAuth(app);

// Elementos HTML
const saludo = document.getElementById("saludoUsuario");
const resumen = document.getElementById("resumenPanel");

// Verificar sesión del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    const nombre = user.displayName || user.email;

    // Saludo personalizado
    if (saludo) {
      saludo.innerHTML = `Hola <strong style="color:#ff00ff;">${nombre}</strong>, bienvenido a tu panel`;
    }

    // Panel simulado de usuario
    if (resumen) {
      resumen.innerHTML = `
        <div style="margin-top: 20px; padding: 20px; background-color: #111; border-radius: 10px; color: #fff;">
          <p><strong>Seguidores:</strong> 1,284</p>
          <p><strong>Tokens disponibles:</strong> 5,450</p>
          <p><strong>Transmisiones activas:</strong> 2</p>
          <p><strong>Rango actual:</strong> <span style="color:#00ffff;">Estrella VIP</span></p>
        </div>
      `;
    }

    mostrarNotificacion("Bienvenido", `Panel cargado para ${nombre}`, "info");

  } else {
    // Usuario no autenticado
    if (saludo) saludo.textContent = "Inicia sesión para ver tu panel.";
    if (resumen) resumen.innerHTML = "<p>No hay información disponible.</p>";
  }
});
