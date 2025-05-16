// avatar-control.js

// Capa base del avatar
const capas = {
  cuerpo: "base.png",
  cabello: "cabello1.png",
  ropa: "ropa1.png",
  accesorio: null
};

// Elemento contenedor del avatar
const visor = document.getElementById("avatarPreview");

// Renderizar todas las capas del avatar
function renderizarAvatar() {
  if (!visor) {
    console.warn("No se encontró el contenedor del avatar.");
    return;
  }

  visor.innerHTML = "";
  visor.style.position = "relative";
  visor.style.width = "200px"; // ajustable
  visor.style.height = "300px"; // ajustable

  Object.entries(capas).forEach(([nombre, archivo]) => {
    if (archivo) {
      const img = document.createElement("img");
      img.src = `./capas/${archivo}`;
      img.alt = nombre;
      img.style.position = "absolute";
      img.style.top = 0;
      img.style.left = 0;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.pointerEvents = "none";
      img.setAttribute("data-capa", nombre);
      visor.appendChild(img);
    }
  });
}

// Cambiar una capa específica (ej. cabello, ropa)
function cambiarCapa(tipo, archivo) {
  if (capas.hasOwnProperty(tipo)) {
    capas[tipo] = archivo;
    renderizarAvatar();
  } else {
    console.warn(`Capa no reconocida: ${tipo}`);
  }
}

// Exportar funciones para el controlador de UI
export { cambiarCapa, renderizarAvatar };

// Inicializar al cargar
window.addEventListener("DOMContentLoaded", renderizarAvatar);
