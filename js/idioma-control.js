// idioma-control.js

const traducciones = {
  "es": {
    saludo: "Bienvenido a MedalloVIP",
    iniciar: "Iniciar sesión",
    registrar: "Registrarse",
    cerrar: "Cerrar sesión"
  },
  "en": {
    saludo: "Welcome to MedalloVIP",
    iniciar: "Login",
    registrar: "Register",
    cerrar: "Logout"
  },
  "fr": {
    saludo: "Bienvenue sur MedalloVIP",
    iniciar: "Connexion",
    registrar: "S'inscrire",
    cerrar: "Déconnexion"
  },
  "de": {
    saludo: "Willkommen bei MedalloVIP",
    iniciar: "Anmelden",
    registrar: "Registrieren",
    cerrar: "Abmelden"
  }
};

// Cambiar idioma y guardar
function cambiarIdioma(idioma) {
  localStorage.setItem("idioma", idioma);
  aplicarTraduccion(idioma);
}

// Aplicar idioma actual
function aplicarTraduccion(idioma) {
  const textos = traducciones[idioma] || traducciones["es"];
  Object.keys(textos).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = textos[id];
  });
}

// Al cargar la página, aplicar idioma guardado
window.addEventListener("DOMContentLoaded", () => {
  const idiomaGuardado = localStorage.getItem("idioma") || "es";
  aplicarTraduccion(idiomaGuardado);
});

// Exportar para usar desde otros controles
export { cambiarIdioma };
