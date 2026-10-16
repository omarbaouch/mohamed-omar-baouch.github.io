// Assistant IA — même contrat que l'ancien site : POST /api/ask-gemini
// { question, context, pageType, lang, history } -> { answer }.
// Le contexte est statique (plus de scraping de classes CSS), complété par les
// titres réels de la page sur le blog.

const ENDPOINT = '/api/ask-gemini';
const MAX_HISTORY = 16;

const PORTFOLIO_CONTEXT = `Informations sur le site personnel de Mohamed Omar Baouch :

## Profil
Ingénieur Plasturgie INSA de formation, basé à Strasbourg, qui travaille dans le PDM/PLM depuis 2020.
Site personnel : mémos techniques, calculateurs et articles. Aucune prestation n'est proposée sur ce site.
Langues : arabe (natal), français (bilingue), anglais (courant), allemand (débutant).

## Parcours
- Depuis 2023 : consultant PDM/PLM.
- 2021-2023 : ingénieur concepteur mécanique (défense & sécurité, transport).
- 2020 : spécialiste en ingénierie de conception (conteneurs sur mesure).

## Compétences
- Infrastructure PDM, SQL Server, réplication, workflows.
- Données produit : nomenclatures, migrations, modèles SOLIDWORKS.
- Outils : SOLIDWORKS PDM, SQL Server, Windows Server, Creo/Windchill, 3DEXPERIENCE.

## Formation
- 2018-2020 : Master Génie Mécanique, UFR MIM (conception et simulation numérique).
- 2015-2018 : Bachelor Plasturgie, INSA Strasbourg.
- 2013-2015 : Classes préparatoires CPGE PTSI, Lycée Couffignal.

Blog et mémos techniques : https://www.baouch.fr/blog/`;

function pageInfo() {
  const isBlog = document.body.classList.contains('blog-page') || location.pathname.startsWith('/blog');
  if (!isBlog) return { pageType: 'portfolio', context: PORTFOLIO_CONTEXT };
  const isArticle = Boolean(document.querySelector('article.blog-article header.blog-hero')) && location.pathname !== '/blog/';
  const title = document.title;
  const desc = document.querySelector('meta[name="description"]')?.content || '';
  const headings = Array.from(document.querySelectorAll('.article-section h2'))
    .map((h) => `- ${h.textContent.trim()}`)
    .join('\n');
  const pageCtx = `Page actuelle (${location.pathname}) : ${title}\n${desc}\n${headings ? `Plan de l'article :\n${headings}` : ''}`;
  return {
    pageType: isArticle ? 'blog-article' : 'blog-list',
    context: `${pageCtx}\n\n${PORTFOLIO_CONTEXT}`,
  };
}

// mini-rendu : échappe le HTML puis convertit les liens markdown et les sauts de ligne
function renderAnswer(text) {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const safe = /^(https?:\/\/|\/|#)/.test(url) ? url : '#';
      return `<a href="${safe}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

export function initChatbot() {
  const fab = document.getElementById('ai-fab');
  const panel = document.getElementById('ai-container');
  const closeBtn = document.getElementById('ai-close-btn');
  const chatBox = document.getElementById('ai-chat-box');
  const input = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const suggestions = document.getElementById('ai-suggestions');
  if (!fab || !panel || !chatBox || !input || !sendBtn) return;

  const history = [];
  const { pageType, context } = pageInfo();

  const setOpen = (open) => {
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  };
  fab.addEventListener('click', () => setOpen(panel.hidden));
  closeBtn?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) setOpen(false);
  });

  function addMessage(html, role) {
    const div = document.createElement('div');
    div.className = `ai-message ${role}`;
    div.innerHTML = `<p>${html}</p>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
  }

  let busy = false;
  async function handleSend(text) {
    const question = (text ?? input.value).trim();
    if (!question || busy) return;
    busy = true;
    sendBtn.disabled = true;
    input.value = '';
    suggestions?.remove();
    addMessage(renderAnswer(question), 'user');
    const loading = addMessage('<span class="ai-typing"><i></i><i></i><i></i></span>', 'assistant');

    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, context, pageType, lang, history: history.slice(-MAX_HISTORY) }),
      });
      const data = res.ok ? await res.json() : null;
      loading.remove();
      if (data?.answer) {
        addMessage(renderAnswer(data.answer), 'assistant');
        history.push({ role: 'user', content: question }, { role: 'assistant', content: data.answer });
        while (history.length > MAX_HISTORY) history.shift();
      } else {
        throw new Error('empty');
      }
    } catch {
      loading.remove();
      addMessage(
        lang === 'en'
          ? 'Sorry, something went wrong. Please try again in a moment.'
          : 'Désolé, une erreur est survenue. Réessayez dans un instant.',
        'assistant'
      );
    } finally {
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener('click', () => handleSend());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
  suggestions?.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-btn')) handleSend(e.target.textContent.trim());
  });
}
