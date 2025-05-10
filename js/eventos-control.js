// eventos-control.js

const contenedorEventos = document.getElementById("eventos");

const eventosActivos = [
  {
    titulo: "Sorteo Semanal",
    descripcion: "Participa y gana 500 tokens este viernes.",
    color: "#ff00ff"
  },
  {
    titulo: "Show Especial 2x1",
    descripcion: "Disfruta doble placer por el mismo precio hoy.",
    color: "#00ffff"
  },
  {
    titulo: "Fan del Mes",
    descripcion: "El fan más activo recibirá un regalo VIP.",
    color: "#ffaa00"
  }
];

// Renderizar eventos dinámicamente
function mostrarEventos() {
  if (!contenedorEventos) return;
  eventosActivos.forEach(evento => {
    const box = document.createElement("div");
    box.style.border = `2px solid ${evento.color}`;
    box.style.padding = "15px";
    box.style.marginBottom = "10px";
    box.style.borderRadius = "12px";
    box.innerHTML = `
      <h3 style="color:${evento.color}; margin-bottom: 5px;">${evento.titulo}</h3>
      <p>${evento.descripcion}</p>
    `;
    contenedorEventos.appendChild(box);
  });
}

mostrarEventos();
