# MedalloVIP – Plataforma de Streaming y Comunidad Exclusiva

**MedalloVIP** es una plataforma web avanzada para transmisión en vivo, comercio digital y comunidad privada de modelos, usuarios, estudios y partners. Diseñada para el entretenimiento adulto de forma segura, profesional y con una economía basada en tokens.

---

## 🚀 Características Principales

- Transmisiones en vivo con interacción en tiempo real (LiveKit + WebRTC)
- Club de Fans VIP por modelo
- Carrito de compras, tienda, recompensas y metas
- Retiros verificados para modelos y estudios
- Chat privado, reacciones, ranking, bonificaciones y tokens
- Integración con IA (Melizza): asistente virtual con voz y respuesta inteligente
- Paneles personalizados según el rol: Usuario | Modelo | Estudio | Partner
- Seguridad avanzada, verificación de identidad y protección de cuenta
- Soporte multilenguaje, configuración de temas, velocidad y accesibilidad

---

## 📁 Estructura del Proyecto

- `/js` – Más de 60 módulos funcionales como:
  - `login-control.js`, `perfil-control.js`, `chat-control.js`
  - `tokens-control.js`, `retiros-control.js`, `ranking-control.js`
  - `melizza-control.js` (asistente IA), `moderacion-control.js`, y más.

- `/html` – Archivos de interfaz separados por funciones:
  - `login.html`, `panel.html`, `transmitir.html`, `ver-transmision.html`, `perfil.html`, `tokens.html`, etc.

---

## 🧠 Tecnologías Usadas

- **HTML5 + JavaScript (ES Modules)**
- **Tailwind CSS** *(opcional para interfaz rápida y responsiva)*
- **Firebase** – Auth, Firestore, Realtime DB y Storage
- **OpenAI GPT-4** – Melizza (asistente virtual IA)
- **LiveKit** – Transmisión en vivo con WebRTC
- **Stripe / Solana / MedalloCoin** – Monetización y economía interna

---

## ✅ Cómo Ejecutar

```bash
git clone https://github.com/tuusuario/medallovip.git
cd medallovip
