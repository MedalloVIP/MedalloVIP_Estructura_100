// modo-control.js

// Verifica el modo guardado al cargar
document.addEventListener("DOMContentLoaded", () => {
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "claro") {
    activarModoClaro();
  } else {
    activarModoOscuro(); // por defecto oscuro
  }
});

// Activar modo oscuro
function activarModoOscuro() {
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#fff";
  localStorage.setItem("modo", "oscuro");
  actualizarBoton("Oscuro");
}

// Activar modo claro
function activarModoClaro() {
  document.body.style.backgroundColor = "#f5f5f5";
  document.body.style.color = "#111";
  localStorage.setItem("modo", "claro");
  actualizarBoton("Claro");
}

// Botón para cambiar el modo
const btnModo = document.getElementById("modoBtn") || crearBotonModo();

btnModo.onclick = () => {
  const modoActual = localStorage.getItem("modo");
  if (modoActual === "claro") {
    activarModoOscuro();
  } else {
    activarModoClaro();
  }
};

// Actualizar texto del botón
function actualizarBoton(modo) {
  btnModo.textContent = `Modo ${modo}`;
}

// Crear botón flotante si no existe
function crearBotonModo() {
  const boton = document.createElement("button");
  boton.id = "modoBtn";
  boton.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff00ff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 0 10px #ff00ff;
  `;
  boton.textContent = "Modo Oscuro";
  document.body.appendChild(boton);
  return boton;
}
