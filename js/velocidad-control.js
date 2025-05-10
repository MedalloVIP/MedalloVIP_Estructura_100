// velocidad-control.js

export function iniciarMedicionVelocidad(elementoSalida) {
  if (!elementoSalida || !navigator.connection) return;

  setInterval(() => {
    const velocidad = navigator.connection.downlink;
    elementoSalida.textContent = `Velocidad: ${velocidad.toFixed(1)} Mbps`;
  }, 3000);
}// Medición de velocidad de conexión
