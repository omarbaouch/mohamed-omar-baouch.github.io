/**
 * Visitor Intelligence Module — baouch.fr
 * Tracking gratuit : parcours visiteur, événements GA4, enrichissement formulaire
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'bfr_visitor';
    const SESSION_KEY = 'bfr_session';

    // ── Helpers ──────────────────────────────────────────────────────────
    function uuid() {
        return 'xxxx-xxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));
    }

    function now() {
        return new Date().toISOString();
    }

    function getJSON(key) {
        try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
    }

    function setJSON(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota */ }
    }

    function ga4(event, params) {
        if (typeof gtag === 'function') gtag('event', event, params);
    }

    // ── Visitor profile (persiste entre visites) ─────────────────────────
    function getOrCreateVisitor() {
        let v = getJSON(STORAGE_KEY);
        if (!v) {
            v = {
                id: uuid(),
                firstVisit: now(),
                visits: 0,
                pages: [],
                totalTime: 0,
                referrers: [],
                utmHistory: [],
                device: navigator.userAgent,
                language: navigator.language,
                screenRes: screen.width + 'x' + screen.height,
                formSubmitted: false
            };
        }
        v.visits++;
        v.lastVisit = now();

        // Capture referrer
        var ref = document.referrer;
        if (ref && !ref.includes(location.hostname) && v.referrers.indexOf(ref) === -1) {
            v.referrers.push(ref);
        }

        // Capture UTM
        var params = new URLSearchParams(location.search);
        var utm = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) {
            if (params.get(k)) utm[k] = params.get(k);
        });
        if (Object.keys(utm).length > 0) {
            utm._ts = now();
            v.utmHistory.push(utm);
        }

        setJSON(STORAGE_KEY, v);
        return v;
    }

    // ── Session tracking ─────────────────────────────────────────────────
    function getOrCreateSession() {
        let s = getJSON(SESSION_KEY);
        var isNew = false;
        if (!s || (Date.now() - s.lastActivity > 30 * 60 * 1000)) {
            s = { id: uuid(), start: now(), pages: [], events: [], lastActivity: Date.now() };
            isNew = true;
        }
        s.lastActivity = Date.now();

        // Log page
        var page = {
            path: location.pathname,
            title: document.title,
            ts: now(),
            referrer: document.referrer || '(direct)'
        };
        s.pages.push(page);
        setJSON(SESSION_KEY, s);
        return { session: s, isNew: isNew };
    }

    // ── Track page in visitor history ────────────────────────────────────
    function trackPage(visitor) {
        var path = location.pathname;
        // Keep last 50 pages
        visitor.pages.push({ path: path, ts: now() });
        if (visitor.pages.length > 50) visitor.pages = visitor.pages.slice(-50);
        setJSON(STORAGE_KEY, visitor);

        ga4('page_view_custom', {
            page_path: path,
            visitor_id: visitor.id,
            visit_number: visitor.visits,
            is_returning: visitor.visits > 1
        });
    }

    // ── Scroll depth tracking ────────────────────────────────────────────
    function trackScrollDepth() {
        var milestones = [25, 50, 75, 90, 100];
        var fired = {};
        var ticking = false;

        function check() {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            var pct = Math.round((scrollTop / docHeight) * 100);

            milestones.forEach(function (m) {
                if (pct >= m && !fired[m]) {
                    fired[m] = true;
                    ga4('scroll_depth', { depth: m, page: location.pathname });
                }
            });
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(check); }
        }, { passive: true });
    }

    // ── Time on page tracking ────────────────────────────────────────────
    function trackTimeOnPage(visitor) {
        var start = Date.now();
        var intervals = [30, 60, 120, 300]; // secondes
        var firedTime = {};

        setInterval(function () {
            var elapsed = Math.round((Date.now() - start) / 1000);
            intervals.forEach(function (t) {
                if (elapsed >= t && !firedTime[t]) {
                    firedTime[t] = true;
                    ga4('time_on_page', { seconds: t, page: location.pathname });
                }
            });
        }, 5000);

        // Save total time on unload
        window.addEventListener('beforeunload', function () {
            var elapsed = Math.round((Date.now() - start) / 1000);
            visitor.totalTime = (visitor.totalTime || 0) + elapsed;
            setJSON(STORAGE_KEY, visitor);
        });
    }

    // ── CTA / button click tracking ──────────────────────────────────────
    function trackClicks() {
        document.addEventListener('click', function (e) {
            var el = e.target.closest('a, button');
            if (!el) return;

            // Contact CTA
            if (el.href && el.href.includes('#contact')) {
                ga4('cta_click', { type: 'contact', page: location.pathname });
            }

            // Blog article links
            if (el.href && el.href.includes('/blog/') && !el.href.includes('/blog/index')) {
                ga4('blog_click', { article: el.href, from: location.pathname });
            }

            // External links
            if (el.href && el.hostname && el.hostname !== location.hostname) {
                ga4('outbound_click', { url: el.href, page: location.pathname });
            }

            // AI assistant
            if (el.id === 'ai-fab' || el.id === 'ai-send-btn') {
                ga4('ai_assistant', { action: el.id === 'ai-fab' ? 'open' : 'send', page: location.pathname });
            }

            // Theme switch
            if (el.id === 'themeSwitch' || el.closest('#themeSwitch')) {
                ga4('theme_switch', { page: location.pathname });
            }

            // Language switch
            if (el.id === 'lang-fr' || el.id === 'lang-en') {
                ga4('language_switch', { lang: el.id.replace('lang-', ''), page: location.pathname });
            }
        });
    }

    // ── Article read completion (blog pages) ─────────────────────────────
    function trackArticleRead() {
        if (!document.body.classList.contains('blog-page')) return;
        if (!document.body.dataset.blogPost) return;

        var article = document.querySelector('.blog-article, .article-section');
        if (!article) return;

        var startTime = Date.now();
        var readFired = false;

        // Consider "read" when 75% scrolled AND 60+ seconds spent
        function checkRead() {
            if (readFired) return;
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            var elapsed = (Date.now() - startTime) / 1000;

            if (pct >= 75 && elapsed >= 60) {
                readFired = true;
                ga4('article_read', {
                    article: document.body.dataset.blogPost,
                    time_spent: Math.round(elapsed),
                    page: location.pathname
                });
            }
        }

        window.addEventListener('scroll', function () {
            requestAnimationFrame(checkRead);
        }, { passive: true });
    }

    // ── Enrichir le formulaire de contact ────────────────────────────────
    function enrichContactForm(visitor) {
        var form = document.getElementById('contactForm');
        if (!form) return;

        // Inject hidden fields with visitor data
        function addHidden(name, value) {
            var input = form.querySelector('input[name="' + name + '"]');
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                form.appendChild(input);
            }
            input.value = value;
        }

        form.addEventListener('submit', function () {
            // Build visitor summary
            var recentPages = visitor.pages.slice(-10).map(function (p) { return p.path; }).join(' → ');
            var source = visitor.referrers.length > 0 ? visitor.referrers[visitor.referrers.length - 1] : '(direct)';
            var utmLast = visitor.utmHistory.length > 0 ? JSON.stringify(visitor.utmHistory[visitor.utmHistory.length - 1]) : '';

            addHidden('_visitor_id', visitor.id);
            addHidden('_visits', visitor.visits);
            addHidden('_first_visit', visitor.firstVisit);
            addHidden('_pages_visited', recentPages);
            addHidden('_source', source);
            addHidden('_utm', utmLast);
            addHidden('_device', /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop');
            addHidden('_language', navigator.language);

            // Mark form submitted
            visitor.formSubmitted = true;
            setJSON(STORAGE_KEY, visitor);

            ga4('contact_form_submit', {
                visitor_id: visitor.id,
                visit_number: visitor.visits,
                source: source,
                pages_before: recentPages
            });
        }, true); // capture phase — runs before emailjs
    }

    // ── Returning visitor detection ──────────────────────────────────────
    function detectReturning(visitor) {
        if (visitor.visits > 1) {
            ga4('returning_visitor', {
                visitor_id: visitor.id,
                visit_number: visitor.visits,
                first_visit: visitor.firstVisit,
                pages_total: visitor.pages.length
            });
        }

        // High-intent signal: visited contact page + blog article
        var paths = visitor.pages.map(function (p) { return p.path; });
        var visitedBlog = paths.some(function (p) { return p.includes('/blog/') && !p.endsWith('/blog/'); });
        var visitedContact = paths.some(function (p) { return p.includes('#contact') || p === '/'; });

        if (visitedBlog && visitor.visits >= 2) {
            ga4('high_intent_visitor', {
                visitor_id: visitor.id,
                visit_number: visitor.visits,
                blog_articles_read: paths.filter(function (p) { return p.includes('/blog/') && !p.endsWith('/blog/'); }).length
            });
        }
    }

    // ── Copy tracking (someone copies text from your site) ───────────────
    function trackCopy() {
        document.addEventListener('copy', function () {
            var text = window.getSelection().toString().substring(0, 100);
            ga4('content_copy', {
                text_preview: text,
                page: location.pathname
            });
        });
    }

    // ── Print tracking ───────────────────────────────────────────────────
    function trackPrint() {
        window.addEventListener('beforeprint', function () {
            ga4('page_print', { page: location.pathname });
        });
    }

    // ── Visibility tracking (tab switch / minimize) ──────────────────────
    function trackVisibility() {
        var hiddenAt = null;
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                hiddenAt = Date.now();
            } else if (hiddenAt) {
                var away = Math.round((Date.now() - hiddenAt) / 1000);
                if (away > 5) {
                    ga4('tab_return', { away_seconds: away, page: location.pathname });
                }
                hiddenAt = null;
            }
        });
    }

    // ── INIT ─────────────────────────────────────────────────────────────
    function init() {
        var visitor = getOrCreateVisitor();
        var sessionData = getOrCreateSession();

        trackPage(visitor);
        trackScrollDepth();
        trackTimeOnPage(visitor);
        trackClicks();
        trackArticleRead();
        enrichContactForm(visitor);
        detectReturning(visitor);
        trackCopy();
        trackPrint();
        trackVisibility();

        // Console log for debug (remove in production if needed)
        if (location.hostname === 'localhost' || location.search.includes('debug=1')) {
            console.log('[VI] Visitor:', visitor.id, '| Visit #' + visitor.visits, '| Pages:', visitor.pages.length);
            console.log('[VI] Session:', sessionData.session.id, '| New:', sessionData.isNew);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
