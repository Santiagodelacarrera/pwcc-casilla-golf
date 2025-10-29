# Script para configurar ngrok
# Reemplaza TU_TOKEN_AQUI con tu token de ngrok.com

Write-Host "🔧 Configurando ngrok..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Necesitas tu token de https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor Yellow
Write-Host ""
$token = Read-Host "Ingresa tu token de ngrok"

if ($token) {
    Write-Host "Configurando ngrok con el token..." -ForegroundColor Green
    ngrok config add-authtoken $token
    Write-Host ""
    Write-Host "✅ Ngrok configurado correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ahora puedes ejecutar:" -ForegroundColor Cyan
    Write-Host "  ngrok http 3000" -ForegroundColor Yellow
} else {
    Write-Host "❌ No se ingresó token. Cancelandoperando..." -ForegroundColor Red
}

