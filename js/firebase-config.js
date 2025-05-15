// firebase-config.js

// Importar la función de inicialización desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// Configuración oficial de Firebase para MedalloVIP
const firebaseConfig = {
  apiKey: "AIzaSyC5GDaZOlXK8xZKgr2wShlQ1_fh6k6O-0g",
  authDomain: "medallovip.firebaseapp.com",
  projectId: "medallovip",
  storageBucket: "medallovip.appspot.com",
  messagingSenderId: "1032680188247",
  appId: "1:1032680188247:web:aa3fdd233a4a8d9998cdbe",
  measurementId: "G-GMKVZ58W07",
  databaseURL: "https://medallovip-default-rtdb.firebaseio.com"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar la instancia para usar en otros módulos (como login-control.js o registro-control.js)
export { app };
