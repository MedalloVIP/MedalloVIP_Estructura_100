// reportes-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const selectMotivo = document.getElementById("motivoReporte");
const textareaDescripcion = document.getElementById("descripcionReporte");
const btnEnviarReporte = document.getElementById("btnEnviarReporte");

btnEnviarReporte?.addEventListener("click", () => {
  const motivo = selectMotivo?.value;
  const descripcion = textareaDescripcion?.value.trim();

  if (!motivo) {
    mostrarNotificacion("Falta motivo", "Selecciona el motivo del reporte", "error");
    return;
  }

  if (!descripcion || descripcion.length < 10) {
    mostrarNotificacion("Descripción muy corta", "Escribe al menos 10 caracteres", "error");
    return;
  }

  // Simulación de reporte enviado
  console.log("Reporte enviado:", { motivo, descripcion });

  mostrarNotificacion("Reporte enviado", "Nuestro equipo revisará el caso", "éxito");

  // Limpiar campos
  selectMotivo.selectedIndex = 0;
  textareaDescripcion.value = "";
});// Reporte de usuarios
