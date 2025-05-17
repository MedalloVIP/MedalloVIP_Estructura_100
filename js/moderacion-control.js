// moderacion-control.js

// Lista de palabras bloqueadas (modo beta)
const palabrasProhibidas = [
  "idiota", "estúpido", "put@", "imbecil", "malparido", "perra", "mierda", "nazi",
  "zorra", "pene", "vagina", "sexo", "violación", "violador", "pedofilia", "nude", "nudes"
];

// Función que valida un mensaje antes de enviarlo
function moderarMensaje(texto, usuario) {
  const textoLimpio = texto.toLowerCase();

  const contieneOfensa = palabrasProhibidas.some(palabra =>
    textoLimpio.includes(palabra)
  );

  if (contieneOfensa) {
    alert(`El mensaje contiene palabras ofensivas y fue bloqueado.`);
    console.warn(`Mensaje bloqueado de ${usuario}: "${texto}"`);
    return false;
  }

  return true;
}

export { moderarMensaje };
