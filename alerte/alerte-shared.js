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
