# Carga las variables del archivo .env y levanta el backend de Spring Boot.
# Uso:  ./run.ps1
$ErrorActionPreference = "Stop"

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    Write-Error "No existe el archivo .env. Crealo a partir de .env (con tu password)."
    exit 1
}

# Lee cada línea NOMBRE=VALOR (ignora comentarios y líneas vacías)
Get-Content $envFile | ForEach-Object {
    $linea = $_.Trim()
    if ($linea -and -not $linea.StartsWith("#")) {
        $idx = $linea.IndexOf("=")
        if ($idx -gt 0) {
            $nombre = $linea.Substring(0, $idx).Trim()
            $valor  = $linea.Substring($idx + 1).Trim()
            Set-Item -Path "Env:$nombre" -Value $valor
        }
    }
}

if (-not $env:SUPABASE_DB_PASSWORD) {
    Write-Error "Falta SUPABASE_DB_PASSWORD en el .env. Agregala y volvé a correr."
    exit 1
}

Write-Host "Variables cargadas. Levantando Spring Boot..." -ForegroundColor Green
mvn spring-boot:run
