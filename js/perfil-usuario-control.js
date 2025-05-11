// perfil-usuario-control.js

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const infoNombre = document.getElementById("nombreUsuario");
const infoCorreo = document.getElementById("correoUsuario");
const infoFavoritos = document.getElementById("favoritosUsuario");
const infoTokens = document.getElementById("tokensUsuario");
const btnIrExplorar = document.getElementById("btnExplorar");

// Detectar usuario activo
auth.onAuthStateChanged(user => {
  if (user) {
    if (infoNombre) infoNombre.textContent = user.displayName || "Usuario VIP";
    if (infoCorreo) infoCorreo.textContent = user.email;

    // Datos simulados
    if (infoFavoritos) infoFavoritos.textContent = "6 modelos favoritas";
    if (infoTokens) infoTokens.textContent = "1,200 tokens disponibles";

    mostrarNotificacion("Bienvenido", "Tu perfil está listo para explorar", "éxito");
  }
});

// Ir a explorar transmisiones
btnIrExplorar?.addEventListener("click", () => {
  window.location.href = "./descubrir.html";
});
