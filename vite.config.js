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

export default defineConfig({
  root: srcDir,
  publicDir: resolve(root, 'public'),
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(srcDir, 'partials'),
    }),
  ],
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input },
  },
});
