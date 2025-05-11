// calendario-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

const eventosClave = "agendaEventosMedallo";
const inputTitulo = document.getElementById("tituloEvento");
const inputFecha = document.getElementById("fechaEvento");
const inputDescripcion = document.getElementById("descripcionEvento");
const btnAgregar = document.getElementById("btnAgregarEvento");
const listaEventos = document.getElementById("listaEventos");

// Obtener eventos guardados
function obtenerEventos() {
  const data = localStorage.getItem(eventosClave);
  return data ? JSON.parse(data) : [];
}

// Guardar lista de eventos
function guardarEventos(lista) {
  localStorage.setItem(eventosClave, JSON.stringify(lista));
}

// Agregar nuevo evento
btnAgregar?.addEventListener("click", () => {
  const titulo = inputTitulo?.value.trim();
  const fecha = inputFecha?.value;
  const descripcion = inputDescripcion?.value.trim();

  if (!titulo || !fecha || !descripcion) {
    mostrarNotificacion("Campos incompletos", "Debes completar todos los datos", "error");
    return;
  }

  const nuevoEvento = { titulo, fecha, descripcion };
  const eventos = obtenerEventos();
  eventos.push(nuevoEvento);
  guardarEventos(eventos);
  mostrarEventos();

  mostrarNotificacion("Evento guardado", `${titulo} agendado con éxito`, "éxito");

  inputTitulo.value = "";
  inputFecha.value = "";
  inputDescripcion.value = "";
});

// Mostrar todos los eventos
function mostrarEventos() {
  const eventos = obtenerEventos();

  if (!listaEventos) return;
  listaEventos.innerHTML = "";

  eventos.forEach(evento => {
    const item = document.createElement("div");
    item.style = `
      background: rgba(0,0,0,0.3);
      padding: 10px;
      margin-bottom: 10px;
      border-left: 4px solid #00ffff;
      border-radius: 6px;
    `;
    item.innerHTML = `
      <strong>${evento.titulo}</strong><br>
      <span>${evento.fecha}</span><br>
      <small>${evento.descripcion}</small>
    `;
    listaEventos.appendChild(item);
  });
}

window.addEventListener("DOMContentLoaded", mostrarEventos);
