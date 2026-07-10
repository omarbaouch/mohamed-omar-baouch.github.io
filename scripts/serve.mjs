// Mini serveur statique sans dépendance, pour les scripts de vérification.
// Usage : node scripts/serve.mjs <dirRacine> [port]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, join, extname, normalize } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const port = Number(process.argv[3] ?? 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = normalize(join(root, pathname));
    if (!file.startsWith(root)) throw new Error('forbidden');
    let body;
    try {
      body = await readFile(file);
    } catch {
      // fallback style vercel : /chemin -> /chemin/index.html
      body = await readFile(join(file, 'index.html'));
      pathname += '/index.html';
    }
    res.writeHead(200, { 'content-type': MIME[extname(pathname)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
  }
}).listen(port, () => console.log(`serve: ${root} → http://localhost:${port}`));
