// ===== Componente: Contact (footer simple, solo texto) =====
const CONTACTOS = [
  { label: "Email", valor: "facundo302002@gmail.com" },
  { label: "LinkedIn", valor: "Facundo Blanco" },
  { label: "Instagram", valor: "@tu_usuario" },
];

export function Contact() {
  const el = document.createElement("footer");
  el.className = "contact";
  el.id = "contacto";
  el.innerHTML = `
    <div class="container">
      <h2>Contacto</h2>
      <ul class="contact__list">
        ${CONTACTOS.map(
          ({ label, valor }) =>
            `<li><span class="contact__label">${label}:</span> ${valor}</li>`
        ).join("")}
      </ul>
      <p class="contact__copy">© ${new Date().getFullYear()} Facundo Blanco · Taller de Integración Continua</p>
    </div>
  `;
  return el;
}
