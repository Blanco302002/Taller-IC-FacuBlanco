# Taller IC - Facu Blanco

Trabajo práctico de **Integración Continua** para Ingeniería y Calidad de Software.

Demuestra un pipeline completo: build, tests automatizados (unitarios y de
integración contra una base de datos real efímera) e inspección de código.

## Stack tecnológico

| Pieza | Herramienta |
|-------|-------------|
| Lenguaje | Java 21 (LTS) |
| Build | Maven |
| Framework | Spring Boot 3 |
| Persistencia | Spring Data JPA (PostgreSQL) |
| Base de datos | Supabase (PostgreSQL) en runtime |
| Tests unitarios | JUnit 5 + Mockito |
| Tests de integración | Testcontainers (PostgreSQL efímero) |
| Servidor de IC | GitHub Actions |
| Inspección de código | SonarCloud + JaCoCo (cobertura) |
| Repositorio | GitHub |

## Estructura

```
src/main/java/com/talleric/
  Application.java            arranque de Spring Boot
  model/Producto.java         entidad JPA
  repository/ProductoRepository.java   CRUD (Spring Data)
  service/ProductoService.java         lógica de negocio (validaciones)
src/test/java/com/talleric/
  service/ProductoServiceTest.java     tests unitarios (sin BD)
  repository/ProductoRepositoryIT.java tests de integración (Testcontainers)
```

## Tests: dos niveles

- **Unitarios** (`*Test`): rápidos, sin base de datos (el repositorio es un mock).
  Corren con `mvn test`.
- **Integración** (`*IT`): Testcontainers levanta un PostgreSQL real y descartable
  en Docker, aplica el esquema y verifica el CRUD. Corren con `mvn verify`.
  **No tocan la base real**: la BD de producción (Supabase) nunca se usa en los tests.

## Cómo correr el proyecto

### Requisitos
- JDK 21
- Maven
- Docker (solo para los tests de integración)

### Comandos
```bash
mvn test      # solo unitarios (no requiere Docker)
mvn verify    # unitarios + integración (requiere Docker corriendo)
```

### Conexión a Supabase (runtime)
La app lee la conexión de variables de entorno (nunca hardcodeadas):
```
SUPABASE_DB_URL=jdbc:postgresql://<host>:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=<tu-password>
```

### Nota para Windows + Docker Desktop reciente
Si los tests de integración fallan con `Could not find a valid Docker environment`
(error 400), el cliente Docker de Java necesita la versión de API. El proyecto ya
la fija en un perfil de Maven activado solo en Windows (`api.version=1.44`).
Variables locales recomendadas:
```
DOCKER_HOST=tcp://localhost:2375   (con "Expose daemon on tcp..." activado en Docker Desktop)
```

## Integración continua

En cada push o pull request a `main`, GitHub Actions (`.github/workflows/ci.yml`):
1. Compila el proyecto con Java 21.
2. Corre los tests unitarios y de integración (`mvn verify`).
3. Si está configurado el secret `SONAR_TOKEN`, ejecuta el análisis de SonarCloud.

### Configurar SonarCloud
1. Entrar a [sonarcloud.io](https://sonarcloud.io) e importar el repositorio.
2. Generar un token y cargarlo como secret `SONAR_TOKEN` en GitHub.
3. Completar `sonar.organization` y `sonar.projectKey` en el `pom.xml`.
