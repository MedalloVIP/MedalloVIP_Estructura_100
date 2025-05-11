// eventos-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Simulador de eventos del sistema (esto se puede conectar con Firebase más adelante)
const eventosSimulados = [
  { tipo: "regalo", mensaje: "¡Recibiste un regalo sexy!", sonido: "éxito" },
  { tipo: "visita", mensaje: "Alguien acaba de visitar tu perfil", sonido: "info" },
  { tipo: "reaccion", mensaje: "¡Recibiste un aplauso!", sonido: "éxito" },
  { tipo: "alerta", mensaje: "¡Tienes una nueva solicitud privada!", sonido: "info" }
];

// Función para lanzar un evento aleatorio (solo para pruebas)
function lanzarEventoAleatorio() {
  const evento = eventosSimulados[Math.floor(Math.random() * eventosSimulados.length)];
  mostrarNotificacion(`Evento: ${evento.tipo}`, evento.mensaje, evento.sonido);
}

// Exportar para activar desde otros módulos
export { lanzarEventoAleatorio };

