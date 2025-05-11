// avatar-control.js

const capas = {
  cuerpo: "base.png",
  cabello: "cabello1.png",
  ropa: "ropa1.png",
  accesorio: null
};

const visor = document.getElementById("avatarPreview");

// Cargar capas iniciales
function renderizarAvatar() {
  visor.innerHTML = "";

  Object.keys(capas).forEach(nombre => {
    const ruta = capas[nombre];
    if (ruta) {
      const img = document.createElement("img");
      img.src = `./capas/${ruta}`;
      img.alt = nombre;
      img.style = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
      `;
      visor.appendChild(img);
    }
  });
}

// Cambiar una capa
function cambiarCapa(tipo, archivo) {
  capas[tipo] = archivo;
  renderizarAvatar();
}

// Exportar para usar desde UI externa
export { cambiarCapa, renderizarAvatar };

// Inicializar al cargar
window.addEventListener("DOMContentLoaded", renderizarAvatar);
