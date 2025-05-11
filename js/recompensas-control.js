// recompensas-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Recompensas simuladas (pueden venir desde Firebase después)
const recompensasPendientes = [
  { tipo: "bono", titulo: "¡Bono diario!", detalle: "Has recibido 150 tokens por ingresar hoy" },
  { tipo: "logro", titulo: "Meta alcanzada", detalle: "Completaste 5 transmisiones esta semana" },
  { tipo: "ranking", titulo: "Top 3 Modelo", detalle: "Estás entre las 3 más vistas" }
];

// Activar recompensas pendientes al cargar
function revisarRecompensas() {
  if (!recompensasPendientes.length) return;

  recompensasPendientes.forEach((r, i) => {
    setTimeout(() => {
      mostrarNotificacion(r.titulo, r.detalle, "éxito");
    }, 1000 * i + 800);
  });

  // Luego puedes vaciar o marcar como entregadas en la base de datos
}

window.addEventListener("DOMContentLoaded", revisarRecompensas);
