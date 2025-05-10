// galeria-control.js

const galeria = document.getElementById("galeria");

const imagenes = [
  { src: "https://cdn.medallovip.live/img1.jpg", titulo: "Set en lencería" },
  { src: "https://cdn.medallovip.live/img2.jpg", titulo: "Sesión especial" },
  { src: "https://cdn.medallovip.live/img3.jpg", titulo: "VIP Exclusive" }
];

// Renderizado simple
function mostrarGaleria() {
  if (!galeria) return;
  imagenes.forEach(imagen => {
    const card = document.createElement("div");
    card.style.margin = "10px";
    card.style.border = "2px solid #00ffff";
    card.style.borderRadius = "12px";
    card.style.overflow = "hidden";
    card.style.background = "#111";
    card.style.maxWidth = "240px";
    card.style.boxShadow = "0 0 10px #00ffff77";

    card.innerHTML = `
      <img src="${imagen.src}" alt="${imagen.titulo}" style="width:100%; border-bottom:1px solid #00ffff;">
      <p style="margin:10px; text-align:center; color:#ff00ff;">${imagen.titulo}</p>
    `;
    galeria.appendChild(card);
  });
}

mostrarGaleria();
