// Mini serveur statique pour tester l'appli-web exportee (dossier dist/)
// Sert dist/ SOUS le chemin /app (car export avec baseUrl "/app").
// But : verifier le rendu reel via l'apercu integre, sans Chrome ni Android.
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = 5055;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/' || urlPath === '/app' || urlPath === '/app/') {
    urlPath = '/app/index.html';
  }
  // enlever le prefixe /app pour retrouver le fichier dans dist/
  let rel = urlPath.startsWith('/app/') ? urlPath.slice('/app/'.length) : urlPath.slice(1);
  let filePath = path.join(DIST, rel);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // repli SPA : servir index.html pour les routes internes
      filePath = path.join(DIST, 'index.html');
    }
    fs.readFile(filePath, (e, data) => {
      if (e) { res.writeHead(404); res.end('introuvable'); return; }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
});

server.listen(PORT, () => console.log('Apercu appli-web sur http://localhost:' + PORT + '/app/index.html'));
