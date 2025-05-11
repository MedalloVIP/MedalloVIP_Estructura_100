// perfil-control.js

import { getAuth, updateProfile, updateEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

// Simulación del rol del usuario (luego se extraerá desde Firebase o BD real)
let tipoCuenta = localStorage.getItem("rol") || "usuario"; // modelo, usuario, estudio, partner

const auth = getAuth(app);
const nombreInput = document.getElementById("inputNombre");
const correoInput = document.getElementById("inputCorreo");
const avatarImg = document.getElementById("avatarPerfil");
const btnGuardar = document.getElementById("btnGuardarPerfil");
const seccionPrivilegios = document.getElementById("seccionPrivilegios");

// Mostrar info del usuario
auth.onAuthStateChanged(user => {
  if (user) {
    if (nombreInput) nombreInput.value = user.displayName || "";
    if (correoInput) correoInput.value = user.email || "";
    if (avatarImg && user.photoURL) avatarImg.src = user.photoURL;

    // Mostrar privilegios según rol
    if (seccionPrivilegios) {
      switch (tipoCuenta) {
        case "modelo":
          seccionPrivilegios.innerHTML = "Acceso total a transmisiones, ganancias y ranking.";
          break;
        case "usuario":
          seccionPrivilegios.innerHTML = "Puedes ver transmisiones y enviar tokens.";
          break;
        case "estudio":
          seccionPrivilegios.innerHTML = "Gestionas modelos, visualizas estadísticas.";
          break;
        case "partner":
          seccionPrivilegios.innerHTML = "Revisas referidos y desempeño de la red.";
          break;
        default:
          seccionPrivilegios.innerHTML = "Sin rol definido.";
      }
    }
  }
});

// Guardar cambios básicos
btnGuardar?.addEventListener("click", async () => {
  const user = auth.currentUser;
  const nuevoNombre = nombreInput?.value.trim();
  const nuevoCorreo = correoInput?.value.trim();

  if (!nuevoNombre || !nuevoCorreo) {
    mostrarNotificacion("Campos incompletos", "Todos los campos son obligatorios", "error");
    return;
  }

  try {
    if (nuevoCorreo !== user.email) {
      await updateEmail(user, nuevoCorreo);
    }

    await updateProfile(user, { displayName: nuevoNombre });

    mostrarNotificacion("Perfil actualizado", "Tus datos fueron guardados", "éxito");
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    mostrarNotificacion("Error", error.message, "error");
  }
});
