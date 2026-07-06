# ============================================================
#  SHALIFY - Reparation + verification automatique de l'appli
#  Lance-le quand l'appli "ne marche plus" / "expo pas reconnu".
#  Il repare tout seul ce que Defender a casse, puis verifie.
#
#  COMMENT LANCER : clic droit > "Executer avec PowerShell"
# ============================================================

$projet = "C:\Users\PC\Desktop\claude projet\shalify-mobile"
Set-Location $projet
Write-Host "=== SHALIFY : reparation + verification ===" -ForegroundColor Cyan

# 1) Verifie si le coeur d'Expo est present
$cliOk = (Test-Path "$projet\node_modules\expo\node_modules\@expo\cli\build\bin\cli.js") -or (Test-Path "$projet\node_modules\@expo\cli\build\bin\cli.js")

if (-not $cliOk) {
    Write-Host "Expo casse par Defender. Reparation en cours (peut prendre 5-10 min)..." -ForegroundColor Yellow
    if (Test-Path "$projet\node_modules\expo\node_modules\@expo\cli") { Remove-Item "$projet\node_modules\expo\node_modules\@expo\cli" -Recurse -Force -ErrorAction SilentlyContinue }
    for ($i=1; $i -le 5; $i++) {
        Write-Host "  -> passe $i d'installation..." -ForegroundColor DarkGray
        npm install --no-audit --no-fund --no-save 2>&1 | Out-Null
        if ((Test-Path "$projet\node_modules\expo\node_modules\@expo\cli\build\bin\cli.js") -or (Test-Path "$projet\node_modules\@expo\cli\build\bin\cli.js")) { break }
    }
}

# 2) Verifie que le code compile (0 erreur)
Write-Host "Verification du code (typecheck)..." -ForegroundColor Cyan
node "$projet\node_modules\typescript\bin\tsc" --noEmit --project "$projet\tsconfig.check.json"
if ($?) { Write-Host "OK : le code compile, 0 erreur." -ForegroundColor Green }
else { Write-Host "Des erreurs de code existent (voir au-dessus)." -ForegroundColor Red }

# 3) Diagnostic Expo
Write-Host "Diagnostic Expo..." -ForegroundColor Cyan
npx --yes expo-doctor 2>&1 | Select-Object -Last 8

Write-Host ""
Write-Host "=== Termine. ===" -ForegroundColor Green
Write-Host "Pour mettre l'appli sur ton iPhone : lance  build-iphone.ps1" -ForegroundColor Cyan
Read-Host "Appuie sur Entree pour fermer"
