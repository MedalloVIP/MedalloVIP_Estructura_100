// login-control.js

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js"; // Solo si lo estás usando

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const btnGoogle = document.getElementById("btnGoogle");

  if (btnLogin) {
    btnLogin.addEventListener("click", async () => {
      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (!email || !password) {
        mostrarNotificacion?.("Faltan datos", "Por favor ingresa todos los campos", "warning") ||
        alert("Por favor ingresa todos los campos.");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("usuarioActivo", email);
        mostrarNotificacion?.("Bienvenido", "Inicio de sesión exitoso", "success");
        window.location.href = "panel.html";
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        mostrarNotificacion?.("Error", error.message, "error") ||
        alert("Error al iniciar sesión: " + error.message);
      }
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem("usuarioActivo", user.email);
        mostrarNotificacion?.("Inicio con Google", "Sesión iniciada correctamente", "success");
        window.location.href = "panel.html";
      } catch (error) {
        console.error("Error con Google:", error);
        mostrarNotificacion?.("Error", error.message, "error") ||
        alert("Error con Google: " + error.message);
      }
    });
  }
});
