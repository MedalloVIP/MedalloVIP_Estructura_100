// backup-control.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const btnBackup = document.getElementById("btnBackup");

function generarBackup(usuario) {
  const fecha = new Date().toISOString();

  // Datos simulados - puedes integrar Firebase más adelante
  const backupData = {
    usuario: usuario.email,
    fecha: fecha,
    datos: {
      tokens: 5450,
      seguidores: 1284,
      rango: "Estrella VIP",
      historial: [
        { tipo: "login", mensaje: "Inicio de sesión", fecha: "2025-05-10 08:14" },
        { tipo: "retiro", mensaje: "Solicitud de retiro", fecha: "2025-05-10 09:01" }
      ]
    }
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const enlace = document.createElement("a");
  enlace.setAttribute("href", dataStr);
  enlace.setAttribute("download", `backup_medallovip_${usuario.email.replace(/@.*/, "")}.json`);
  enlace.click();

  mostrarNotificacion("Backup creado", "Tu respaldo fue descargado con éxito", "success");
}

function inicializarBackup() {
  if (!btnBackup) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      btnBackup.addEventListener("click", () => generarBackup(user));
    } else {
      btnBackup.disabled = true;
      mostrarNotificacion("Inicia sesión", "Debes iniciar sesión para generar un backup", "warning");
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarBackup);
