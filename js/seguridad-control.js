// seguridad-control.js

import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "./firebase-config.js";
import { mostrarNotificacion } from "./notificaciones-control.js";

const auth = getAuth(app);

const inputActual = document.getElementById("passActual");
const inputNueva = document.getElementById("passNueva");
const btnCambiar = document.getElementById("btnCambiarPass");
const chk2FA = document.getElementById("activar2FA");

btnCambiar?.addEventListener("click", async () => {
  const actual = inputActual?.value.trim();
  const nueva = inputNueva?.value.trim();
  const user = auth.currentUser;

  if (!actual || !nueva) {
    mostrarNotificacion("Campos incompletos", "Debes llenar ambos campos", "error");
    return;
  }

  try {
    const credencial = EmailAuthProvider.credential(user.email, actual);
    await reauthenticateWithCredential(user, credencial);
    await updatePassword(user, nueva);

    mostrarNotificacion("Contraseña actualizada", "Tu nueva contraseña fue guardada", "éxito");
    inputActual.value = "";
    inputNueva.value = "";
  } catch (error) {
    console.error("Error de seguridad:", error);
    mostrarNotificacion("Error", error.message, "error");
  }
});

chk2FA?.addEventListener("change", () => {
  if (chk2FA.checked) {
    mostrarNotificacion("2FA activado", "Verificación adicional activada (modo demo)", "info");
  } else {
    mostrarNotificacion("2FA desactivado", "Verificación adicional desactivada", "info");
  }
});
