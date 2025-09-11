import fs from 'fs-extra';
import path from 'path';
import dayjs from 'dayjs';
import { extract } from '@extractus/article-extractor';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, '..');
const KEYWORDS_FILE = path.join(ROOT, 'keywords.json');
const POSTS_DIR = path.join(ROOT, 'blog'); // Le même dossier que les autres articles

async function searchGoogle(query) {
    // Dans un environnement réel, vous utiliseriez une API de recherche comme celle de Google,
    // que vous appelleriez avec une clé d'API.
    // Pour cet exemple, nous allons simuler une recherche en créant un contenu de base.
    console.log(`Recherche simulée pour : "${query}"`);
    return [
        { title: `Guide complet sur ${query}`, content: `Ceci est un contenu détaillé expliquant les meilleures pratiques pour ${query}.` },
        { title: `Les défis de ${query}`, content: `Analyse des problématiques courantes rencontrées avec ${query}.` },
    ];
}

function selectKeyword(keywords) {
    // Sélectionne un mot-clé qui n'a pas été utilisé récemment
    const now = dayjs();
    let bestKeyword = keywords[0];
    let maxDays = 0;
    
    for (const kw of keywords) {
        const lastUsed = kw.lastUsed ? dayjs(kw.lastUsed) : dayjs('1970-01-01');
        const daysSinceLastUse = now.diff(lastUsed, 'day');
        if (daysSinceLastUse > maxDays) {
            maxDays = daysSinceLastUse;
            bestKeyword = kw;
        }
    }
    return bestKeyword;
}

async function main() {
    const keywordsData = await fs.readJson(KEYWORDS_FILE);
    const keywordFr = selectKeyword(keywordsData.fr);
    const keywordEn = keywordsData.en.find(k => k.id === keywordFr.id); // Trouver l'équivalent anglais

    const searchResults = await searchGoogle(keywordEn.keyword); // Recherche en anglais pour de meilleurs résultats
    
    const dateStr = dayjs().format('YYYY-MM-DD');
    const slug = `article-${keywordFr.keyword.toLowerCase().replace(/\s+/g, '-')}`;
    const postDir = path.join(POSTS_DIR, slug);
    await fs.ensureDir(postDir);

    const title = `Article de fond : ${keywordFr.keyword}`;
    let content = `<h1>${title}</h1>\n<p><em>Article généré le ${dateStr}, basé sur le mot-clé : "${keywordFr.keyword}".</em></p>\n\n`;
    
    for (const result of searchResults) {
        content += `<h2>${result.title}</h2>\n<p>${result.content}</p>\n\n`;
    }
    
    // Mettre à jour la date d'utilisation du mot-clé
    keywordFr.lastUsed = dateStr;
    await fs.writeJson(KEYWORDS_FILE, keywordsData, { spaces: 2 });
    
    const postFilePath = path.join(postDir, 'index.html');
    await fs.writeFile(postFilePath, content);
    
    console.log(`✅ Article de fond généré pour le mot-clé "${keywordFr.keyword}" dans ${postDir}`);
}

main().catch(console.error);
