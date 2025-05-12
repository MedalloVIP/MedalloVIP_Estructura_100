// login-control.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config importado desde tu archivo
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const btnLogin = document.getElementById("btnLogin");
const btnGoogle = document.getElementById("btnGoogle");

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
