// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Configuración oficial de Firebase para MedalloVIP
const firebaseConfig = {
  apiKey: "AIzaSyD7pcnepnpTngr3et84W_rXcQ6GQDK1TU4",
  authDomain: "medallovip-bae9f.firebaseapp.com",
  projectId: "medallovip-bae9f",
  storageBucket: "medallovip-bae9f.appspot.com",
  messagingSenderId: "97246531560",
  appId: "1:97246531560:web:64be84a8c9dece26741e5d",
  measurementId: "G-BCLX4S2R83"
};

// Inicializar Firebase y Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
