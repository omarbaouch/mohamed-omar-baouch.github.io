// Extraction one-shot du dictionnaire i18n de l'ancien script.js vers src/i18n/{fr,en}.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const src = readFileSync('public/assets/js/script.js', 'utf8');
const start = src.indexOf('const translations = {');
const end = src.indexOf('};', start) + 1; // premier objet, fermé avant blogTranslations
const code = src.slice(start, end).replace('const translations =', 'globalThis.__t =');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code, ctx);
const { fr, en } = ctx.__t;
mkdirSync('src/i18n', { recursive: true });
writeFileSync('src/i18n/fr.json', JSON.stringify(fr, null, 2) + '\n');
writeFileSync('src/i18n/en.json', JSON.stringify(en, null, 2) + '\n');
console.log('fr:', Object.keys(fr).length, 'clés — en:', Object.keys(en).length, 'clés');
const missing = Object.keys(fr).filter((k) => !(k in en));
if (missing.length) console.log('absentes en EN :', missing.join(', '));
