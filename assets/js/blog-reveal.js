/* =====================================================================
   blog-reveal.js — moteur d'animations d'article (autonome, robuste)
   • révélation au scroll : tout élément entré dans le viewport OU déjà
     dépassé est révélé (résiste aux sauts d'ancre du sommaire)
   • parallaxe douce sur les images de figure
   • compteurs animés sur les statistiques du hero
   Respecte prefers-reduced-motion. Aucune dépendance.
   ===================================================================== */
(function () {
    'use strict';

    const reduce = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const root = document.querySelector('.blog-article');
    if (!root) return;

    const SELECTOR = [
        '.article-section',
        '.article-summary',
        '.article-figure',
        '.figure-inline',
        '.figure-duo',
        '.callout',
        '.media-grid',
        '.grid',
        '.chart-figure',
        '.table-scroll',
        '.article-cta',
        '.article-related',
        '.article-footer',
        '.post-card'
    ].join(',');

    const targets = Array.from(root.querySelectorAll(SELECTOR));

    /* ---------- Mode réduit : tout est visible, pas d'animation ---------- */
    if (reduce) {
        targets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    targets.forEach((el) => el.classList.add('reveal'));

    /* ---------- 1. Révélation robuste au scroll ---------- */
    let pending = targets.slice();
    let ticking = false;

    const revealPass = () => {
        ticking = false;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const trigger = vh * 0.9; // révèle dès que le haut franchit 90 % de la hauteur
        const staggerBase = {};
        const still = [];
        for (const el of pending) {
            const top = el.getBoundingClientRect().top;
            if (top < trigger) {
                // effet d'escalier entre éléments frères révélés au même passage
                const parentId = el.parentElement ? (el.parentElement.dataset._rk || (el.parentElement.dataset._rk = Math.random().toString(36).slice(2))) : 'root';
                const n = (staggerBase[parentId] = (staggerBase[parentId] || 0) + 1) - 1;
                el.style.setProperty('--reveal-delay', (n % 4) * 85 + 'ms');
                el.classList.add('is-visible');
            } else {
                still.push(el);
            }
        }
        pending = still;
        if (!pending.length) {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        }
    };

    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(revealPass);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('hashchange', () => window.requestAnimationFrame(revealPass));
    // passes initiales (gère l'atterrissage direct sur une ancre)
    revealPass();
    setTimeout(revealPass, 250);
    window.addEventListener('load', () => setTimeout(revealPass, 60));

    /* ---------- 2. Parallaxe douce sur les images ---------- */
    const figs = Array.from(root.querySelectorAll('.article-figure, .figure-inline'));
    if (figs.length) {
        let pTicking = false;
        const updatePll = () => {
            pTicking = false;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            figs.forEach((fig) => {
                const img = fig.querySelector('img');
                if (!img) return;
                const rect = fig.getBoundingClientRect();
                if (rect.bottom < -80 || rect.top > vh + 80) return;
                const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -0.5..0.5
                const shift = Math.max(-16, Math.min(16, -progress * 24));
                const base = fig.classList.contains('is-visible') ? 1.04 : 1.12;
                img.style.transform = 'scale(' + base + ') translateY(' + shift.toFixed(2) + 'px)';
            });
        };
        const onPll = () => {
            if (pTicking) return;
            pTicking = true;
            window.requestAnimationFrame(updatePll);
        };
        window.addEventListener('scroll', onPll, { passive: true });
        window.addEventListener('resize', onPll, { passive: true });
        updatePll();
    }

    /* ---------- 3. Compteurs animés (hero-stats) ---------- */
    const parseStat = (text) => {
        const m = String(text).match(/^([^\d]*)([\d\s.,]+)(.*)$/);
        if (!m) return null;
        const numRaw = m[2].replace(/\s/g, '').replace(',', '.');
        const num = parseFloat(numRaw);
        if (Number.isNaN(num)) return null;
        const decimals = (numRaw.split('.')[1] || '').length;
        return { prefix: m[1], value: num, suffix: m[3], decimals };
    };

    const animateCount = (el) => {
        const parsed = parseStat(el.textContent.trim());
        if (!parsed) return;
        const { prefix, value, suffix, decimals } = parsed;
        const dur = 1300;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
            const t = Math.min(1, (now - start) / dur);
            el.textContent = prefix + (value * ease(t)).toFixed(decimals) + suffix;
            if (t < 1) requestAnimationFrame(step);
            else el.textContent = prefix + value.toFixed(decimals) + suffix;
        };
        requestAnimationFrame(step);
    };

    const statValues = root.querySelectorAll('.hero-stat-value');
    if (statValues.length && 'IntersectionObserver' in window) {
        const statIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCount(entry.target);
                statIO.unobserve(entry.target);
            });
        }, { threshold: 0.6 });
        statValues.forEach((el) => {
            if (el.textContent.indexOf('/') === -1) statIO.observe(el); // ignore les dates
        });
    }
})();
