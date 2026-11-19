/* ==========================================================
   Graphique "Chiffre d'affaires" en SVG, JavaScript vanilla
   Les dimensions (hauteur du tracé, largeur de l'axe, pas des
   libellés) viennent des variables CSS de .chart, donc des
   media queries : desktop/tablette 218px, mobile 160px.
   ========================================================== */
(() => {
  'use strict';

  // Valeurs relevées sur la courbe de la maquette Figma
  const DATA = [
    { day: 'Lun', label: 'Lundi 1 oct.', value: 0 },
    { day: 'Mar', label: 'Mardi 2 oct.', value: 5500 },
    { day: 'Mer', label: 'Mercredi 3 oct.', value: 7100 },
    { day: 'Jeu', label: 'Jeudi 4 oct.', value: 13100 },
    { day: 'Ven', label: 'Vendredi 5 oct.', value: 17900 },
    { day: 'Sam', label: 'Samedi 6 oct.', value: 20400 },
    { day: 'Dim', label: 'Dimanche 7 oct.', value: 30000 }
  ];

  const Y_MAX = 30000;
  const Y_STEP = 10000;
  const LABEL_GAP = 8;      // espace entre le tracé et l'axe horizontal
  const LABEL_H = 12;       // hauteur des libellés (10px)
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const axisLabel = (v) => (v === 0 ? '0' : `${v / 1000}k`);

  const figure = document.getElementById('revenue-chart');
  const dataBody = document.getElementById('revenue-data');
  if (!figure) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let firstRender = true;

  /* ---------- Tableau accessible (lecteurs d'écran) ---------- */
  if (dataBody) {
    dataBody.innerHTML = DATA
      .map((d) => `<tr><th scope="row">${d.label}</th><td>${euro.format(d.value)}</td></tr>`)
      .join('');
  }

  /* ---------- Éléments persistants ---------- */
  const svg = createEl('svg', { 'aria-hidden': 'true', focusable: 'false' });
  figure.prepend(svg);

  const tooltip = document.createElement('div');
  tooltip.className = 'chart__tooltip';
  tooltip.setAttribute('aria-hidden', 'true');
  figure.append(tooltip);

  /* ---------- Utilitaires ---------- */
  function createEl(name, attrs = {}) {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  }

  function cssNumber(style, name, fallback) {
    const n = parseFloat(style.getPropertyValue(name));
    return Number.isFinite(n) ? n : fallback;
  }

  /** Courbe lisse monotone (Fritsch-Carlson) : pas de dépassement sous 0. */
  function monotonePath(p) {
    const n = p.length;
    const dx = [];
    const m = [];
    const t = new Array(n);

    for (let i = 0; i < n - 1; i++) {
      dx[i] = p[i + 1].x - p[i].x;
      m[i] = (p[i + 1].y - p[i].y) / dx[i];
    }
    t[0] = m[0];
    t[n - 1] = m[n - 2];
    for (let i = 1; i < n - 1; i++) {
      t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
    }
    for (let i = 0; i < n - 1; i++) {
      if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
      const a = t[i] / m[i];
      const b = t[i + 1] / m[i];
      const s = a * a + b * b;
      if (s > 9) {
        const k = 3 / Math.sqrt(s);
        t[i] = k * a * m[i];
        t[i + 1] = k * b * m[i];
      }
    }

    let d = `M${p[0].x},${p[0].y}`;
    for (let i = 0; i < n - 1; i++) {
      const h = dx[i] / 3;
      d += ` C${p[i].x + h},${p[i].y + h * t[i]} ${p[i + 1].x - h},${p[i + 1].y - h * t[i + 1]} ${p[i + 1].x},${p[i + 1].y}`;
    }
    return d;
  }

  /* ---------- Rendu ---------- */
  function render() {
    const style = getComputedStyle(figure);
    const plotH = cssNumber(style, '--plot-h', 218);
    const axisW = cssNumber(style, '--axis-w', 38);
    const axisGap = cssNumber(style, '--axis-gap', 12);
    const xStep = Math.max(1, cssNumber(style, '--x-step', 1));

    const width = figure.clientWidth;
    if (!width) return;
    const height = plotH + LABEL_GAP + LABEL_H;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('height', height);
    svg.replaceChildren();

    const left = axisW + axisGap;
    const plotW = width - left;
    const x = (i) => left + (plotW * i) / (DATA.length - 1);
    const y = (v) => plotH - (plotH * v) / Y_MAX;

    // Grille + axe vertical (libellés alignés comme dans la maquette)
    const grid = createEl('g', { class: 'chart__grid' });
    const axis = createEl('g', { class: 'chart__axis' });
    for (let v = 0; v <= Y_MAX; v += Y_STEP) {
      grid.append(createEl('line', { x1: left, x2: width, y1: y(v), y2: y(v) }));
      const ly = Math.min(Math.max(y(v), LABEL_H / 2), plotH - LABEL_H / 2);
      const label = createEl('text', { x: axisW, y: ly, 'text-anchor': 'end', 'dominant-baseline': 'central' });
      label.textContent = axisLabel(v);
      axis.append(label);
    }

    // Axe horizontal (1 jour sur 2 sur mobile)
    DATA.forEach((d, i) => {
      if (i % xStep !== 0) return;
      const anchor = i === 0 ? 'start' : i === DATA.length - 1 ? 'end' : 'middle';
      const label = createEl('text', { x: x(i), y: plotH + LABEL_GAP, 'text-anchor': anchor, 'dominant-baseline': 'hanging' });
      label.textContent = d.day;
      axis.append(label);
    });

    // Courbe
    const points = DATA.map((d, i) => ({ x: x(i), y: y(d.value) }));
    const line = createEl('path', { class: 'chart__line', d: monotonePath(points) });

    // Repère vertical (survol)
    const guide = createEl('line', { class: 'chart__guide', y1: 0, y2: plotH, visibility: 'hidden' });

    // Points
    const dots = createEl('g');
    const circles = points.map((p) => {
      const c = createEl('circle', { class: 'chart__point', cx: p.x, cy: p.y, r: 3 });
      dots.append(c);
      return c;
    });

    // Zone de capture du pointeur
    const hit = createEl('rect', { x: left, y: 0, width: plotW, height: plotH, fill: 'transparent' });

    svg.append(grid, axis, guide, line, dots, hit);

    // Animation de tracé au premier affichage
    if (firstRender && !reduceMotion) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.getBoundingClientRect(); // force le reflow
      line.style.transition = 'stroke-dashoffset 1s ease-out';
      line.style.strokeDashoffset = '0';
      line.addEventListener('transitionend', () => {
        line.style.strokeDasharray = '';
        line.style.strokeDashoffset = '';
        line.style.transition = '';
      }, { once: true });
    }
    firstRender = false;

    /* ---------- Interaction ---------- */
    let active = -1;

    function show(i) {
      if (i === active) return;
      if (active > -1) circles[active].classList.remove('is-active');
      active = i;
      const p = points[i];
      circles[i].classList.add('is-active');
      guide.setAttribute('x1', p.x);
      guide.setAttribute('x2', p.x);
      guide.setAttribute('visibility', 'visible');

      tooltip.innerHTML = `${DATA[i].label}<strong>${euro.format(DATA[i].value)}</strong>`;
      tooltip.style.left = `${p.x}px`;
      tooltip.style.top = `${p.y}px`;
      tooltip.classList.add('is-visible');
    }

    function hide() {
      if (active > -1) circles[active].classList.remove('is-active');
      active = -1;
      guide.setAttribute('visibility', 'hidden');
      tooltip.classList.remove('is-visible');
    }

    hit.addEventListener('pointermove', (e) => {
      const box = svg.getBoundingClientRect();
      const px = e.clientX - box.left;
      const i = Math.round(((px - left) / plotW) * (DATA.length - 1));
      show(Math.max(0, Math.min(DATA.length - 1, i)));
    });
    hit.addEventListener('pointerleave', hide);
  }

  /* ---------- Redimensionnement ---------- */
  let frame = 0;
  let lastWidth = 0;
  new ResizeObserver(() => {
    if (figure.clientWidth === lastWidth) return;
    lastWidth = figure.clientWidth;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(render);
  }).observe(figure);
})();
