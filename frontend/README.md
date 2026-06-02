# Frontend · Taller IC

La "cara" del proyecto: una landing estática (sin build step) que presenta el
proyecto e incluye una **demo CRUD de Productos** funcional.

## Estructura

```
frontend/
├── index.html              # shell: enlaza los CSS y carga main.js
├── styles/                 # un CSS por componente
│   ├── theme.css           # variables, reset, layout y botones compartidos
│   ├── nav.css
│   ├── hero.css
│   ├── stack.css
│   └── demo.css
└── scripts/
    ├── api.js              # capa de datos (localStorage / API REST) + validaciones
    ├── components/         # un módulo por componente, cada uno se renderiza solo
    │   ├── nav.js
    │   ├── hero.js
    │   ├── stack.js        # data-driven: editás el array CATEGORIAS y listo
    │   └── demo.js
    └── main.js             # punto de entrada: monta los componentes en #app
```

## Probarla localmente

Usa **módulos ES**, así que hay que servirla por HTTP (abrir `index.html` con
doble clic / `file://` no funciona por las reglas de CORS):

```bash
# con Python
python -m http.server 5500 --directory frontend
# luego: http://localhost:5500
```

## Demo: consume la API REST

La demo pega contra la API real de Spring Boot (`ProductoController`):

- `GET /api/productos` · `POST /api/productos` · `DELETE /api/productos/{id}`

La URL del backend está en `scripts/api.js` → `API_BASE`
(por defecto `http://localhost:8080/api/productos`). Al deployar, cambiala por la
URL pública del backend.

> Para que la demo funcione necesitás el **backend corriendo** (ver más abajo).
> El controller ya habilita CORS (`@CrossOrigin`) para que el frontend lo consuma.

## Levantar el backend (con base de datos)

La app usa PostgreSQL (Supabase). Las credenciales se toman de variables de entorno
para no hardcodearlas. Desde la raíz del repo:

```powershell
$env:SUPABASE_DB_URL = "jdbc:postgresql://<host>:5432/postgres"
$env:SUPABASE_DB_USER = "postgres"
$env:SUPABASE_DB_PASSWORD = "<tu-password>"
mvn spring-boot:run
```

La API queda en `http://localhost:8080`. Después abrí el frontend (servido por HTTP)
y la demo ya opera contra la base.

## Deploy (CD)

Al ser 100% estático sirve cualquier hosting:

- **GitHub Pages**: publicar la carpeta `frontend/` (o moverla a `docs/`).
- **Netlify / Vercel / Cloudflare Pages**: publish directory = `frontend`, sin build command.

### Ejemplo de job de CD (GitHub Pages)

```yaml
# .github/workflows/cd.yml
name: CD - Deploy frontend
on:
  push:
    branches: [main]
    paths: ['frontend/**']
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend
      - id: deployment
        uses: actions/deploy-pages@v4
```
