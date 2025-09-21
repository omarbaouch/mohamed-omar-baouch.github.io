const CHART_SCRIPT_SELECTOR = 'script[type="application/json"][data-chart-config]';
const OBSERVER_SELECTOR = `${CHART_SCRIPT_SELECTOR}, [data-blog-chart], canvas[data-chart-config], canvas[data-chart-type]`;
const CHART_MODULE_URL = '/assets/js/vendor/chart.umd.js';
const CHART_INSTANCE_KEY = '__blogChartInstance';
const DEFAULT_COLORS = [
    '#2563eb', // blue
    '#7c3aed', // violet
    '#0ea5e9', // light blue
    '#14b8a6', // teal
    '#f97316', // orange
    '#ef4444', // red
    '#22c55e', // green
    '#eab308'  // amber
];

const isElement = (node) => node instanceof Element;

const safeParseJSON = (value, context) => {
    if (typeof value !== 'string') {
        value = value?.textContent ?? '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    try {
        return JSON.parse(trimmed);
    } catch (error) {
        console.warn('[blog-charts] Impossible de parser les données JSON du graphique.', { context, error });
        return null;
    }
};

const normalizeList = (value) => {
    if (typeof value !== 'string') return [];
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
};

const toNumber = (value) => {
    if (typeof value !== 'string' && typeof value !== 'number') return NaN;
    const normalized = typeof value === 'number' ? value : Number.parseFloat(value.replace(',', '.'));
    return Number.isFinite(normalized) ? normalized : NaN;
};

const ensurePalette = (length, customColors) => {
    const paletteSource = customColors && customColors.length ? customColors : DEFAULT_COLORS;
    const palette = [];
    for (let index = 0; index < length; index += 1) {
        palette.push(paletteSource[index % paletteSource.length]);
    }
    return palette;
};

const isPlainObject = (value) => Boolean(value) && Object.prototype.toString.call(value) === '[object Object]';

const mergeObjects = (target, source) => {
    if (!isPlainObject(source)) {
        return isPlainObject(target) ? { ...target } : {};
    }

    const result = isPlainObject(target) ? { ...target } : {};
    Object.entries(source).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            result[key] = value.slice();
        } else if (isPlainObject(value)) {
            result[key] = mergeObjects(result[key], value);
        } else {
            result[key] = value;
        }
    });
    return result;
};

const buildInlineConfig = (element) => {
    if (!isElement(element)) return null;
    const { dataset } = element;
    if (!dataset) return null;

    const { chartType, chartLabels, chartValues } = dataset;
    if (!chartType || !chartLabels || !chartValues) {
        return null;
    }

    const labels = normalizeList(chartLabels);
    const values = normalizeList(chartValues).map(toNumber);

    if (!labels.length || labels.length !== values.length || values.some((item) => Number.isNaN(item))) {
        console.warn('[blog-charts] Les données inline sont invalides (labels/valeurs).', element);
        return null;
    }

    const datasetLabel = dataset.chartDatasetLabel || dataset.chartLegend || '';
    const colors = normalizeList(dataset.chartColors || dataset.chartColour);
    const borderColors = normalizeList(dataset.chartBorderColors);
    const backgroundPalette = ensurePalette(values.length, colors);
    const borderPalette = borderColors.length ? ensurePalette(values.length, borderColors) : backgroundPalette.slice();

    const borderWidth = dataset.chartBorderWidth ? toNumber(dataset.chartBorderWidth) : NaN;
    const tension = dataset.chartTension ? toNumber(dataset.chartTension) : NaN;
    const tooltipEnabled = dataset.chartTooltip !== 'false';

    const baseOptions = {
        responsive: dataset.chartResponsive !== 'false',
        maintainAspectRatio: dataset.chartAspect !== 'false',
        plugins: {
            legend: datasetLabel ? { display: true } : { display: false },
            tooltip: { enabled: tooltipEnabled }
        }
    };

    if (dataset.chartStacked === 'true') {
        baseOptions.scales = {
            x: { stacked: true },
            y: { stacked: true }
        };
    }

    const inlineOptions = dataset.chartOptions ? safeParseJSON(dataset.chartOptions, element) : null;
    const mergedOptions = inlineOptions ? mergeObjects(baseOptions, inlineOptions) : baseOptions;

    const inlineDataset = {
        data: values,
        backgroundColor: backgroundPalette,
        borderColor: borderPalette
    };

    if (datasetLabel) {
        inlineDataset.label = datasetLabel;
    }
    if (!Number.isNaN(borderWidth)) {
        inlineDataset.borderWidth = borderWidth;
    }
    if (!Number.isNaN(tension)) {
        inlineDataset.tension = tension;
    }
    if (dataset.chartFill === 'true') {
        inlineDataset.fill = true;
    }

    return {
        type: chartType,
        data: {
            labels,
            datasets: [inlineDataset]
        },
        options: mergedOptions
    };
};

const resolveCanvas = (target) => {
    if (!isElement(target)) return null;

    if (target instanceof HTMLCanvasElement) {
        return target;
    }

    const { dataset } = target;
    if (dataset?.chartTarget) {
        const selector = dataset.chartTarget;
        const scoped = target.querySelector(selector);
        const resolved = (scoped instanceof HTMLCanvasElement) ? scoped : document.querySelector(selector);
        if (resolved instanceof HTMLCanvasElement) {
            return resolved;
        }
    }

    const existing = target.querySelector('canvas');
    if (existing instanceof HTMLCanvasElement) {
        return existing;
    }

    const canvas = document.createElement('canvas');
    canvas.dataset.chartCanvas = 'true';
    if (target.firstChild) {
        target.insertBefore(canvas, target.firstChild);
    } else {
        target.appendChild(canvas);
    }
    return canvas;
};

const resolveConfig = (target, scriptMap) => {
    if (!isElement(target)) return null;

    const explicitScript = scriptMap.get(target);
    if (explicitScript) {
        const config = safeParseJSON(explicitScript.textContent, explicitScript);
        if (config) return config;
    }

    const attrConfig = target.getAttribute('data-chart-config');
    if (attrConfig) {
        const config = safeParseJSON(attrConfig, target);
        if (config) return config;
    }

    const inlineConfig = buildInlineConfig(target);
    if (inlineConfig) {
        return inlineConfig;
    }

    if (!(target instanceof HTMLCanvasElement)) {
        const nestedScript = target.querySelector(CHART_SCRIPT_SELECTOR);
        if (nestedScript) {
            const config = safeParseJSON(nestedScript.textContent, nestedScript);
            if (config) return config;
        }

        const canvas = target.querySelector('canvas');
        if (canvas instanceof HTMLCanvasElement) {
            const canvasAttr = canvas.getAttribute('data-chart-config');
            if (canvasAttr) {
                const config = safeParseJSON(canvasAttr, canvas);
                if (config) return config;
            }

            const canvasInline = buildInlineConfig(canvas);
            if (canvasInline) {
                return canvasInline;
            }
        }
    }

    if (target instanceof HTMLCanvasElement) {
        const canvasAttr = target.getAttribute('data-chart-config');
        if (canvasAttr) {
            const config = safeParseJSON(canvasAttr, target);
            if (config) return config;
        }

        const canvasInline = buildInlineConfig(target);
        if (canvasInline) {
            return canvasInline;
        }
    }

    return null;
};

const gatherChartTargets = () => {
    const targets = new Set();
    const scriptMap = new Map();

    document.querySelectorAll(CHART_SCRIPT_SELECTOR).forEach((script) => {
        const targetSelector = script.dataset.chartTarget;
        if (targetSelector) {
            const directTarget = document.querySelector(targetSelector);
            if (isElement(directTarget)) {
                scriptMap.set(directTarget, script);
                targets.add(directTarget);
            } else {
                console.warn(`[blog-charts] Cible introuvable pour les données du graphique : "${targetSelector}".`, script);
            }
            return;
        }

        const scopedContainer = script.closest('[data-blog-chart]');
        if (isElement(scopedContainer)) {
            scriptMap.set(scopedContainer, script);
            targets.add(scopedContainer);
        } else if (isElement(script.parentElement)) {
            scriptMap.set(script.parentElement, script);
            targets.add(script.parentElement);
        } else {
            console.warn('[blog-charts] Script de données ignoré : aucun conteneur valide détecté.', script);
        }
    });

    document.querySelectorAll('[data-blog-chart]').forEach((element) => targets.add(element));
    document.querySelectorAll('canvas[data-chart-config]').forEach((element) => targets.add(element));
    document.querySelectorAll('canvas[data-chart-type]').forEach((element) => targets.add(element));

    document.querySelectorAll('[data-chart-config]').forEach((element) => {
        if (element.tagName !== 'SCRIPT' && isElement(element)) {
            targets.add(element);
        }
    });

    return { targets: Array.from(targets), scriptMap };
};

const loadChartLibrary = (() => {
    let loadPromise;
    return () => {
        if (window.Chart) {
            return Promise.resolve(window.Chart);
        }
        if (!loadPromise) {
            loadPromise = new Promise((resolve, reject) => {
                const existing = document.querySelector(`script[src="${CHART_MODULE_URL}"]`);
                if (existing) {
                    existing.addEventListener('load', () => {
                        if (window.Chart) {
                            resolve(window.Chart);
                        } else {
                            reject(new Error('Chart.js est introuvable après le chargement du script.'));
                        }
                    }, { once: true });
                    existing.addEventListener('error', () => reject(new Error('Échec du chargement de Chart.js.')), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = CHART_MODULE_URL;
                script.async = true;
                script.addEventListener('load', () => {
                    if (window.Chart) {
                        resolve(window.Chart);
                    } else {
                        reject(new Error('Chart.js est introuvable après le chargement du script.'));
                    }
                }, { once: true });
                script.addEventListener('error', () => reject(new Error('Échec du chargement de Chart.js.')), { once: true });
                document.head.appendChild(script);
            }).catch((error) => {
                console.error('[blog-charts] Impossible de charger Chart.js.', error);
                return null;
            });
        }
        return loadPromise;
    };
})();

const applyAccessibility = (target, canvas) => {
    if (!(canvas instanceof HTMLCanvasElement)) return;

    const labelSource = isElement(target) ? (target.dataset.chartLabel || target.dataset.chartAriaLabel || target.dataset.chartTitle) : null;
    const canvasLabel = canvas.dataset.chartLabel || canvas.dataset.chartAriaLabel;
    const label = canvas.getAttribute('aria-label') || canvasLabel || labelSource;

    if (label) {
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', label);
    }
};

const renderCharts = async () => {
    const { targets, scriptMap } = gatherChartTargets();
    if (!targets.length) return;

    const pending = [];
    targets.forEach((target) => {
        if (!isElement(target)) return;
        if (target.dataset.chartReady === 'true') return;

        const config = resolveConfig(target, scriptMap);
        if (!config) return;

        pending.push({ target, config });
    });

    if (!pending.length) return;

    const Chart = await loadChartLibrary();
    if (!Chart) return;

    pending.forEach(({ target, config }) => {
        const canvas = resolveCanvas(target);
        if (!(canvas instanceof HTMLCanvasElement)) {
            console.warn('[blog-charts] Aucun élément <canvas> valide pour le graphique.', target);
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            console.warn('[blog-charts] Contexte 2D introuvable pour le graphique.', canvas);
            return;
        }

        if (canvas[CHART_INSTANCE_KEY]) {
            try {
                canvas[CHART_INSTANCE_KEY].destroy();
            } catch (error) {
                console.warn('[blog-charts] Impossible de détruire l\'instance Chart existante.', error);
            }
        }

        try {
            canvas[CHART_INSTANCE_KEY] = new Chart(context, config);
            if (isElement(target)) {
                target.dataset.chartReady = 'true';
            }
            canvas.dataset.chartReady = 'true';
            applyAccessibility(target, canvas);
        } catch (error) {
            console.error('[blog-charts] Erreur lors de l\'initialisation du graphique.', error);
        }
    });
};

const scheduleRender = (() => {
    let scheduled = false;
    return () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            renderCharts();
        });
    };
})();

const startObservation = () => {
    scheduleRender();

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!isElement(node)) continue;
                if (node.matches(OBSERVER_SELECTOR)) {
                    scheduleRender();
                    return;
                }
                if (node.querySelector?.(OBSERVER_SELECTOR)) {
                    scheduleRender();
                    return;
                }
            }
        }
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

export const initBlogCharts = () => {
    startObservation();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initBlogCharts();
    }, { once: true });
} else {
    initBlogCharts();
}
