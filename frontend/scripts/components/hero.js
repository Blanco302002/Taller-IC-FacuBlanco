// ===== Componente: Hero =====
const REPO_URL = "https://github.com/Blanco302002/Taller-IC-FacuBlanco";

export function Hero() {
  const el = document.createElement("header");
  el.className = "hero";
  el.innerHTML = `
    <div class="container">
      <span class="hero__badge">★ Taller de Integración Continua</span>
      <h1 class="hero__title">
        CRUD de <span class="grad">Productos</span>
      </h1>
      <div class="hero__cta">
        <a class="btn btn-primary" href="#demo">▶ Probar la demo</a>
        <a class="btn btn-ghost" href="${REPO_URL}" target="_blank" rel="noopener">⎇ Ver en GitHub</a>
      </div>
    </div>
  `;
  return el;
}
