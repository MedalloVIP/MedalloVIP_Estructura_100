// modo-control.js

// Aplica el modo guardado al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const modoGuardado = localStorage.getItem("modoVisual") || "oscuro";
  aplicarModo(modoGuardado);

  const btn = document.getElementById("modoBtn") || crearBotonModo();
  btn.textContent = `Modo ${capitalizar(modoGuardado)}`;
  btn.onclick = alternarModo;
});

// Alternar entre claro y oscuro
function alternarModo() {
  const modoActual = localStorage.getItem("modoVisual") || "oscuro";
  const nuevoModo = modoActual === "claro" ? "oscuro" : "claro";
  aplicarModo(nuevoModo);
  localStorage.setItem("modoVisual", nuevoModo);
  actualizarTextoBoton(nuevoModo);
}

// Aplica el modo al `<body>`
function aplicarModo(modo) {
  if (modo === "claro") {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#111111";
  } else {
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
  }
}

// Cambia el texto del botón según el modo actual
function actualizarTextoBoton(modo) {
  const btn = document.getElementById("modoBtn");
  if (btn) {
    btn.textContent = `Modo ${capitalizar(modo)}`;
  }
}

// Crea el botón si no existe
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
  document.body.appendChild(boton);
  return boton;
}

// Capitaliza "claro" → "Claro"
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
