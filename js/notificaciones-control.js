// notificaciones-control.js

// Crear contenedor si no existe
let contenedorNotificaciones = document.getElementById("contenedorNotificaciones");

if (!contenedorNotificaciones) {
  contenedorNotificaciones = document.createElement("div");
  contenedorNotificaciones.id = "contenedorNotificaciones";
  contenedorNotificaciones.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;
  document.body.appendChild(contenedorNotificaciones);
}

// Mostrar notificación global
function mostrarNotificacion(titulo, mensaje, tipo = "info", duracion = 4000) {
  const noti = document.createElement("div");
  noti.className = "notificacion";
  noti.style = `
    background: ${obtenerColor(tipo)};
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    box-shadow: 0 0 10px ${obtenerColor(tipo)};
    font-size: 14px;
    min-width: 220px;
    max-width: 300px;
    animation: slideIn 0.4s ease-out;
  `;

  noti.innerHTML = `
    <strong style="display:block; font-size:15px;">${titulo}</strong>
    <span>${mensaje}</span>
  `;

  contenedorNotificaciones.appendChild(noti);

  setTimeout(() => {
    noti.style.opacity = "0";
    setTimeout(() => contenedorNotificaciones.removeChild(noti), 300);
  }, duracion);
}

// Devuelve color según el tipo
function obtenerColor(tipo) {
  switch (tipo) {
    case "success": return "#00cc88";
    case "error": return "#ff4444";
    case "warning": return "#ffaa00";
    case "info":
    default: return "#00ffff";
  }
}

// Exportar la función para usar globalmente
export { mostrarNotificacion };
