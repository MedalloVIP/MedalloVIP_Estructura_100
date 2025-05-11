// favoritos-control.js

import { mostrarNotificacion } from "./notificaciones-control.js";

// Leer favoritos guardados
function obtenerFavoritos() {
  const data = localStorage.getItem("favoritosModelos");
  return data ? JSON.parse(data) : [];
}

// Guardar favoritos
function guardarFavoritos(lista) {
  localStorage.setItem("favoritosModelos", JSON.stringify(lista));
}

// Marcar o desmarcar modelo
function toggleFavorito(nombreModelo) {
  const favoritos = obtenerFavoritos();
  const index = favoritos.indexOf(nombreModelo);

  if (index >= 0) {
    favoritos.splice(index, 1);
    mostrarNotificacion("Eliminado", `${nombreModelo} fue removida de tus favoritas`, "info");
  } else {
    favoritos.push(nombreModelo);
    mostrarNotificacion("Favorito añadido", `${nombreModelo} fue añadida a tus favoritas`, "éxito");
  }

  guardarFavoritos(favoritos);
  mostrarFavoritos();
}

// Mostrar favoritos actuales en pantalla
function mostrarFavoritos() {
  const contenedor = document.getElementById("listaFavoritos");
  const favoritos = obtenerFavoritos();

  if (!contenedor) return;

  contenedor.innerHTML = "";

  favoritos.forEach(nombre => {
    const item = document.createElement("div");
    item.style = `
      background: rgba(255,255,255,0.05);
      margin-bottom: 8px;
      padding: 10px;
      border-radius: 8px;
      color: #00ffff;
    `;
    item.textContent = nombre;
    contenedor.appendChild(item);
  });
}

window.addEventListener("DOMContentLoaded", mostrarFavoritos);

// Exportar para usar el toggle desde botones externos
export { toggleFavorito, mostrarFavoritos };
