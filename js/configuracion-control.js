// configuracion-control.js

const menuBtn = document.getElementById("btnAjustes");
const menuContenedor = crearMenuConfiguracion();

menuBtn?.addEventListener("click", () => {
  menuContenedor.style.display = menuContenedor.style.display === "none" ? "block" : "none";
});

// Crear menú completo
function crearMenuConfiguracion() {
  const contenedor = document.createElement("div");
  contenedor.id = "menuConfiguracion";
  contenedor.style = `
    position: fixed;
    top: 70px;
    right: 20px;
    background: rgba(0,0,0,0.9);
    border: 1px solid #00ffff;
    border-radius: 12px;
    padding: 16px;
    color: white;
    z-index: 9999;
    display: none;
    width: 260px;
    font-family: sans-serif;
  `;

  const opciones = [
    "Lenguaje",
    "Tema de la aplicación",
    "Verificación",
    "Cuenta",
    "Privacidad",
    "Avatar",
    "Favoritos",
    "Chats",
    "Soporte en línea",
    "AI Melizza",
    "Notificaciones",
    "Ayuda",
    "Invita"
  ];

  opciones.forEach(opcion => {
    const item = document.createElement("div");
    item.textContent = opcion;
    item.style = `
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      cursor: pointer;
    `;
    item.addEventListener("click", () => {
      console.log(`Seleccionaste: ${opcion}`);
    });
    contenedor.appendChild(item);
  });

  document.body.appendChild(contenedor);
  return contenedor;
}
