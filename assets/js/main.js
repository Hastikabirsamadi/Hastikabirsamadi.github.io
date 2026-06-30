/* ============================================================
   HASTI KABIRSAMADI — Portfolio JS
   ============================================================ */

(function () {
  'use strict';

  /* ── RNA SEQ BACKGROUND ─────────────────────────────────── */
  function buildSeqBg() {
    var el = document.querySelector('.hero-seq-bg');
    if (!el) return;
    var bases = 'AUGCAUGCAUGCAUGCAUGCUAGCUAGCUAGCUAGCGCAUGCUAGCAUGCUAGCGCUA';
    var cols = Math.ceil(window.innerWidth / 9.6);
    var rows = Math.ceil(window.innerHeight / 22);
    var total = cols * rows;
    var out = [];
    for (var i = 0; i < total; i++) {
      out.push(bases[Math.floor(Math.random() * bases.length)]);
      if ((i + 1) % cols === 0) out.push('\n');
    }
    el.textContent = out.join('');
  }

  /* ── NAV HAMBURGER ──────────────────────────────────────── */
  function initHamburger() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('.nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── NAV ACTIVE SECTION ─────────────────────────────────── */
  function initNavActive() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length) return;

    var active = null;
    function setActive(id) {
      if (active === id) return;
      active = id;
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  function initReveal() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = document.querySelectorAll('.reveal');

    if (prefersReduced) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── STAGGER DELAY ──────────────────────────────────────── */
  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach(function (parent) {
      var delay = parseFloat(parent.dataset.stagger) || 0.08;
      parent.querySelectorAll('.reveal').forEach(function (child, i) {
        child.style.transitionDelay = (i * delay) + 's';
      });
    });
  }

  /* ── NAV BG ON SCROLL ───────────────────────────────────── */
  function initNavShadow() {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── SMOOTH SCROLL WITH NAV OFFSET ─────────────────────── */
  function initSmoothScroll() {
    var navH = 64;
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  function init() {
    buildSeqBg();
    initHamburger();
    initNavActive();
    initReveal();
    initStagger();
    initNavShadow();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
