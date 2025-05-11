// metas-control.js

// Datos de ejemplo, luego puedes conectar con Firebase o una base real
const metas = [
  { nombre: "Meta 1: Gana $50", progreso: 45, meta: 50, premio: "200 tokens" },
  { nombre: "Meta 2: Obtén 5 referidos", progreso: 3, meta: 5, premio: "Bonificación de $10" },
  { nombre: "Meta 3: Transmite 10 horas", progreso: 8, meta: 10, premio: "Destacado en el ranking" }
];

function cargarMetas() {
  const contenedor = document.getElementById("contenedorMetas");

  if (!contenedor) {
    console.error("No se encontró el contenedor de metas");
    return;
  }

  metas.forEach((meta, index) => {
    const porcentaje = Math.floor((meta.progreso / meta.meta) * 100);
    
    const bloque = document.createElement("div");
    bloque.className = "meta-item";
    bloque.style = `
      background: rgba(255, 255, 255, 0.05);
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 12px;
      border: 1px solid #00ffff;
      color: white;
      font-family: sans-serif;
    `;

    bloque.innerHTML = `
      <h3 style="color:#00ffff;">${meta.nombre}</h3>
      <p>Premio: <strong>${meta.premio}</strong></p>
      <div style="background: #333; border-radius: 10px; overflow: hidden; margin: 10px 0;">
        <div style="width: ${porcentaje}%; background: linear-gradient(90deg, #00ffff, #ff00ff); height: 14px;"></div>
      </div>
      <p>${meta.progreso} / ${meta.meta}</p>
    `;

    contenedor.appendChild(bloque);
  });
}

window.addEventListener("DOMContentLoaded", cargarMetas);
