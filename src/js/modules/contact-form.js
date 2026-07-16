// Formulaire de contact — EmailJS (mêmes service/template que l'ancien site),
// enrichi des données visiteur de visitor-intelligence quand disponibles.
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = 'ZyE4jMNSgESAa42sB';
const SERVICE_ID = 'service_w29506o';
const TEMPLATE_ID = 'template_2mkwm8s';

function visitorData() {
  try {
    const vi = window.VisitorIntelligence?.get?.();
    if (!vi) return {};
    const pages = (vi.pages || []).slice(-10).map((p) => p.path).join(' → ');
    const utm = vi.utmHistory?.length ? JSON.stringify(vi.utmHistory[vi.utmHistory.length - 1]) : '';
    return {
      visitor_id: vi.id || '',
      visits: vi.visits || 1,
      first_visit: vi.firstVisit || '',
      pages_visited: pages,
      source: vi.source || '',
      utm,
      device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      visitor_language: navigator.language,
    };
  } catch {
    return {};
  }
}

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  emailjs.init(PUBLIC_KEY);

  const btn = document.getElementById('submit-btn');
  const btnText = document.getElementById('button-text');
  const btnLoading = document.getElementById('button-loading');
  const success = document.getElementById('form-success');
  const error = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    success.hidden = true;
    error.hidden = true;
    btn.disabled = true;
    btnText.hidden = true;
    btnLoading.hidden = false;

    const vd = visitorData();
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        visitor_id: vd.visitor_id || '',
        visits: vd.visits || '',
        first_visit: vd.first_visit || '',
        pages_visited: vd.pages_visited || '',
        source: vd.source || '',
        utm: vd.utm || '',
        device: vd.device || '',
        visitor_language: vd.visitor_language || '',
      });
      success.hidden = false;
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch {
      error.hidden = false;
      error.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      btn.disabled = false;
      btnText.hidden = false;
      btnLoading.hidden = true;
    }
  });
}
