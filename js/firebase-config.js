// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7pcnepnpTngr3et84W_rXcQ6GQDKTlU4",
  authDomain: "medallovip-bae9f.firebaseapp.com",
  projectId: "medallovip-bae9f",
  storageBucket: "medallovip-bae9f.appspot.com",
  messagingSenderId: "97246531560",
  appId: "1:97246531560:web:64be84a8c9dece26741e5d",
  measurementId: "G-BCLX842R83"
};

const app = initializeApp(firebaseConfig);
export { app };
