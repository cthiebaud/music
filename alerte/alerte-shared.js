// Shared between index.html and paroles.html: language detection and the
// bits of copy that appear identically on both pages' headers.

const ALERTE_AVAILABLE_LANGS = ['en', 'fr', 'it', 'de', 'es'];

const ALERTE_SUBTITLE_BY_LANG = {
  en: 'Fourteen Shades of Alerte',
  fr: "Quatorze nuances d'Alerte",
  it: 'Quattordici sfumature di Alerte',
  de: 'Vierzehn Schattierungen von Alerte',
  es: 'Catorce sombras de Alerte'
};

const ALERTE_NAV_LABELS = {
  music: { en: 'Music', fr: 'Musique', it: 'Musica', de: 'Musik', es: 'Música' },
  lyrics: { en: 'Lyrics', fr: 'Paroles', it: 'Testi', de: 'Texte', es: 'Letras' }
};

function detectAlerteLang() {
  const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
  return ALERTE_AVAILABLE_LANGS.includes(browserLang) ? browserLang : 'en';
}

// Open `url` in the browsing context named `name`, reusing an already-open
// tab without reloading it when it's already showing the right page — a
// plain <a target="name"> would still reload that tab even if it's already
// on that exact URL, which resets in-page state (e.g. playing audio).
function openOrFocusNamed(url, name) {
  const win = window.open('', name);
  if (!win) return; // popup blocked; let the native link fall back

  const target = new URL(url, window.location.href);

  if (!win.location.href || win.location.href === 'about:blank') {
    win.location.href = target.href;
  } else {
    const current = new URL(win.location.href);
    if (current.pathname !== target.pathname) {
      win.location.href = target.href;
    } else if (current.hash !== target.hash) {
      win.location.hash = target.hash || '';
    }
  }

  win.focus();
}
