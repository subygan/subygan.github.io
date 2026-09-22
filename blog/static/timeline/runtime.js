/* Timeline runtime
 * --------------------------------------------------------------------------
 * Reads <script data-timeline-config="<name>"> JSON emitted by the shortcode,
 * sizes the gap spacers from a piecewise pxPerYear scale, and dispatches each
 * section to a registered scene handler.
 *
 * Add a new scene type:
 *   1. Drop a partial at layouts/partials/timeline/scenes/<type>.html
 *   2. Below, call Timeline.register('<type>', { mount(el) { ... } })
 *
 * The escape hatch is `scene.type: custom` in the YAML; pair with
 * `scene.partial: "<name>"` to render a hand-authored partial. Register a
 * handler under the same partial name (or it falls back to `_default`).
 */
(function () {
  'use strict';

  const Timeline = (window.Timeline = window.Timeline || {
    scenes: {},
    register(type, def) { this.scenes[type] = def; },
  });

  // -- date math -----------------------------------------------------------

  // Pixels between two years given a piecewise [{from, to, pxPerYear}] scale.
  // Years outside any segment contribute nothing (caller controls coverage).
  function pxBetween(a, b, scale) {
    if (!scale || scale.length === 0) return Math.abs(b - a) * 0.5;
    const lo = Math.min(a, b), hi = Math.max(a, b);
    let total = 0;
    for (const seg of scale) {
      const start = Math.max(lo, seg.from);
      const end = Math.min(hi, seg.to);
      if (end > start) total += (end - start) * seg.pxPerYear;
    }
    return total;
  }

  // Pick a "nice" tick step (1, 2, 5, 10 × 10^n) that yields ~5 ticks per gap.
  function niceStep(years) {
    const target = years / 5;
    const pow = Math.pow(10, Math.floor(Math.log10(target)));
    for (const n of [1, 2, 5, 10]) if (n * pow >= target) return n * pow;
    return 10 * pow;
  }

  function formatYear(y) {
    if (y <= -1e6) return (y / -1e6).toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' Mya';
    if (y <= -1e4) return Math.round(y / -1e3).toLocaleString() + ' kya';
    if (y < 0) return Math.abs(Math.round(y)).toLocaleString() + ' BCE';
    if (y === 0) return '0';
    return Math.round(y).toLocaleString();
  }

  function renderGapMarkers(gapEl, fromDate, toDate, heightPx) {
    gapEl.innerHTML = '';
    if (heightPx < 90) { gapEl.classList.add('timeline__gap--minimal'); return; }
    gapEl.classList.remove('timeline__gap--minimal');
    const span = toDate - fromDate;
    if (span <= 0) return;
    const step = niceStep(span);
    const first = Math.ceil(fromDate / step) * step;
    const frag = document.createDocumentFragment();
    for (let y = first; y <= toDate; y += step) {
      const frac = (y - fromDate) / span;
      const tick = document.createElement('div');
      tick.className = 'timeline__tick';
      tick.style.top = (frac * 100) + '%';
      tick.innerHTML =
        '<span class="timeline__tick-line"></span>' +
        '<span class="timeline__tick-label">' + formatYear(y) + '</span>';
      frag.appendChild(tick);
    }
    gapEl.appendChild(frag);
  }

  // -- per-instance setup --------------------------------------------------

  function initOne(root) {
    const cfgScript = root.querySelector('script[data-timeline-config]');
    if (!cfgScript) return;

    let data;
    try { data = JSON.parse(cfgScript.textContent); }
    catch (e) { console.error('[timeline] invalid config JSON', e); return; }

    const cfg = data.config || {};
    const scale = cfg.scale || [];
    const minGap = cfg.minGapPx || 100;

    const sectionEls = Array.from(root.querySelectorAll('[data-section]'));
    const gapEls = Array.from(root.querySelectorAll('[data-gap]'));

    function applyLayout() {
      const vhPx = window.innerHeight / 100;
      sectionEls.forEach((el) => {
        const len = parseFloat(el.dataset.length || '100');
        el.style.minHeight = (len * vhPx) + 'px';
      });
      gapEls.forEach((gap) => {
        const from = parseFloat(gap.dataset.fromDate);
        const to = parseFloat(gap.dataset.toDate);
        const px = Math.max(minGap, pxBetween(from, to, scale));
        gap.style.height = px + 'px';
        renderGapMarkers(gap, from, to, px);
      });
    }

    applyLayout();
    root.classList.add('timeline--ready');

    onGsapReady(() => {
      window.gsap.registerPlugin(window.ScrollTrigger);
      mountScenes(sectionEls);
      initMinimap(root, sectionEls);

      let resizeT;
      window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => {
          applyLayout();
          window.ScrollTrigger.refresh();
        }, 200);
      });
    });
  }

  function onGsapReady(fn) {
    if (window.gsap && window.ScrollTrigger) return fn();
    setTimeout(() => onGsapReady(fn), 50);
  }

  function mountScenes(sectionEls) {
    sectionEls.forEach((el) => {
      const type = el.dataset.sceneType;
      const def = Timeline.scenes[type] || Timeline.scenes._default;
      if (def && def.mount) {
        try { def.mount(el); }
        catch (e) { console.error('[timeline] scene mount error for', type, e); }
      }
    });
  }

  // -- minimap -------------------------------------------------------------

  function initMinimap(root, sectionEls) {
    const mm = root.querySelector('[data-minimap]');
    if (!mm) return;
    const progress = mm.querySelector('[data-minimap-progress]');
    const ticks = Array.from(mm.querySelectorAll('[data-minimap-tick]'));
    const track = root.querySelector('[data-track]');
    if (!track) return;

    function placeTicks() {
      const trackHeight = track.scrollHeight;
      sectionEls.forEach((el, i) => {
        const top = el.offsetTop;
        const frac = top / trackHeight;
        if (ticks[i]) ticks[i].style.top = (frac * 100) + '%';
      });
    }

    function update() {
      const trackRect = track.getBoundingClientRect();
      const trackTop = window.scrollY + trackRect.top;
      const trackHeight = track.scrollHeight;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let frac = (viewportCenter - trackTop) / trackHeight;
      frac = Math.max(0, Math.min(1, frac));
      if (progress) progress.style.height = (frac * 100) + '%';

      let active = -1;
      sectionEls.forEach((el, i) => {
        const elTop = window.scrollY + el.getBoundingClientRect().top;
        if (elTop <= viewportCenter) active = i;
      });
      ticks.forEach((t, i) => t.classList.toggle('is-active', i === active));
    }

    placeTicks();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', () => { placeTicks(); update(); });

    ticks.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        const target = sectionEls[i];
        if (!target) return;
        const top = window.scrollY + target.getBoundingClientRect().top - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // -- scene registry: built-ins ------------------------------------------

  // Helper: scrubbed enter trigger that ties opacity/translate to scroll.
  const enterScrub = (el) => ({
    trigger: el,
    start: 'top 85%',
    end: 'top 30%',
    scrub: 0.5,
  });

  Timeline.register('pin-fade', {
    mount(el) {
      const items = el.querySelectorAll('[data-anim]');
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0, y: 50, stagger: 0.08, duration: 1, ease: 'power2.out',
        scrollTrigger: enterScrub(el),
      });
    },
  });

  Timeline.register('cinematic', {
    mount(el) {
      const glyph = el.querySelector('[data-anim="glyph-zoom"]');
      const title = el.querySelector('[data-anim="title"]');
      const others = el.querySelectorAll(
        '[data-anim="date"], [data-anim="subtitle"], [data-anim="body"], [data-anim="links"]'
      );
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 25%', scrub: 0.6 } });
      if (glyph) tl.from(glyph, { scale: 0.3, opacity: 0, ease: 'power2.out' }, 0);
      if (title) tl.from(title, { y: 80, opacity: 0, ease: 'power3.out' }, 0.1);
      if (others.length) tl.from(others, { opacity: 0, y: 40, stagger: 0.08, ease: 'power2.out' }, 0.25);
    },
  });

  Timeline.register('parallax', {
    mount(el) {
      const layers = el.querySelectorAll('[data-anim="parallax"]');
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0.5;
        gsap.fromTo(
          layer,
          { xPercent: -30 * depth - 10 },
          {
            xPercent: 30 * depth + 10,
            ease: 'none',
            scrollTrigger: {
              trigger: el, start: 'top bottom', end: 'bottom top', scrub: true,
            },
          }
        );
      });
      const fg = el.querySelectorAll('.scene__foreground [data-anim]');
      if (fg.length) {
        gsap.from(fg, {
          opacity: 0, y: 40, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: enterScrub(el),
        });
      }
    },
  });

  Timeline.register('split', {
    mount(el) {
      const isLeft = el.classList.contains('scene--side-left');
      const glyphSide = el.querySelector('[data-anim="glyph-slide"]');
      const copySide = el.querySelector('[data-anim="copy-slide"]');
      if (glyphSide) {
        gsap.from(glyphSide, {
          x: isLeft ? -140 : 140, opacity: 0, ease: 'power2.out',
          scrollTrigger: enterScrub(el),
        });
      }
      if (copySide) {
        const inner = copySide.querySelectorAll('[data-anim]');
        gsap.from(inner, {
          x: isLeft ? 80 : -80, opacity: 0, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: enterScrub(el),
        });
      }
    },
  });

  Timeline.register('custom', {
    mount(el) {
      const items = el.querySelectorAll('[data-anim]');
      if (items.length) {
        gsap.from(items, {
          opacity: 0, y: 40, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: enterScrub(el),
        });
      }
    },
  });

  Timeline.scenes._default = Timeline.scenes['pin-fade'];

  // -- boot ---------------------------------------------------------------

  function boot() {
    document.querySelectorAll('[data-timeline]').forEach(initOne);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
