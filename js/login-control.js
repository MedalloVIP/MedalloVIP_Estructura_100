// login-control.js

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Elementos del DOM
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const googleBtn = document.getElementById("googleBtn");

// Registro con correo
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        mostrarNotificacion("Registro exitoso", "Bienvenido a MedalloVIP", "éxito");
      })
      .catch(error => {
        mostrarNotificacion("Error de registro", error.message, "error");
      });
  });
}

// Inicio con correo
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        mostrarNotificacion("Bienvenido", `Hola ${userCredential.user.email}`, "éxito");
      })
      .catch(error => {
        mostrarNotificacion("Error al iniciar sesión", error.message, "error");
      });
  });
}

// Inicio con Google
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const nombre = result.user.displayName || result.user.email;
        mostrarNotificacion("Sesión iniciada", `Hola ${nombre}`, "éxito");
      })
      .catch(error => {
        mostrarNotificacion("Error con Google", error.message, "error");
      });
  });
}

// Detectar si ya hay usuario logueado
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Usuario activo:", user.email);
    localStorage.setItem("usuario", JSON.stringify(user));
  } else {
    console.log("No hay sesión activa");
    localStorage.removeItem("usuario");
  }
});
