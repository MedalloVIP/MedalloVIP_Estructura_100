// bonificaciones-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Bonificaciones configuradas
const bonificaciones = [
  { tipo: "diaria", condicion: true, premio: 100, descripcion: "Ingreso diario" },
  { tipo: "semanal", condicion: true, premio: 500, descripcion: "Transmisión durante 5 días consecutivos" },
  { tipo: "evento", condicion: false, premio: 1000, descripcion: "Participación en evento especial" }
];

// Revisar y otorgar bonificaciones válidas
function revisarBonificaciones() {
  const entregadas = [];

  bonificaciones.forEach((b, i) => {
    if (b.condicion) {
      entregadas.push(b);

      setTimeout(() => {
        mostrarNotificacion("¡Bonificación recibida!", `${b.descripcion} (+${b.premio} tokens)`, "éxito");
      }, 1000 * i);
    }
  });

  console.log("Bonificaciones entregadas:", entregadas);
}

window.addEventListener("DOMContentLoaded", revisarBonificaciones);
