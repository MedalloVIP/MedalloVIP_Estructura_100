import { inicializarControlMicrofono } from "./audio-control.js";

// Después de crear los tracks y adjuntar el video
inicializarControlMicrofono(audioTrack, btnMic);// Código principal de transmisión


import { iniciarMedicionVelocidad } from "./velocidad-control.js";

const velocidadEl = document.getElementById("velocidad");
iniciarMedicionVelocidad(velocidadEl);


import { mostrarResolucion } from "./resolucion-control.js";

const resolucionEl = document.getElementById("resolucion");

// Después de conectar y obtener videoTrack:
mostrarResolucion(videoTrack, resolucionEl);


import { iniciarModoDinamico } from "./modo-control.js";
iniciarModoDinamico("btnModo");
