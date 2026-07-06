# ============================================================
#  SHALIFY - Exclusion Windows Defender (a lancer UNE seule fois)
#  But : empecher Defender de supprimer les fichiers de l'appli
#        (cause des erreurs "expo n'est pas reconnu" / Metro fige).
#
#  COMMENT LANCER :
#  1. Clic droit sur ce fichier > "Executer avec PowerShell"
#     (ou : clic droit > Executer en tant qu'administrateur)
#  2. Accepter la fenetre bleue (UAC) si elle s'affiche.
#  3. C'est tout. A faire UNE fois.
# ============================================================

$dossier = "C:\Users\PC\Desktop\claude projet\shalify-mobile"

# Relance le script en admin si besoin
$estAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $estAdmin) {
    Write-Host "Demande des droits administrateur..." -ForegroundColor Yellow
    Start-Process powershell.exe "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

try {
    Add-MpPreference -ExclusionPath $dossier -ErrorAction Stop
    Add-MpPreference -ExclusionProcess "node.exe" -ErrorAction SilentlyContinue
    Write-Host ""
    Write-Host "OK ! Le dossier est maintenant exclu de Windows Defender :" -ForegroundColor Green
    Write-Host "   $dossier" -ForegroundColor Green
    Write-Host ""
    Write-Host "Defender ne supprimera plus les fichiers de l'appli." -ForegroundColor Green
    Write-Host "Tu peux fermer cette fenetre." -ForegroundColor Cyan
} catch {
    Write-Host "Erreur : $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Verifie que tu as bien accepte les droits administrateur." -ForegroundColor Red
}
Write-Host ""
Read-Host "Appuie sur Entree pour fermer"
