/**
 * Rapport quotidien baouch.fr — Google Apps Script
 * Envoie un email à 21h avec les stats GA4 du jour
 *
 * INSTALLATION :
 * 1. Va sur https://script.google.com → Nouveau projet
 * 2. Colle ce script entier
 * 3. Renomme le projet "Rapport baouch.fr"
 * 4. Active l'API : Services (+) → Google Analytics Data API → Ajouter
 * 5. Lance manuellement une fois : Exécuter → envoyerRapportQuotidien → Autoriser
 * 6. Ajouter le déclencheur : Déclencheurs (horloge à gauche) → + Ajouter
 *    - Fonction : envoyerRapportQuotidien
 *    - Source : Basée sur l'heure
 *    - Type : Quotidien
 *    - Heure : 21h-22h
 * 7. C'est fait — tu recevras un email chaque soir
 *
 * NE PAS PUBLIER CE FICHIER — il contient ton Property ID.
 * Ce fichier est un backup, le vrai script tourne sur Google Apps Script.
 */

// ── Configuration ──────────────────────────────────────────────────────────
var CONFIG = {
  GA4_PROPERTY_ID: '482972621',
  EMAIL: Session.getActiveUser().getEmail(), // ton email Google connecté
  SITE_URL: 'https://www.baouch.fr',
  LEADFEEDER_URL: 'https://app.dealfront.com',
  CLARITY_URL: 'https://clarity.microsoft.com/projects/view/vy4yvht8gz/dashboard',
  GA4_URL: 'https://analytics.google.com/analytics/web/#/p482972621/reports/reportinghub'
};

// ── Fonction principale ────────────────────────────────────────────────────
function envoyerRapportQuotidien() {
  var aujourdhui = new Date();
  var dateStr = Utilities.formatDate(aujourdhui, 'Europe/Paris', 'yyyy-MM-dd');
  var dateFR = Utilities.formatDate(aujourdhui, 'Europe/Paris', 'dd/MM/yyyy');

  // Récupérer les données GA4
  var visiteurs = getVisiteurs(dateStr);
  var pages = getTopPages(dateStr);
  var sources = getTopSources(dateStr);
  var nouveauxVsRecurrents = getNouveauxVsRecurrents(dateStr);
  var pays = getTopPays(dateStr);
  var appareils = getAppareils(dateStr);
  var evenements = getEvenementsCles(dateStr);

  // Construire l'email HTML
  var html = buildEmailHTML(dateFR, visiteurs, pages, sources, nouveauxVsRecurrents, pays, appareils, evenements);

  // Envoyer
  MailApp.sendEmail({
    to: CONFIG.EMAIL,
    subject: '📊 Rapport baouch.fr — ' + dateFR,
    htmlBody: html
  });
}

// ── Requêtes GA4 ──────────────────────────────────────────────────────────

function ga4Request(dateStr, dimensions, metrics, limit) {
  var request = AnalyticsData.newRunReportRequest();
  request.dateRanges = [{ startDate: dateStr, endDate: dateStr }];
  request.dimensions = dimensions.map(function(d) { return { name: d }; });
  request.metrics = metrics.map(function(m) { return { name: m }; });
  if (limit) request.limit = limit;
  request.orderBys = [{ metric: { metricName: metrics[0] }, desc: true }];

  try {
    return AnalyticsData.Properties.runReport(request, 'properties/' + CONFIG.GA4_PROPERTY_ID);
  } catch (e) {
    Logger.log('Erreur GA4: ' + e.message);
    return null;
  }
}

function getVisiteurs(dateStr) {
  var report = ga4Request(dateStr, [], ['totalUsers', 'sessions', 'screenPageViews', 'averageSessionDuration', 'bounceRate']);
  if (!report || !report.rows || report.rows.length === 0) {
    return { utilisateurs: 0, sessions: 0, pages_vues: 0, duree_moy: '0s', taux_rebond: '0%' };
  }
  var row = report.rows[0];
  var duree = Math.round(parseFloat(row.metricValues[3].value));
  var min = Math.floor(duree / 60);
  var sec = duree % 60;
  return {
    utilisateurs: parseInt(row.metricValues[0].value),
    sessions: parseInt(row.metricValues[1].value),
    pages_vues: parseInt(row.metricValues[2].value),
    duree_moy: (min > 0 ? min + 'min ' : '') + sec + 's',
    taux_rebond: Math.round(parseFloat(row.metricValues[4].value) * 100) + '%'
  };
}

function getTopPages(dateStr) {
  var report = ga4Request(dateStr, ['pageTitle', 'pagePath'], ['screenPageViews'], 10);
  if (!report || !report.rows) return [];
  return report.rows.map(function(row) {
    return {
      titre: row.dimensionValues[0].value,
      chemin: row.dimensionValues[1].value,
      vues: parseInt(row.metricValues[0].value)
    };
  });
}

function getTopSources(dateStr) {
  var report = ga4Request(dateStr, ['sessionSource', 'sessionMedium'], ['sessions'], 10);
  if (!report || !report.rows) return [];
  return report.rows.map(function(row) {
    return {
      source: row.dimensionValues[0].value,
      medium: row.dimensionValues[1].value,
      sessions: parseInt(row.metricValues[0].value)
    };
  });
}

function getNouveauxVsRecurrents(dateStr) {
  var report = ga4Request(dateStr, ['newVsReturning'], ['totalUsers']);
  if (!report || !report.rows) return { nouveaux: 0, recurrents: 0 };
  var result = { nouveaux: 0, recurrents: 0 };
  report.rows.forEach(function(row) {
    var type = row.dimensionValues[0].value;
    var val = parseInt(row.metricValues[0].value);
    if (type === 'new') result.nouveaux = val;
    else result.recurrents = val;
  });
  return result;
}

function getTopPays(dateStr) {
  var report = ga4Request(dateStr, ['country', 'city'], ['totalUsers'], 10);
  if (!report || !report.rows) return [];
  return report.rows.map(function(row) {
    return {
      pays: row.dimensionValues[0].value,
      ville: row.dimensionValues[1].value,
      utilisateurs: parseInt(row.metricValues[0].value)
    };
  });
}

function getAppareils(dateStr) {
  var report = ga4Request(dateStr, ['deviceCategory'], ['totalUsers']);
  if (!report || !report.rows) return [];
  return report.rows.map(function(row) {
    return {
      appareil: row.dimensionValues[0].value,
      utilisateurs: parseInt(row.metricValues[0].value)
    };
  });
}

function getEvenementsCles(dateStr) {
  var report = ga4Request(dateStr, ['eventName'], ['eventCount'], 20);
  if (!report || !report.rows) return [];
  var interessants = ['cta_click', 'contact_form_submit', 'blog_click', 'outbound_click',
    'scroll_depth', 'article_read', 'returning_visitor', 'high_intent_visitor',
    'ai_assistant', 'theme_switch', 'language_switch', 'content_copy', 'page_print'];
  return report.rows.filter(function(row) {
    return interessants.indexOf(row.dimensionValues[0].value) !== -1;
  }).map(function(row) {
    return {
      event: row.dimensionValues[0].value,
      count: parseInt(row.metricValues[0].value)
    };
  });
}

// ── Construction de l'email HTML ───────────────────────────────────────────

function buildEmailHTML(dateFR, visiteurs, pages, sources, nvr, pays, appareils, evenements) {

  var eventLabels = {
    'cta_click': '🎯 Clic CTA contact',
    'contact_form_submit': '✉️ Formulaire envoyé',
    'blog_click': '📖 Clic article blog',
    'outbound_click': '🔗 Clic lien externe',
    'scroll_depth': '📜 Scroll profond',
    'article_read': '✅ Article lu en entier',
    'returning_visitor': '🔄 Visiteur récurrent',
    'high_intent_visitor': '🔥 Visiteur haute intention',
    'ai_assistant': '🤖 Assistant IA utilisé',
    'theme_switch': '🎨 Changement thème',
    'language_switch': '🌐 Changement langue',
    'content_copy': '📋 Copie de contenu',
    'page_print': '🖨️ Impression page'
  };

  var html = '';
  html += '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:680px;margin:0 auto;background:#f8f9fa;padding:20px;">';

  // Header
  html += '<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);color:white;padding:30px;border-radius:12px 12px 0 0;text-align:center;">';
  html += '<h1 style="margin:0;font-size:24px;">📊 Rapport quotidien</h1>';
  html += '<p style="margin:8px 0 0;opacity:0.8;font-size:16px;">baouch.fr — ' + dateFR + '</p>';
  html += '</div>';

  // KPIs principaux
  html += '<div style="background:white;padding:24px;border-bottom:1px solid #eee;">';
  html += '<table style="width:100%;text-align:center;border-collapse:collapse;">';
  html += '<tr>';
  html += kpiCell('👥', visiteurs.utilisateurs, 'Visiteurs');
  html += kpiCell('📄', visiteurs.pages_vues, 'Pages vues');
  html += kpiCell('⏱️', visiteurs.duree_moy, 'Durée moy.');
  html += kpiCell('↩️', visiteurs.taux_rebond, 'Taux rebond');
  html += '</tr>';
  html += '</table>';
  html += '</div>';

  // Nouveaux vs Récurrents
  html += '<div style="background:white;padding:20px 24px;border-bottom:1px solid #eee;">';
  html += sectionTitle('🆕 Nouveaux vs Récurrents');
  var totalNvr = nvr.nouveaux + nvr.recurrents;
  var pctNew = totalNvr > 0 ? Math.round(nvr.nouveaux / totalNvr * 100) : 0;
  var pctRet = totalNvr > 0 ? Math.round(nvr.recurrents / totalNvr * 100) : 0;
  html += '<div style="display:flex;gap:16px;">';
  html += '<div style="flex:1;background:#e8f5e9;padding:12px;border-radius:8px;text-align:center;">';
  html += '<div style="font-size:24px;font-weight:bold;color:#2e7d32;">' + nvr.nouveaux + '</div>';
  html += '<div style="font-size:12px;color:#666;">Nouveaux (' + pctNew + '%)</div></div>';
  html += '<div style="flex:1;background:#e3f2fd;padding:12px;border-radius:8px;text-align:center;">';
  html += '<div style="font-size:24px;font-weight:bold;color:#1565c0;">' + nvr.recurrents + '</div>';
  html += '<div style="font-size:12px;color:#666;">Récurrents (' + pctRet + '%)</div></div>';
  html += '</div></div>';

  // Top pages
  if (pages.length > 0) {
    html += '<div style="background:white;padding:20px 24px;border-bottom:1px solid #eee;">';
    html += sectionTitle('📄 Pages les plus vues');
    html += '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
    pages.forEach(function(p, i) {
      var bg = i % 2 === 0 ? '#f8f9fa' : 'white';
      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:8px;border-radius:4px;">' + truncate(p.titre, 45) + '<br><span style="font-size:11px;color:#888;">' + p.chemin + '</span></td>';
      html += '<td style="padding:8px;text-align:right;font-weight:bold;white-space:nowrap;">' + p.vues + ' vues</td>';
      html += '</tr>';
    });
    html += '</table></div>';
  }

  // Sources de trafic
  if (sources.length > 0) {
    html += '<div style="background:white;padding:20px 24px;border-bottom:1px solid #eee;">';
    html += sectionTitle('🔍 Sources de trafic');
    html += '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
    sources.forEach(function(s, i) {
      var bg = i % 2 === 0 ? '#f8f9fa' : 'white';
      var label = s.source === '(direct)' ? '(direct)' : s.source + ' / ' + s.medium;
      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:8px;">' + label + '</td>';
      html += '<td style="padding:8px;text-align:right;font-weight:bold;">' + s.sessions + ' sessions</td>';
      html += '</tr>';
    });
    html += '</table></div>';
  }

  // Géographie
  if (pays.length > 0) {
    html += '<div style="background:white;padding:20px 24px;border-bottom:1px solid #eee;">';
    html += sectionTitle('🌍 Géographie');
    html += '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
    pays.forEach(function(p, i) {
      var bg = i % 2 === 0 ? '#f8f9fa' : 'white';
      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:8px;">' + p.ville + ', ' + p.pays + '</td>';
      html += '<td style="padding:8px;text-align:right;font-weight:bold;">' + p.utilisateurs + '</td>';
      html += '</tr>';
    });
    html += '</table></div>';
  }

  // Appareils
  if (appareils.length > 0) {
    html += '<div style="background:white;padding:20px 24px;border-bottom:1px solid #eee;">';
    html += sectionTitle('📱 Appareils');
    html += '<div style="display:flex;gap:12px;flex-wrap:wrap;">';
    var deviceIcons = { 'desktop': '🖥️', 'mobile': '📱', 'tablet': '📟' };
    appareils.forEach(function(a) {
      var icon = deviceIcons[a.appareil] || '📟';
      html += '<div style="background:#f0f4f8;padding:10px 16px;border-radius:8px;text-align:center;">';
      html += '<div style="font-size:20px;">' + icon + '</div>';
      html += '<div style="font-weight:bold;">' + a.utilisateurs + '</div>';
      html += '<div style="font-size:12px;color:#666;">' + a.appareil + '</div></div>';
    });
    html += '</div></div>';
  }

  // Événements clés
  if (evenements.length > 0) {
    html += '<div style="background:white;padding:20px 24px;border-bottom:1px solid #eee;">';
    html += sectionTitle('⚡ Événements clés');
    html += '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
    evenements.forEach(function(ev, i) {
      var bg = i % 2 === 0 ? '#f8f9fa' : 'white';
      var label = eventLabels[ev.event] || ev.event;
      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:8px;">' + label + '</td>';
      html += '<td style="padding:8px;text-align:right;font-weight:bold;">' + ev.count + 'x</td>';
      html += '</tr>';
    });
    html += '</table></div>';
  }

  // Liens dashboards
  html += '<div style="background:white;padding:24px;border-radius:0 0 12px 12px;">';
  html += sectionTitle('🔗 Accès rapide aux dashboards');
  html += '<table style="width:100%;border-collapse:collapse;">';
  html += dashboardLink('📊 Google Analytics', CONFIG.GA4_URL, 'Détails complets du trafic');
  html += dashboardLink('🔥 Microsoft Clarity', CONFIG.CLARITY_URL, 'Heatmaps + enregistrements vidéo');
  html += dashboardLink('🏢 Leadfeeder', CONFIG.LEADFEEDER_URL, 'Entreprises qui ont visité');
  html += dashboardLink('💼 LinkedIn Insights', 'https://www.linkedin.com/campaignmanager', 'Demographics professionnelles');
  html += '</table></div>';

  // Footer
  html += '<div style="text-align:center;padding:16px;font-size:12px;color:#999;">';
  html += 'Rapport automatique — baouch.fr<br>Généré le ' + dateFR + ' à 21h';
  html += '</div>';

  html += '</div>';
  return html;
}

// ── Helpers HTML ───────────────────────────────────────────────────────────

function kpiCell(icon, value, label) {
  return '<td style="padding:16px;">'
    + '<div style="font-size:20px;">' + icon + '</div>'
    + '<div style="font-size:28px;font-weight:bold;color:#1a1a2e;">' + value + '</div>'
    + '<div style="font-size:12px;color:#888;">' + label + '</div>'
    + '</td>';
}

function sectionTitle(text) {
  return '<h2 style="font-size:16px;margin:0 0 12px;color:#1a1a2e;">' + text + '</h2>';
}

function dashboardLink(name, url, desc) {
  return '<tr><td style="padding:8px 0;">'
    + '<a href="' + url + '" style="color:#2f6e9b;text-decoration:none;font-weight:bold;">' + name + '</a>'
    + '<br><span style="font-size:12px;color:#888;">' + desc + '</span>'
    + '</td></tr>';
}

function truncate(str, max) {
  return str.length > max ? str.substring(0, max) + '…' : str;
}
