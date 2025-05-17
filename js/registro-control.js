// registro-control.js

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.addEventListener("DOMContentLoaded", () => {
  const btnRegistro = document.getElementById("btnRegistro");
  const btnGoogle = document.getElementById("btnGoogleRegistro");

  if (btnRegistro) {
    btnRegistro.addEventListener("click", async () => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        mostrarNotificacion("Campos requeridos", "Debes completar todos los campos", "warning");
        return;
      }

      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("usuarioActivo", cred.user.email);
        mostrarNotificacion("Registro exitoso", "Bienvenido a MedalloVIP", "success");
        window.location.href = "panel.html";
      } catch (error) {
        mostrarNotificacion("Error", error.message, "error");
        console.error("Registro fallido:", error);
      }
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem("usuarioActivo", user.email);
        mostrarNotificacion("Google conectado", "Registro con Google exitoso", "success");
        window.location.href = "panel.html";
      } catch (error) {
        mostrarNotificacion("Error con Google", error.message, "error");
        console.error("Google sign-in error:", error);
      }
    });
  }
});
