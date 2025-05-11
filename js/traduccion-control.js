// traduccion-control.js

const TRADUCCIONES = {
  es: {
    bienvenido: "Bienvenido",
    iniciarSesion: "Iniciar sesión",
    registrarse: "Registrarse",
    transmitir: "Transmitir en vivo",
    tokens: "Tokens disponibles",
    cerrarSesion: "Cerrar sesión",
    favoritos: "Favoritos",
    perfil: "Mi perfil",
    soporte: "Soporte"
  },
  en: {
    bienvenido: "Welcome",
    iniciarSesion: "Login",
    registrarse: "Register",
    transmitir: "Go Live",
    tokens: "Available tokens",
    cerrarSesion: "Logout",
    favoritos: "Favorites",
    perfil: "My profile",
    soporte: "Support"
  },
  fr: {
    bienvenido: "Bienvenue",
    iniciarSesion: "Connexion",
    registrarse: "Inscription",
    transmitir: "Diffuser en direct",
    tokens: "Jetons disponibles",
    cerrarSesion: "Déconnexion",
    favoritos: "Favoris",
    perfil: "Mon profil",
    soporte: "Assistance"
  }
};

// Aplica traducción a los elementos marcados con data-i18n="clave"
function aplicarTraduccionGlobal(idioma = "es") {
  const idiomaActivo = TRADUCCIONES[idioma] || TRADUCCIONES["es"];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const clave = el.getAttribute("data-i18n");
    const texto = idiomaActivo[clave];
    if (texto) el.textContent = texto;
  });
}

// Guardar preferencia y aplicar
function cambiarIdiomaSistema(nuevoIdioma) {
  localStorage.setItem("idioma", nuevoIdioma);
  aplicarTraduccionGlobal(nuevoIdioma);
}

// Al cargar, aplicar idioma guardado
window.addEventListener("DOMContentLoaded", () => {
  const idiomaGuardado = localStorage.getItem("idioma") || "es";
  aplicarTraduccionGlobal(idiomaGuardado);
});

export { cambiarIdiomaSistema, aplicarTraduccionGlobal };
