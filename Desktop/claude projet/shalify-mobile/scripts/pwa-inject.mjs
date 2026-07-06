// Injecte le PWA dans l'export web Expo (dist/) pour rendre shalify.app/app
// installable « Ajouter à l'écran d'accueil » sur Android, sans APK.
//
// À lancer APRÈS `npx expo export --platform web`, avant de copier dist ->
// shalify/public/app. L'export régénère index.html, donc on réinjecte à chaque fois.
//
// Ce que ça fait :
//  1. écrit dist/manifest.webmanifest (name, icônes, standalone, couleurs Shalify)
//  2. écrit dist/sw-app.js (service worker minimal, offline de base, scope /app/)
//  3. injecte dans <head> de dist/index.html : lien manifest, theme-color,
//     apple-touch-icon, et l'enregistrement inline du service worker.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const INDEX = join(DIST, 'index.html');

if (!existsSync(INDEX)) {
  console.error('[pwa-inject] dist/index.html introuvable. Lance d\'abord: npx expo export --platform web');
  process.exit(1);
}

// 1) Manifest — les icônes existent déjà sur le site (public/icons/shalify-*.png).
const manifest = {
  name: 'Shalify',
  short_name: 'Shalify',
  description: 'La marketplace humaine. Partage ta valeur, apprends, crée.',
  start_url: '/app/index.html',
  scope: '/app/',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#13241A',
  theme_color: '#3D6B4F',
  lang: 'fr',
  dir: 'auto',
  icons: [
    { src: '/icons/shalify-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icons/shalify-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icons/shalify-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: '/icons/shalify-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
writeFileSync(join(DIST, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

// 2) Service worker minimal — cache-first sur les assets /app/_expo, réseau pour l'API.
const sw = `// Service worker Shalify /app — offline de base. Scope /app/.
const CACHE = 'shalify-app-v1';
const CORE = ['/app/index.html', '/app/manifest.webmanifest', '/app/favicon.ico'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // API : toujours le réseau (données réelles fraîches), jamais de cache.
  if (url.pathname.startsWith('/api/')) return;

  // Assets figés de l'export Expo : cache-first (rapide + offline).
  if (url.pathname.startsWith('/app/_expo') || url.pathname.startsWith('/app/assets')) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  // Navigation dans /app : réseau d'abord, repli sur l'index en cache si hors ligne.
  if (req.mode === 'navigate' && url.pathname.startsWith('/app')) {
    e.respondWith(fetch(req).catch(() => caches.match('/app/index.html')));
    return;
  }
});
`;
writeFileSync(join(DIST, 'sw-app.js'), sw, 'utf8');

// 3) Injection dans <head> de dist/index.html.
let html = readFileSync(INDEX, 'utf8');

const HEAD_TAGS = `
    <link rel="manifest" href="/app/manifest.webmanifest" />
    <meta name="theme-color" content="#3D6B4F" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Shalify" />
    <link rel="apple-touch-icon" href="/icons/shalify-192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/shalify-180.png" />
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/app/sw-app.js', { scope: '/app/' }).catch(function () {});
        });
      }
    </script>
`;

if (html.includes('manifest.webmanifest')) {
  console.log('[pwa-inject] balises PWA déjà présentes, rien à faire.');
} else {
  // On insère juste avant la fermeture du </head>.
  html = html.replace('</head>', `${HEAD_TAGS}  </head>`);
  writeFileSync(INDEX, html, 'utf8');
  console.log('[pwa-inject] balises PWA injectées dans dist/index.html.');
}

console.log('[pwa-inject] OK — manifest.webmanifest + sw-app.js écrits dans dist/.');
