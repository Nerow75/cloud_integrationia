/* ==========================================================
   Mobile : menu latéral en tiroir et recherche dépliable
   ========================================================== */
(() => {
  'use strict';

  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.querySelector('.backdrop');
  const topbar = document.querySelector('.topbar');
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.getElementById('search-input');
  const mobile = window.matchMedia('(max-width: 767px)');

  /* ---------- Menu ---------- */
  const isOpen = () => document.body.classList.contains('is-menu-open');

  function setMenu(open) {
    document.body.classList.toggle('is-menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    backdrop.hidden = !open;
    if (open) {
      sidebar.querySelector('a').focus();
    } else if (sidebar.contains(document.activeElement)) {
      menuBtn.focus();
    }
  }

  menuBtn.addEventListener('click', () => setMenu(!isOpen()));
  backdrop.addEventListener('click', () => setMenu(false));

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (isOpen()) setMenu(false);
    if (topbar.classList.contains('is-search-open')) setSearch(false);
  });

  // Repasser en tablette ou desktop referme le tiroir
  mobile.addEventListener('change', (e) => {
    if (!e.matches) {
      setMenu(false);
      setSearch(false);
    }
  });

  /* ---------- Recherche ---------- */
  function setSearch(open) {
    topbar.classList.toggle('is-search-open', open);
    searchBtn.setAttribute('aria-expanded', String(open));
    if (open) searchInput.focus();
  }

  searchBtn.addEventListener('click', () => {
    setSearch(!topbar.classList.contains('is-search-open'));
  });
})();
