// perfil-modelo-control.js

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const infoNombre = document.getElementById("nombreModelo");
const infoCorreo = document.getElementById("correoModelo");
const infoSeguidores = document.getElementById("seguidoresModelo");
const infoTokens = document.getElementById("tokensModelo");
const infoRanking = document.getElementById("rankingModelo");
const btnIrTransmision = document.getElementById("btnIrTransmision");

auth.onAuthStateChanged(user => {
  if (user) {
    if (infoNombre) infoNombre.textContent = user.displayName || "Modelo anónima";
    if (infoCorreo) infoCorreo.textContent = user.email;

    // Datos simulados (conectaremos Firebase más adelante)
    if (infoSeguidores) infoSeguidores.textContent = "1,482 seguidores";
    if (infoTokens) infoTokens.textContent = "5,620 tokens disponibles";
    if (infoRanking) infoRanking.textContent = "Rango: Reina VIP";

    mostrarNotificacion("Perfil cargado", "Bienvenida modelo estrella", "info");
  }
});

btnIrTransmision?.addEventListener("click", () => {
  window.location.href = "./transmitir.html";
});
