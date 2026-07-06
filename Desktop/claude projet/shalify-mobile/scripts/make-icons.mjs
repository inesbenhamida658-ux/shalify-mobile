// Icônes de l'app — logo validé "Style 3" : S doré serif, cercle fin, fond vert émeraude -> nuit.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '..', 'assets');

const defs = `
  <radialGradient id="bg" cx="50%" cy="38%" r="72%">
    <stop offset="0" stop-color="#2A5238"/><stop offset="0.52" stop-color="#173324"/><stop offset="1" stop-color="#0a1810"/>
  </radialGradient>
  <radialGradient id="glow" cx="50%" cy="52%" r="42%">
    <stop offset="0" stop-color="#E7CE82" stop-opacity="0.20"/><stop offset="1" stop-color="#E7CE82" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="subtle" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4a7a58" stop-opacity="0.12"/><stop offset="0.55" stop-color="#4a7a58" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.10"/>
  </linearGradient>
  <linearGradient id="gold" x1="0.2" y1="0" x2="0.8" y2="1">
    <stop offset="0" stop-color="#F4E4AC"/><stop offset="0.45" stop-color="#DcBa63"/><stop offset="1" stop-color="#A9822A"/>
  </linearGradient>`;

// mark = cercle fin + S doré (Georgia serif). scale/translate pour la zone sûre des icônes adaptives.
const mark = (scale = 1) => {
  const t = (120 * (1 - scale)) / 2;
  return `<g transform="translate(${t},${t}) scale(${scale})">
    <circle cx="60" cy="60" r="43" fill="none" stroke="#D9B85E" stroke-width="1.3"/>
    <text x="60" y="63" text-anchor="middle" dominant-baseline="central" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="600" fill="url(#gold)">S</text>
  </g>`;
};

function svgFull(size, scale = 1) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120">
  <defs>${defs}</defs>
  <rect width="120" height="120" fill="url(#bg)"/>
  <rect width="120" height="120" fill="url(#glow)"/>
  <rect width="120" height="120" fill="url(#subtle)"/>
  ${mark(scale)}</svg>`;
}
// splash : marque seule sur fond transparent (l'écran de démarrage est déjà vert nuit)
function svgMarkOnly(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120">
  <defs>${defs}</defs>${mark(1)}</svg>`;
}

async function png(svg, out) {
  await sharp(Buffer.from(svg)).png().toFile(join(ASSETS, out));
  console.log('OK', out);
}

await png(svgFull(1024, 1), 'icon.png');
await png(svgFull(1024, 0.82), 'adaptive-icon.png'); // zone sûre Android
await png(svgMarkOnly(1024), 'splash-icon.png');
await png(svgFull(196, 1), 'favicon.png');
console.log('Icônes Style 3 générées.');
