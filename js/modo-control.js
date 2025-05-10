// modo-control.js

export function iniciarModoDinamico(botonId) {
  const btnModo = document.getElementById(botonId);
  if (!btnModo) return;

  let modoOscuro = true;

  btnModo.onclick = () => {
    document.body.classList.toggle('modo-claro');
    modoOscuro = !modoOscuro;

    btnModo.textContent = modoOscuro ? "Modo Claro" : "Modo Oscuro";
    btnModo.style.backgroundColor = modoOscuro ? "#00ffff" : "#ff00ff";
    btnModo.style.color = "black";
  };
}
