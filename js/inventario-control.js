// inventario-control.js

const inventario = document.getElementById("inventario");

const items = [
  { nombre: "Lencería Rosa", img: "https://cdn.medallovip.live/lenceria1.png", precio: 150 },
  { nombre: "Juguete Exclusivo", img: "https://cdn.medallovip.live/juguete1.png", precio: 300 },
  { nombre: "Foto Autografiada", img: "https://cdn.medallovip.live/foto1.png", precio: 500 }
];

function mostrarInventario() {
  if (!inventario) return;
  items.forEach(item => {
    const card = document.createElement("div");
    card.style.background = "#111";
    card.style.border = "2px solid #00ffff";
    card.style.borderRadius = "10px";
    card.style.margin = "10px";
    card.style.padding = "10px";
    card.style.width = "200px";
    card.style.textAlign = "center";
    card.style.color = "#fff";
    card.style.boxShadow = "0 0 10px #00ffff88";

    card.innerHTML = `
      <img src="${item.img}" alt="${item.nombre}" style="width:100%; border-radius:8px;"/>
      <h4 style="margin:10px 0;">${item.nombre}</h4>
      <p style="color:#ff00ff;">${item.precio} Tokens</p>
      <button style="background:#00ffff; color:black; font-weight:bold; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Comprar</button>
    `;

    inventario.appendChild(card);
  });
}

mostrarInventario();
