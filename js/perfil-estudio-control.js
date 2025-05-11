// perfil-estudio-control.js

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const nombreEstudio = document.getElementById("nombreEstudio");
const correoEstudio = document.getElementById("correoEstudio");
const totalModelos = document.getElementById("modelosActivos");
const totalTokens = document.getElementById("tokensGenerados");
const rendimientoGeneral = document.getElementById("rendimientoEstudio");

auth.onAuthStateChanged(user => {
  if (user) {
    if (nombreEstudio) nombreEstudio.textContent = user.displayName || "Estudio asociado";
    if (correoEstudio) correoEstudio.textContent = user.email;

    // Datos simulados (conexión real futura)
    if (totalModelos) totalModelos.textContent = "12 modelos vinculadas";
    if (totalTokens) totalTokens.textContent = "92,340 tokens generados";
    if (rendimientoGeneral) rendimientoGeneral.textContent = "Rendimiento semanal: 18%";

    mostrarNotificacion("Panel de estudio", "Estadísticas cargadas correctamente", "info");
  }
});
