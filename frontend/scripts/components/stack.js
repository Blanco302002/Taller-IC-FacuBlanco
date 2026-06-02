// ===== Componente: Stack (data-driven, tarjetas por categoría) =====
const CATEGORIAS = [
  {
    icono: "☕",
    nombre: "Backend",
    items: [
      { tech: "Java", ver: "21" },
      { tech: "Spring Boot", ver: "3.3.5" },
      { tech: "Spring Data JPA", ver: "" },
    ],
  },
  {
    icono: "🗄️",
    nombre: "Persistencia",
    items: [
      { tech: "PostgreSQL", ver: "" },
      { tech: "Supabase", ver: "" },
    ],
  },
  {
    icono: "🧪",
    nombre: "Testing & Calidad",
    items: [
      { tech: "JUnit", ver: "5" },
      { tech: "Testcontainers", ver: "" },
      { tech: "JaCoCo", ver: "" },
    ],
  },
  {
    icono: "⚙️",
    nombre: "Build & Automatización",
    items: [
      { tech: "Maven", ver: "" },
      { tech: "GitHub Actions", ver: "" },
    ],
  },
];

function catCard({ icono, nombre, items }) {
  const lis = items
    .map(
      ({ tech, ver }) => `
        <li class="stack__item">
          <span class="stack__pip"></span>
          <span class="stack__tech">${tech}</span>
          ${ver ? `<span class="stack__ver">${ver}</span>` : ""}
        </li>`
    )
    .join("");

  return `
    <article class="stack__cat">
      <div class="stack__head">
        <span class="stack__ico">${icono}</span>
        <span class="stack__cat-name">${nombre}</span>
      </div>
      <ul class="stack__items">${lis}</ul>
    </article>
  `;
}

export function Stack() {
  const el = document.createElement("section");
  el.className = "stack";
  el.id = "stack";
  el.innerHTML = `
    <div class="container">
      <h2>Stack tecnológico</h2>
      <p class="sub">Las herramientas que mueven el proyecto, por capa.</p>
      <div class="stack__grid">
        ${CATEGORIAS.map(catCard).join("")}
      </div>
    </div>
  `;
  return el;
}
