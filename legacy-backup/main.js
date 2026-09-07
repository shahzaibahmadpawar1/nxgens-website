/* NexGen Build Company — site scripts (multi-page) */

var currentLang = 'en';

// ─── THEME (toggle-theme on html/body, localStorage "theme") ───
function applyTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') theme = 'light';
  document.documentElement.setAttribute('toggle-theme', theme);
  document.body.setAttribute('toggle-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {}
  window.dispatchEvent(new Event('themeChange'));
  refreshThemeAria();
}

function refreshThemeAria() {
  var dark = document.documentElement.getAttribute('toggle-theme') === 'dark';
  var ar = currentLang === 'ar';
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute(
      'aria-label',
      ar
        ? dark
          ? 'التبديل إلى الوضع الفاتح'
          : 'التبديل إلى الوضع الداكن'
        : dark
          ? 'Switch to light mode'
          : 'Switch to dark mode'
    );
  });
}

function initTheme() {
  var t;
  try {
    t = localStorage.getItem('theme');
  } catch (e) {
    t = null;
  }
  if (t !== 'light' && t !== 'dark') t = 'light';
  applyTheme(t);
}

function toggleTheme() {
  var cur = document.documentElement.getAttribute('toggle-theme') || 'light';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

document.querySelectorAll('.theme-toggle').forEach(function (btn) {
  btn.addEventListener('click', toggleTheme);
});

// ─── TABS (services page) ───
function showTab(name) {
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  document.querySelectorAll('.service-detail').forEach(function (d) {
    d.classList.remove('active');
  });
  var btn = document.getElementById('tab-' + name);
  var det = document.getElementById('detail-' + name);
  if (btn) btn.classList.add('active');
  if (det) det.classList.add('active');
  try {
    history.replaceState(null, '', '#' + name);
  } catch (e) {}
}

function initServicesHash() {
  if (!document.getElementById('tab-general')) return;
  var hash = (location.hash || '').replace(/^#/, '');
  var allowed = ['general', 'electrical', 'sanitary', 'hvac', 'waterproofing', 'fire'];
  if (hash && allowed.indexOf(hash) !== -1) {
    showTab(hash);
  }
}

// ─── LANGUAGE ───
function setLang(lang) {
  currentLang = lang;
  document.body.classList.toggle('arabic', lang === 'ar');
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-en]').forEach(function (el) {
    var text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (text.indexOf('<') !== -1) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll('select option[data-en]').forEach(function (opt) {
    var text = opt.getAttribute('data-' + lang);
    if (text) opt.textContent = text;
  });

  var placeholders = {
    firstName: { en: 'John', ar: 'أحمد' },
    lastName: { en: 'Smith', ar: 'المحمد' },
    email: { en: 'john@company.com', ar: 'ahmed@company.com' },
    phone: { en: '+966 5X XXX XXXX', ar: '+966 5X XXX XXXX' },
    message: {
      en: 'Tell us about your project, timeline, and requirements...',
      ar: 'أخبرنا عن مشروعك والجدول الزمني والمتطلبات...',
    },
  };
  Object.keys(placeholders).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.placeholder = placeholders[id][lang] || placeholders[id].en;
  });

  ['btn-en', 'btn-ar', 'm-btn-en', 'm-btn-ar'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.toggle('active', btn.id.indexOf(lang) !== -1);
  });

  var gh = document.getElementById('featured-hover-gallery');
  if (gh) {
    var act = gh.querySelector('.gallery-hover-slide.is-active');
    if (act) {
      var altKey = lang === 'ar' ? 'ar' : 'en';
      act.setAttribute('alt', act.getAttribute('data-alt-' + altKey) || act.getAttribute('data-alt-en') || '');
    }
  }

  initHeroTypewriter();
  refreshThemeAria();
  try {
    localStorage.setItem('nx-lang', lang);
  } catch (e) {}
}

function initLangFromStorage() {
  var saved;
  try {
    saved = localStorage.getItem('nx-lang') || localStorage.getItem('lang');
  } catch (e) {
    saved = null;
  }
  if (saved === 'ar' || saved === 'en') setLang(saved);
}

/* Hero headline typewriter */
var HERO_TW_WORDS = {
  en: ['Infrastructure', 'Fabrication', 'Excellence', 'Precision', 'Capabilities'],
  ar: ['البنية التحتية', 'التصنيع', 'التميز', 'الدقة', 'القدرات'],
};
var heroTwCancel = null;
var heroTwBlink = null;

function initHeroTypewriter() {
  if (heroTwCancel) {
    heroTwCancel();
    heroTwCancel = null;
  }
  if (heroTwBlink) {
    clearInterval(heroTwBlink);
    heroTwBlink = null;
  }

  var textEl = document.getElementById('hero-typewriter-text');
  var cursorEl = document.querySelector('.hero-typewriter-cursor');
  if (!textEl || !cursorEl) return;

  var words = HERO_TW_WORDS[currentLang] || HERO_TW_WORDS.en;
  var wi = 0;
  var ci = 0;
  var del = false;
  var alive = true;
  var tid = null;

  function clearTid() {
    if (tid) {
      clearTimeout(tid);
      tid = null;
    }
  }

  heroTwBlink = setInterval(function () {
    cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
  }, 500);

  function schedule(fn, ms) {
    clearTid();
    tid = setTimeout(fn, ms);
  }

  function step() {
    if (!alive) return;
    var w = words[wi % words.length];
    if (!del && ci < w.length) {
      textEl.textContent = w.slice(0, ci + 1);
      ci++;
      schedule(step, 100);
    } else if (!del && ci === w.length) {
      schedule(function () {
        del = true;
        step();
      }, 1000);
    } else if (del && ci > 0) {
      ci--;
      textEl.textContent = w.slice(0, ci);
      schedule(step, 60);
    } else if (del && ci === 0) {
      wi = (wi + 1) % words.length;
      del = false;
      schedule(step, 1000);
    }
  }

  textEl.textContent = '';
  ci = 0;
  wi = 0;
  del = false;
  cursorEl.style.opacity = '1';
  step();

  heroTwCancel = function () {
    alive = false;
    clearTid();
    if (heroTwBlink) {
      clearInterval(heroTwBlink);
      heroTwBlink = null;
    }
  };
}

function loaderEaseLC(t) {
  if (t < 0.25) return 3.2 * t * t;
  if (t < 0.65) {
    var a = (t - 0.25) / 0.4;
    return 0.2 + a * 0.5;
  }
  if (t < 0.88) {
    var b = (t - 0.65) / 0.23;
    return 0.7 + Math.pow(b, 1.5) * 0.18;
  }
  var f = (t - 0.88) / 0.12;
  return 0.88 + Math.pow(f, 4) * 0.12;
}

function clampLC(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function formatCounterValue(v, pad, decimals) {
  if (decimals > 0) {
    var s = v.toFixed(decimals);
    return s.replace(/\.?0+$/, '') || '0';
  }
  var n = Math.round(v);
  if (pad > 0) return String(n).padStart(pad, '0');
  return String(n);
}

function setupLoaderCounter(el) {
  if (el.dataset.counterBound) return;
  el.dataset.counterBound = '1';

  var from = parseFloat(el.dataset.from != null ? el.dataset.from : '0');
  var to = parseFloat(el.dataset.to != null ? el.dataset.to : '0');
  var mode = el.dataset.mode === 'linear' ? 'linear' : 'loader';
  var duration = (parseFloat(el.dataset.duration) || (mode === 'loader' ? 2.2 : 1.1)) * 1000;
  var pad = parseInt(el.dataset.pad || '0', 10) || 0;
  var decimals = parseInt(el.dataset.decimals || '0', 10) || 0;
  var prefix = el.dataset.prefix || '';
  var suffix = el.dataset.suffix || '';
  var finishSymbol = el.dataset.finishSymbol || '';
  var attrName = el.dataset.counterAttr || '';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyEnd() {
    if (attrName) {
      el.setAttribute(attrName, formatCounterValue(to, pad, decimals));
    } else if (finishSymbol) {
      el.textContent = finishSymbol;
    } else {
      el.textContent = prefix + formatCounterValue(to, pad, decimals) + suffix;
    }
    el.dataset.counterDone = '1';
  }

  if (attrName) {
    el.setAttribute(attrName, formatCounterValue(from, pad, decimals));
  } else if (finishSymbol) {
    el.textContent = formatCounterValue(from, pad, decimals);
  } else {
    el.textContent = prefix + formatCounterValue(from, pad, decimals) + suffix;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(el);
        if (reduced) {
          applyEnd();
          return;
        }
        var start = performance.now();
        function frame(now) {
          var t = clampLC((now - start) / duration, 0, 1);
          var eased = mode === 'loader' ? loaderEaseLC(t) : t;
          var v = from + (to - from) * eased;
          if (attrName) {
            el.setAttribute(attrName, formatCounterValue(v, pad, decimals));
          } else if (finishSymbol) {
            el.textContent = formatCounterValue(v, pad, decimals);
          } else {
            el.textContent = prefix + formatCounterValue(v, pad, decimals) + suffix;
          }
          if (t < 1) requestAnimationFrame(frame);
          else applyEnd();
        }
        requestAnimationFrame(frame);
      });
    },
    { threshold: 0.08 }
  );
  io.observe(el);
}

function setupCapabilityCardNum(card) {
  if (card.dataset.counterCardBound) return;
  card.dataset.counterCardBound = '1';
  var finalStr = card.getAttribute('data-num');
  if (!finalStr) return;
  var to = parseInt(finalStr, 10);
  if (isNaN(to)) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(card);
        if (reduced) {
          card.setAttribute('data-num', finalStr);
          return;
        }
        var start = performance.now();
        var duration = 1800;
        function frame(now) {
          var t = clampLC((now - start) / duration, 0, 1);
          var eased = loaderEaseLC(t);
          var v = Math.round(to * eased);
          card.setAttribute('data-num', String(v).padStart(2, '0'));
          if (t < 1) requestAnimationFrame(frame);
          else card.setAttribute('data-num', finalStr);
        }
        requestAnimationFrame(frame);
      });
    },
    { threshold: 0.06 }
  );
  io.observe(card);
}

function initLoaderCounters() {
  document.querySelectorAll('.loader-counter').forEach(setupLoaderCounter);
  document.querySelectorAll('.capability-card[data-num]').forEach(setupCapabilityCardNum);
}

function initScrollReveal() {
  var items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!items.length) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    items.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );
  items.forEach(function (el) {
    obs.observe(el);
  });
}

function initHoverImageGallery() {
  var root = document.getElementById('featured-hover-gallery');
  if (!root) return;
  var slides = root.querySelectorAll('.gallery-hover-slide');
  var rows = root.querySelectorAll('.gallery-hover-row');
  if (!slides.length || !rows.length) return;

  function setActive(i) {
    var n = slides.length;
    var idx = ((i % n) + n) % n;
    slides.forEach(function (s, j) {
      var on = j === idx;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
      if (on) {
        var lang = currentLang === 'ar' ? 'ar' : 'en';
        var alt = s.getAttribute('data-alt-' + lang) || s.getAttribute('data-alt-en') || '';
        s.setAttribute('alt', alt);
      } else {
        s.setAttribute('alt', '');
      }
    });
    rows.forEach(function (r, j) {
      var on = j === idx;
      r.classList.toggle('is-active', on);
      if (on) r.setAttribute('aria-current', 'true');
      else r.removeAttribute('aria-current');
    });
  }

  rows.forEach(function (row, i) {
    row.addEventListener('mouseenter', function () {
      setActive(i);
    });
    row.addEventListener('focusin', function () {
      setActive(i);
    });
    row.addEventListener(
      'touchstart',
      function () {
        setActive(i);
      },
      { passive: true }
    );
  });

  setActive(0);
}

function initHeroInfiniteGrids() {
  var heroes = document.querySelectorAll('.about-hero, .services-hero, .workshop-hero, .contact-hero');
  if (!heroes.length) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  Array.prototype.forEach.call(heroes, function (hero) {
    hero.addEventListener(
      'pointermove',
      function (e) {
        var r = hero.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        hero.style.setProperty('--hero-grid-x', x + '%');
        hero.style.setProperty('--hero-grid-y', y + '%');
      },
      { passive: true }
    );
    hero.addEventListener('pointerleave', function () {
      hero.style.removeProperty('--hero-grid-x');
      hero.style.removeProperty('--hero-grid-y');
    });
  });
}

function initHeroCardstack() {
  var root = document.getElementById('hero-cardstack');
  if (!root) return;
  var cards = root.querySelectorAll('.hero-cardstack-card');
  if (!cards.length) return;
  var list = Array.prototype.slice.call(cards);
  var n = list.length;
  var front = 0;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    list.forEach(function (card, i) {
      var depth = (i - front + n) % n;
      card.style.setProperty('--depth', String(depth));
      card.classList.toggle('is-front', depth === 0);
    });
  }

  function advance() {
    front = (front + 1) % n;
    render();
  }

  var timer = null;
  function startAutoAdvance() {
    if (reduced || timer !== null) return;
    timer = window.setInterval(advance, 5200);
  }
  function stopAutoAdvance() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  render();
  startAutoAdvance();

  root.addEventListener('mouseenter', stopAutoAdvance);
  root.addEventListener('mouseleave', startAutoAdvance);
  root.addEventListener('focusin', stopAutoAdvance);
  root.addEventListener('focusout', function () {
    window.setTimeout(function () {
      if (!root.contains(document.activeElement)) startAutoAdvance();
    }, 0);
  });

  root.addEventListener('click', advance);
  root.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      advance();
    }
  });

  window.addEventListener(
    'beforeunload',
    function () {
      stopAutoAdvance();
    },
    { once: true }
  );
}

function toggleMobile() {
  var m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

function submitForm() {
  var first = document.getElementById('firstName');
  var email = document.getElementById('email');
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  if (!first || !email || !contactForm || !formSuccess) return;
  if (!first.value.trim() || !email.value.trim()) {
    var msg =
      currentLang === 'ar'
        ? 'يرجى ملء الاسم والبريد الإلكتروني.'
        : 'Please fill in your name and email.';
    alert(msg);
    return;
  }
  contactForm.style.display = 'none';
  formSuccess.classList.add('show');
}

function resetForm() {
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  if (contactForm) contactForm.style.display = 'block';
  if (formSuccess) formSuccess.classList.remove('show');
  ['firstName', 'lastName', 'email', 'phone', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  var sel = document.getElementById('service');
  if (sel) sel.selectedIndex = 0;
}

// ─── Boot ───
function initMobileMenuCloseOnNavigate() {
  var menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.querySelectorAll('a[href]').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  });
}

initTheme();
initServicesHash();
initMobileMenuCloseOnNavigate();
initLangFromStorage();

initHeroTypewriter();
initLoaderCounters();
initScrollReveal();
initHoverImageGallery();
initHeroInfiniteGrids();
initHeroCardstack();

(function () {
  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.about-story-video').forEach(function (el) {
    el.removeAttribute('autoplay');
    try {
      el.pause();
    } catch (e) {}
  });
})();

window.addEventListener(
  'scroll',
  function () {
    var nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  },
  { passive: true }
);

document.addEventListener('click', function (e) {
  if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
    var m = document.getElementById('mobileMenu');
    if (m) m.classList.remove('open');
  }
});
