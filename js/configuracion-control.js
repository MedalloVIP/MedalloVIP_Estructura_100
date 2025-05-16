// configuracion-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const selectorTema = document.getElementById("selectorTema");
const selectorIdioma = document.getElementById("selectorIdioma");
const toggleNotificaciones = document.getElementById("toggleNotificaciones");

// Aplicar configuración al cargar
function aplicarConfiguracion() {
  const tema = localStorage.getItem("temaApp") || "oscuro";
  const idioma = localStorage.getItem("idiomaApp") || "es";
  const notificaciones = localStorage.getItem("notificacionesApp") !== "false";

  document.body.classList.toggle("tema-claro", tema === "claro");

  if (selectorTema) selectorTema.value = tema;
  if (selectorIdioma) selectorIdioma.value = idioma;
  if (toggleNotificaciones) toggleNotificaciones.checked = notificaciones;

  mostrarNotificacion("Configuración aplicada", "Tus preferencias han sido restauradas", "info");
}

// Guardar preferencias
function guardarConfiguracion() {
  const tema = selectorTema?.value || "oscuro";
  const idioma = selectorIdioma?.value || "es";
  const notificaciones = toggleNotificaciones?.checked;

  localStorage.setItem("temaApp", tema);
  localStorage.setItem("idiomaApp", idioma);
  localStorage.setItem("notificacionesApp", notificaciones);

  document.body.classList.toggle("tema-claro", tema === "claro");

  mostrarNotificacion("Preferencias guardadas", "Tus ajustes se han aplicado correctamente", "success");
}

// Inicializar controles de configuración
function inicializarConfiguracion() {
  if (!selectorTema || !selectorIdioma || !toggleNotificaciones) {
    console.warn("Faltan elementos de configuración en el DOM.");
    return;
  }

  aplicarConfiguracion();

  selectorTema.addEventListener("change", guardarConfiguracion);
  selectorIdioma.addEventListener("change", guardarConfiguracion);
  toggleNotificaciones.addEventListener("change", guardarConfiguracion);
}

window.addEventListener("DOMContentLoaded", inicializarConfiguracion);
