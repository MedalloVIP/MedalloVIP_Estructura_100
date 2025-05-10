import { inicializarControlMicrofono } from "./audio-control.js";

// Después de crear los tracks y adjuntar el video
inicializarControlMicrofono(audioTrack, btnMic);// Código principal de transmisión


import { iniciarMedicionVelocidad } from "./velocidad-control.js";

const velocidadEl = document.getElementById("velocidad");
iniciarMedicionVelocidad(velocidadEl);
