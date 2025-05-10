// marketing-control.js

const banner = document.getElementById("bannerPromo");
const codigo = document.getElementById("codigoReferido");
const link = document.getElementById("linkCompartir");
const btnCopiar = document.getElementById("copiarBtn");

// Datos simulados (en el sistema real vendrán del perfil del modelo)
const usuario = "ModelVIP001";
const baseURL = "https://medallovip.live/modelo/";
const codigoGenerado = `${usuario}-ref2025`;

if (banner) {
  banner.innerHTML = `
    <img src="https://cdn.medallovip.live/banners/banner-modelo.png" alt="Promo" style="width:100%; border-radius: 10px;"/>
    <p style="margin-top: 10px;">Tu código de referido:</p>
    <input type="text" id="codigoInput" value="${codigoGenerado}" readonly style="width:100%; padding:8px; border:none; border-radius:6px;"/>
    <button id="copiarBtn" style="margin-top:10px; background:#00ffff; color:black; padding:10px; border:none; border-radius:6px; font-weight:bold;">Copiar código</button>
    <p style="margin-top:10px;">Tu enlace para compartir:</p>
    <input type="text" id="linkCompartir" value="${baseURL + usuario}" readonly style="width:100%; padding:8px; border:none; border-radius:6px;"/>
  `;
}

if (btnCopiar) {
  btnCopiar.onclick = () => {
    const input = document.getElementById("codigoInput");
    input.select();
    document.execCommand("copy");
    alert("¡Código copiado!");
  };
}
