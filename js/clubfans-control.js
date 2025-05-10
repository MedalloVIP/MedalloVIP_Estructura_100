const clubStatus = document.getElementById("clubStatus");
const subscribeBtn = document.getElementById("subscribeBtn");

let isSubscribed = false;

function actualizarEstadoClub() {
  clubStatus.textContent = isSubscribed
    ? "Miembro del Club de Fans (Nivel Oro)"
    : "No eres miembro del Club de Fans";
  clubStatus.style.color = isSubscribed ? "#00ff00" : "#ff4444";
  subscribeBtn.textContent = isSubscribed ? "Cancelar Suscripción" : "Unirse al Club";
  subscribeBtn.style.backgroundColor = isSubscribed ? "#ff0044" : "#00ffff";
}

subscribeBtn.onclick = () => {
  isSubscribed = !isSubscribed;
  actualizarEstadoClub();
  // Aquí se puede guardar en Firebase si se desea persistencia
};

actualizarEstadoClub();
