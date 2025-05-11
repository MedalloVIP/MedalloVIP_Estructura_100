// perfil-partner-control.js

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const nombrePartner = document.getElementById("nombrePartner");
const correoPartner = document.getElementById("correoPartner");
const totalReferidos = document.getElementById("referidosPartner");
const ingresosGenerados = document.getElementById("ingresosPartner");
const linkInvitacion = document.getElementById("linkInvitacion");

auth.onAuthStateChanged(user => {
  if (user) {
    if (nombrePartner) nombrePartner.textContent = user.displayName || "Socio afiliado";
    if (correoPartner) correoPartner.textContent = user.email;

    // Datos simulados
    if (totalReferidos) totalReferidos.textContent = "23 referidos activos";
    if (ingresosGenerados) ingresosGenerados.textContent = "$124.50 USD en comisiones";
    if (linkInvitacion) linkInvitacion.textContent = `https://medallovip.live/invitar/${user.uid}`;

    mostrarNotificacion("Perfil Partner", "Tu red de referidos está activa", "info");
  }
});
