// registro-control.js
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";

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
        alert("Por favor completa todos los campos.");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("usuarioActivo", user.email);
        alert("Registro exitoso. Bienvenido a MedalloVIP.");
        window.location.href = "panel.html";
      } catch (error) {
        alert("Error al registrarse: " + error.message);
        console.error(error);
      }
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem("usuarioActivo", user.email);
        alert("Registro con Google exitoso.");
        window.location.href = "panel.html";
      } catch (error) {
        alert("Error con Google: " + error.message);
        console.error(error);
      }
    });
  }
});
