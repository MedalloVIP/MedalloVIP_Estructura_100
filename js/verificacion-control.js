// verificacion-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const inputArchivo = document.getElementById("archivoVerificacion");
const btnVerificar = document.getElementById("btnVerificar");

btnVerificar?.addEventListener("click", () => {
  const archivo = inputArchivo?.files?.[0];

  if (!archivo) {
    mostrarNotificacion("Sin archivo", "Debes seleccionar una imagen o documento", "error");
    return;
  }

  // Validar tipo de archivo
  const tiposPermitidos = ["image/jpeg", "image/png", "application/pdf"];
  if (!tiposPermitidos.includes(archivo.type)) {
    mostrarNotificacion("Formato inválido", "Solo se aceptan JPG, PNG o PDF", "error");
    return;
  }

  // Simulación de envío
  console.log("Archivo enviado para verificación:", archivo.name);
  mostrarNotificacion("Verificación en proceso", "Tu documento está siendo revisado", "info");

  inputArchivo.value = "";
});
