# ============================================================
#  SHALIFY - Construire l'appli pour ton iPhone (build EAS cloud)
#  Defender n'a AUCUN impact : tout se compile dans le cloud Expo.
#
#  COMMENT LANCER : clic droit > "Executer avec PowerShell"
#  La 1re fois, il te demandera de te connecter a ton compte Expo
#  (gratuit). C'est la seule chose que toi seule peux faire.
# ============================================================

$projet = "C:\Users\PC\Desktop\claude projet\shalify-mobile"
Set-Location $projet
Write-Host "=== SHALIFY : build iPhone (cloud EAS) ===" -ForegroundColor Cyan

# 1) Connexion Expo (s'ouvre seulement si pas deja connectee)
Write-Host "Verification de la connexion Expo..." -ForegroundColor Cyan
npx eas-cli whoami 2>$null
if (-not $?) {
    Write-Host "Connecte-toi a ton compte Expo (gratuit) :" -ForegroundColor Yellow
    npx eas-cli login
}

# 2) Lancer le build iOS (profil preview = installable sur ton tel)
Write-Host "Lancement du build iPhone dans le cloud..." -ForegroundColor Cyan
Write-Host "(Le build se fait sur les serveurs d'Expo - tu recevras un lien/QR quand c'est pret.)" -ForegroundColor DarkGray
npx eas-cli build --platform ios --profile preview

Write-Host ""
Write-Host "Quand le build est fini, Expo te donne un QR a scanner avec ton iPhone." -ForegroundColor Green
Read-Host "Appuie sur Entree pour fermer"
