// Shared between index.html and paroles.html: language detection and the
// bits of copy that appear identically on both pages' headers.

const ALERTE_AVAILABLE_LANGS = ['en', 'fr', 'it', 'de', 'es'];

const ALERTE_SUBTITLE_BY_LANG = {
  en: 'Exercises in Style',
  fr: 'Exercices de style',
  it: 'Esercizi di stile',
  de: 'Stilübungen',
  es: 'Ejercicios de estilo'
};

// A nod to Raymond Queneau's book of the same name — 99 retellings of one
// trivial story, the literary equivalent of this page's musical variations.
// No Spanish Wikipedia article exists, so the Spanish subtitle links to the
// English one rather than the loosely-related Catalan edition.
const ALERTE_SUBTITLE_LINK_BY_LANG = {
  en: 'https://en.wikipedia.org/wiki/Exercises_in_Style',
  fr: 'https://fr.wikipedia.org/wiki/Exercices_de_style',
  it: 'https://it.wikipedia.org/wiki/Esercizi_di_stile',
  de: 'https://de.wikipedia.org/wiki/Stil%C3%BCbungen_(Queneau)',
  es: 'https://en.wikipedia.org/wiki/Exercises_in_Style'
};

// Sober, pun-free: just how many variations are on the page. Update by hand
// whenever a numbered variant is added or removed (not the Original track,
// and not any of the non-Alerte bonus tracks like Guess What or Matsubaba).
const ALERTE_SUBTITLE_COUNT_BY_LANG = {
  en: 'Thirty Variations on Alerte',
  fr: "Trente variations d'Alerte",
  it: 'Trenta variazioni di Alerte',
  de: 'Dreißig Variationen von Alerte',
  es: 'Treinta variaciones de Alerte'
};

const ALERTE_AUTHOR_BY_LANG = {
  en: {
    heading: 'Authors',
    mugnier: 'Éric Mugnier: lyrics 100%, music 98%.',
    thiebaud: 'Christophe Thiebaud: music 2%, production 100%.'
  },
  fr: {
    heading: 'Auteurs',
    mugnier: 'Éric Mugnier : paroles 100 %, musique 98 %.',
    thiebaud: 'Christophe Thiebaud : musique 2 %, production 100 %.'
  },
  it: {
    heading: 'Autori',
    mugnier: 'Éric Mugnier: testo 100%, musica 98%.',
    thiebaud: 'Christophe Thiebaud: musica 2%, produzione 100%.'
  },
  de: {
    heading: 'Autoren',
    mugnier: 'Éric Mugnier: Text 100 %, Musik 98 %.',
    thiebaud: 'Christophe Thiebaud: Musik 2 %, Produktion 100 %.'
  },
  es: {
    heading: 'Autores',
    mugnier: 'Éric Mugnier: letra 100%, música 98%.',
    thiebaud: 'Christophe Thiebaud: música 2%, producción 100%.'
  }
};

// Update by hand whenever a substantive change is made to the page.
const ALERTE_LAST_UPDATED_BY_LANG = {
  en: 'Last updated: October 7, 2026.',
  fr: 'Dernière mise à jour : 7 octobre 2026.',
  it: 'Ultimo aggiornamento: 7 ottobre 2026.',
  de: 'Letzte Aktualisierung: 7. Oktober 2026.',
  es: 'Última actualización: 7 de octubre de 2026.'
};

const ALERTE_ABOUT_LABELS = {
  en: { trigger: 'About', title: 'About "Alerte"', then: '1984', now: 'Now' },
  fr: { trigger: 'À propos', title: '« Alerte », en coulisses', then: '1984', now: "Aujourd'hui" },
  it: { trigger: 'Info', title: 'Dietro le quinte di "Alerte"', then: '1984', now: 'Oggi' },
  de: { trigger: 'Info', title: 'Hinter den Kulissen von „Alerte“', then: '1984', now: 'Heute' },
  es: { trigger: 'Acerca de', title: 'Detrás de "Alerte"', then: '1984', now: 'Ahora' }
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
