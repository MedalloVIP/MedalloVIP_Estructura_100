// modo-control.js

// Al cargar la página, aplicar el modo guardado
document.addEventListener("DOMContentLoaded", () => {
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "claro") {
    activarModoClaro();
  } else {
    activarModoOscuro(); // por defecto oscuro
  }
});

// Cambiar a modo oscuro
function activarModoOscuro() {
  document.body.style.backgroundColor = "#000000";
  document.body.style.color = "#ffffff";
  localStorage.setItem("modo", "oscuro");
  actualizarTextoBoton("Oscuro");
}

// Cambiar a modo claro
function activarModoClaro() {
  document.body.style.backgroundColor = "#f5f5f5";
  document.body.style.color = "#111111";
  localStorage.setItem("modo", "claro");
  actualizarTextoBoton("Claro");
}

// Crear botón flotante si no existe
const btnModo = document.getElementById("modoBtn") || crearBotonModo();

btnModo.onclick = () => {
  const modoActual = localStorage.getItem("modo");
  if (modoActual === "claro") {
    activarModoOscuro();
  } else {
    activarModoClaro();
  }
};

// Actualiza el texto del botón
function actualizarTextoBoton(modo) {
  btnModo.textContent = `Modo ${modo}`;
}

// Crear el botón si no existe aún
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
    font-size: 14px;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 0 10px #ff00ff;
  `;
  boton.textContent = "Modo Oscuro";
  document.body.appendChild(boton);
  return boton;
}
