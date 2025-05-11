// envios-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const inputNombre = document.getElementById("envioNombre");
const inputDireccion = document.getElementById("envioDireccion");
const inputCiudad = document.getElementById("envioCiudad");
const inputTelefono = document.getElementById("envioTelefono");
const btnGuardarEnvio = document.getElementById("btnGuardarEnvio");

// Guardar dirección de envío (simulado en localStorage)
btnGuardarEnvio?.addEventListener("click", () => {
  const nombre = inputNombre?.value.trim();
  const direccion = inputDireccion?.value.trim();
  const ciudad = inputCiudad?.value.trim();
  const telefono = inputTelefono?.value.trim();

  if (!nombre || !direccion || !ciudad || !telefono) {
    mostrarNotificacion("Campos requeridos", "Completa todos los datos de envío", "error");
    return;
  }

  const datosEnvio = { nombre, direccion, ciudad, telefono };
  localStorage.setItem("direccionEnvioMedallo", JSON.stringify(datosEnvio));

  mostrarNotificacion("Datos guardados", "Tu dirección fue registrada exitosamente", "éxito");

  // Limpieza opcional
  inputNombre.value = "";
  inputDireccion.value = "";
  inputCiudad.value = "";
  inputTelefono.value = "";
});
