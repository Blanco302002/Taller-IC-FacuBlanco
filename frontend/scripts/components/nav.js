// ===== Componente: Nav =====
export function Nav() {
  const el = document.createElement("nav");
  el.className = "nav";
  el.innerHTML = `
    <div class="container">
      <div class="nav__brand"><span class="nav__dot"></span> Taller IC</div>
      <div class="nav__links">
        <a href="#stack">Stack</a>
        <a href="#demo">Demo</a>
        <a href="#contacto">Contacto</a>
      </div>
    </div>
  `;
  return el;
}
