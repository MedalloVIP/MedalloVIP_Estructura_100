// login-control.js

// Importar Firebase y Auth
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js"; // Usamos la instancia ya inicializada

// Inicializar servicios de autenticación
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Obtener botones del DOM
const btnLogin = document.getElementById("btnLogin");
const btnGoogle = document.getElementById("btnGoogle");

// Evento: Login con correo y contraseña
btnLogin.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor ingresa todos los campos.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("usuarioActivo", email);
    window.location.href = "panel.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
    console.error(error);
  }
});

// Evento: Login con Google
btnGoogle.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("usuarioActivo", user.email);
    window.location.href = "panel.html";
  } catch (error) {
    alert("Error con Google: " + error.message);
    console.error(error);
  }
});
