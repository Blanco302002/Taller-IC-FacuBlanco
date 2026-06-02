// ===== Componente: Contact (footer con datos de contacto) =====
// NOTA: completá las URLs de LinkedIn e Instagram con tus usuarios reales.
const CONTACTOS = [
  {
    icono: "✉️",
    label: "Email",
    valor: "facundo302002@gmail.com",
    href: "mailto:facundo302002@gmail.com",
  },
  {
    icono: "in",
    label: "LinkedIn",
    valor: "Facundo Blanco",
    href: "https://www.linkedin.com/",
  },
  {
    icono: "◎",
    label: "Instagram",
    valor: "@tu_usuario",
    href: "https://instagram.com/",
  },
];

function tarjeta({ icono, label, valor, href }) {
  return `
    <a class="contact__card" href="${href}" target="_blank" rel="noopener">
      <span class="contact__ico">${icono}</span>
      <span class="contact__meta">
        <span class="contact__label">${label}</span>
        <span class="contact__valor">${valor}</span>
      </span>
    </a>
  `;
}

export function Contact() {
  const el = document.createElement("footer");
  el.className = "contact";
  el.id = "contacto";
  el.innerHTML = `
    <div class="container">
      <h2>Contacto</h2>
      <p class="sub">¿Hablamos? Te dejo mis canales.</p>
      <div class="contact__grid">
        ${CONTACTOS.map(tarjeta).join("")}
      </div>
      <p class="contact__copy">© ${new Date().getFullYear()} Facundo Blanco · Taller de Integración Continua</p>
    </div>
  `;
  return el;
}
