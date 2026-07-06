// Génère un QR code (terminal + PNG) pour l'URL de l'APK.
// Usage : node scripts/make-qr.mjs "<url-apk>"
import QRCode from 'qrcode';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/make-qr.mjs <url>');
  process.exit(1);
}

QRCode.toString(url, { type: 'terminal', small: true }, (err, str) => {
  if (err) { console.error(err); process.exit(1); }
  console.log(str);
  console.log('\nLien direct APK :\n' + url + '\n');
});

QRCode.toFile('scripts/apk-qr.png', url, { width: 512, margin: 2 }, (err) => {
  if (err) console.error('PNG error:', err);
  else console.log('QR PNG écrit : scripts/apk-qr.png');
});
