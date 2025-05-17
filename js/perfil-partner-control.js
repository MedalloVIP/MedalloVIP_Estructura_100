// perfil-partner-control.js

import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Elementos del DOM
const inputEmpresa = document.getElementById("empresaPartner");
const inputSector = document.getElementById("sectorPartner");
const inputPresentacion = document.getElementById("presentacionPartner");
const btnGuardar = document.getElementById("btnGuardarPartner");
const visorResumen = document.getElementById("resumenPartner");

let partnerActual = null;

// Cargar perfil existente
function cargarPerfilPartner(user) {
  const email = user.email;
  const datos = JSON.parse(localStorage.getItem(`partner_${email}`)) || {
    empresa: "",
    sector: "",
    presentacion: ""
  };

  inputEmpresa.value = datos.empresa;
  inputSector.value = datos.sector;
  inputPresentacion.value = datos.presentacion;

  if (visorResumen) {
    visorResumen.innerHTML = `
      <p><strong>Correo asociado:</strong> ${email}</p>
      <p><strong>Empresa:</strong> ${datos.empresa || "No definida"}</p>
      <p><strong>Sector:</strong> ${datos.sector || "No definido"}</p>
    `;
  }
}

// Guardar perfil del partner
function guardarPerfilPartner() {
  const empresa = inputEmpresa.value.trim();
  const sector = inputSector.value.trim();
  const presentacion = inputPresentacion.value.trim();

  if (!empresa || !sector) {
    mostrarNotificacion("Campos requeridos", "Empresa y sector no pueden estar vacíos", "warning");
    return;
  }

  const datos = { empresa, sector, presentacion };
  localStorage.setItem(`partner_${partnerActual.email}`, JSON.stringify(datos));
  mostrarNotificacion("Perfil guardado", "Tu perfil de partner fue actualizado", "success");
  cargarPerfilPartner(partnerActual);
}

// Inicializar módulo
function inicializarPerfilPartner() {
  if (!inputEmpresa || !inputSector || !inputPresentacion || !btnGuardar) {
    console.warn("Faltan campos del perfil de partner.");
    return;
  }

  onAuthStateChanged(getAuth(app), (user) => {
    if (user) {
      partnerActual = user;
      cargarPerfilPartner(user);
      btnGuardar.addEventListener("click", guardarPerfilPartner);
    } else {
      mostrarNotificacion("Sin sesión", "Inicia sesión como partner para acceder a tu perfil", "warning");
    }
  });
}

window.addEventListener("DOMContentLoaded", inicializarPerfilPartner);
