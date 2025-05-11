// melizza-control.js

const melizzaBurbuja = document.createElement("img");
melizzaBurbuja.id = "melizzaBurbuja";
melizzaBurbuja.src = "./imagenes/melizza-burbuja.png"; // Asegúrate que esta imagen exista
melizzaBurbuja.alt = "Asistente Melizza";

melizzaBurbuja.style = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 0 12px #ff00ff;
`;

document.body.appendChild(melizzaBurbuja);

// Permitir arrastrar la burbuja
let desplazando = false;
let offsetX, offsetY;

melizzaBurbuja.addEventListener("mousedown", (e) => {
  desplazando = true;
  offsetX = e.clientX - melizzaBurbuja.getBoundingClientRect().left;
  offsetY = e.clientY - melizzaBurbuja.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (desplazando) {
    melizzaBurbuja.style.left = `${e.clientX - offsetX}px`;
    melizzaBurbuja.style.top = `${e.clientY - offsetY}px`;
    melizzaBurbuja.style.bottom = "auto";
    melizzaBurbuja.style.right = "auto";
  }
});

document.addEventListener("mouseup", () => {
  desplazando = false;
});

// Activar IA al hacer clic (conecta con melizza-ai.js)
melizzaBurbuja.addEventListener("click", () => {
  const btn = document.getElementById("melizzaBtn");
  if (btn) {
    btn.click();
  }
});
