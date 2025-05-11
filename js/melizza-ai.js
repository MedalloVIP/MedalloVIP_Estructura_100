// melizza-ai.js

import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.20.0/+esm";

// Configura tu API Key (REEMPLAZAR)
const openai = new OpenAI({
  apiKey: "sk-PLACE-YOUR-KEY-HERE", // Coloca tu clave real aquí
  dangerouslyAllowBrowser: true
});

// Instancia de voz y reconocimiento
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES";
recognition.continuous = false;

const synth = window.speechSynthesis;
let listening = false;

// Crear botón si no existe
const melizzaBtn = document.getElementById("melizzaBtn") || crearBotonMelizza();

melizzaBtn.onclick = () => {
  if (!listening) {
    recognition.start();
    mostrarEstado("Escuchando...");
    listening = true;
  }
};

recognition.onresult = async (event) => {
  const texto = event.results[0][0].transcript;
  mostrarEstado("Pensando...");
  const respuesta = await responderConIA(texto);
  hablar(respuesta);
  listening = false;
};

recognition.onerror = (e) => {
  console.error("Error de voz:", e);
  mostrarEstado("Error al escuchar");
  listening = false;
};

async function responderConIA(texto) {
  try {
    const chat = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres Melizza, una asistente AI coqueta, sensual e inteligente que ayuda en una plataforma de streaming para adultos, con voz encantadora."
        },
        {
          role: "user",
          content: texto
        }
      ],
      model: "gpt-4"
    });
    return chat.choices[0].message.content;
  } catch (error) {
    console.error("Error IA:", error);
    return "Lo siento, ocurrió un error sexy pero técnico...";
  }
}

function hablar(texto) {
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-ES";
  voz.rate = 1;
  voz.pitch = 1.2;
  synth.speak(voz);
  mostrarEstado("Melizza dijo: " + texto);
}

function mostrarEstado(mensaje) {
  let contenedor = document.getElementById("melizzaEstado");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "melizzaEstado";
    contenedor.style = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: rgba(0,0,0,0.8);
      color: #00ffff;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      z-index: 9999;
      font-family: sans-serif;
    `;
    document.body.appendChild(contenedor);
  }
  contenedor.textContent = mensaje;
}

function crearBotonMelizza() {
  const btn = document.createElement("button");
  btn.textContent = "Habla con Melizza";
  btn.id = "melizzaBtn";
  btn.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff00ff;
    color: white;
    padding: 14px 24px;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 0 10px #ff00ff;
  `;
  document.body.appendChild(btn);
  return btn;
}
