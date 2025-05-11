// bloqueos-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos de la interfaz
const inputUsuario = document.getElementById("usuarioBloqueo");
const selectTipoBloqueo = document.getElementById("tipoBloqueo");
const btnBloquear = document.getElementById("btnBloquearUsuario");

btnBloquear?.addEventListener("click", () => {
  const usuario = inputUsuario?.value.trim();
  const tipo = selectTipoBloqueo?.value;

  if (!usuario) {
    mostrarNotificacion("Usuario requerido", "Debes ingresar el ID o correo del usuario", "error");
    return;
  }

  if (!tipo) {
    mostrarNotificacion("Tipo de bloqueo", "Selecciona si es temporal o permanente", "error");
    return;
  }

  // Simulación de bloqueo (a futuro: actualizar en base de datos)
  console.log(`Usuario ${usuario} ha sido bloqueado como ${tipo}`);

  mostrarNotificacion("Bloqueo exitoso", `Usuario ${usuario} bloqueado (${tipo})`, "éxito");

  // Reset
  inputUsuario.value = "";
  selectTipoBloqueo.selectedIndex = 0;
});
