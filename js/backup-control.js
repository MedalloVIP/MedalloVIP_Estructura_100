// backup-control.js
import { db } from "./config/firebase-config.js";

export async function guardarBackup(usuarioId, datosBackup) {
  try {
    const backupRef = db.collection("backups").doc(usuarioId);
    await backupRef.set({
      ...datosBackup,
      timestamp: new Date().toISOString()
    });
    console.log("Backup guardado exitosamente.");
  } catch (error) {
    console.error("Error al guardar el backup:", error);
  }
}

export async function obtenerBackup(usuarioId) {
  try {
    const doc = await db.collection("backups").doc(usuarioId).get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.warn("No se encontró backup para este usuario.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el backup:", error);
    return null;
  }
}// Copias de seguridad
