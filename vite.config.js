import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import fg from 'fast-glob';

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(root, 'src');

// Chaque HTML de src/ (hors partials) est une entrée : le chemin de sortie
// reproduit exactement le chemin source, donc les URLs publiques ne changent pas.
const input = Object.fromEntries(
  fg
    .sync('**/index.html', { cwd: srcDir, ignore: ['partials/**', 'styleguide/**'] })
    .concat(fg.sync('styleguide/index.html', { cwd: srcDir }))
    .map((file) => [file.replace(/\/?index\.html$/, '') || 'main', resolve(srcDir, file)])
);
// page 404 signature (Vercel sert dist/404.html pour toute route inconnue)
input['404'] = resolve(srcDir, '404.html');

// Le hero de l'accueil précharge son module 3D (et ses dépendances) dès la lecture
// de la page, sans attendre que main.js l'importe : le script en ligne du hero lit
// ces adresses et ne lance le préchargement que si le film sera joué.
const PRELOAD_MARK = '__HERO_FILM_PRELOAD__';
function heroFilmPreload() {
  return {
    name: 'hero-film-preload',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle || !html.includes(PRELOAD_MARK)) return html;
        const chunk = Object.values(ctx.bundle).find((c) => c.type === 'chunk' && c.facadeModuleId?.endsWith('/js/modules/hero-film.js'));
        if (!chunk) return html;
        const urls = [chunk.fileName, ...chunk.imports].map((f) => '/' + f).join(' ');
        return html.replace(PRELOAD_MARK, urls);
      },
    },
  };
}

export default defineConfig({
  root: srcDir,
  publicDir: resolve(root, 'public'),
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(srcDir, 'partials'),
    }),
    heroFilmPreload(),
  ],
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input },
  },
});
