/* American Society Foundation — data-loader.js
   Loads JSON content and renders into elements with [data-source].
   Supports:
     <ul data-source="data/values.json" data-template="value"></ul>
     <div data-source="data/articles.json" data-template="article"></div>
     <div data-source="data/safety-tips.json" data-template="safety"></div>
     <ul data-source="data/principles.json" data-template="principles-moral"></ul>
*/

(function () {
  'use strict';

  const templates = {
    value(item) {
      return `
        <li class="tile reveal">
          <span class="tile__source">${escape(item.source || '')}</span>
          <h3 class="tile__title">${escape(item.title)}</h3>
          <p class="tile__body">${escape(item.summary)}</p>
        </li>`;
    },

    article(item) {
      const date = formatDate(item.date);
      return `
        <li class="article-item reveal">
          <div class="article-item__meta">
            <div class="article-item__category">${escape(item.category || '')}</div>
            <div>${date}</div>
          </div>
          <div>
            <h3 class="article-item__title"><a href="article.html?id=${encodeURIComponent(item.id)}">${escape(item.title)}</a></h3>
            <p class="article-item__summary">${escape(item.summary)}</p>
          </div>
        </li>`;
    },

    'principles-moral'(item) {
      return `
        <li class="tile reveal">
          <h3 class="tile__title">${escape(item.title)}</h3>
          <p class="tile__body">${escape(item.summary)}</p>
        </li>`;
    },

    'principles-logic'(item) {
      return `
        <li class="tile reveal">
          <h3 class="tile__title">${escape(item.title)}</h3>
          <p class="tile__body">${escape(item.summary)}</p>
        </li>`;
    },

    safety(group) {
      const tipsHtml = group.tips.map(t => `<li>${escape(t)}</li>`).join('');
      return `
        <section class="reveal" style="margin-bottom: 3.5rem;">
          <h2>${escape(group.title)}</h2>
          <p class="lead" style="font-size: 1.15rem; margin-bottom: 1.5rem;">${escape(group.intro)}</p>
          <ul style="font-size: 1.0625rem; line-height: 1.75; padding-left: 1.4em;">${tipsHtml}</ul>
        </section>`;
    }
  };

  document.querySelectorAll('[data-source]').forEach(async (el) => {
    const src = el.getAttribute('data-source');
    const tpl = el.getAttribute('data-template');
    const key = el.getAttribute('data-key'); // optional: pick a specific key from JSON
    if (!src || !tpl || !templates[tpl]) return;

    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error('fetch failed: ' + res.status);
      const data = await res.json();

      let items;
      if (tpl === 'safety') {
        // Render each top-level key as a section, in declared order
        items = Object.values(data);
        el.innerHTML = items.map(templates[tpl]).join('');
      } else if (tpl === 'principles-moral') {
        items = data.moral || [];
        el.innerHTML = items.map(templates[tpl]).join('');
      } else if (tpl === 'principles-logic') {
        items = data.logic || [];
        el.innerHTML = items.map(templates[tpl]).join('');
      } else if (tpl === 'value') {
        items = data.values || [];
        el.innerHTML = items.map(templates[tpl]).join('');
      } else if (tpl === 'article') {
        items = (data.articles || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        const limit = parseInt(el.getAttribute('data-limit') || '0', 10);
        if (limit > 0) items = items.slice(0, limit);
        el.innerHTML = items.map(templates[tpl]).join('');
      }

      // Re-arm reveal observers for newly inserted elements
      rearmReveal(el);
    } catch (err) {
      console.error('data-loader:', src, err);
      el.innerHTML = `<p style="color:#888">Content could not be loaded.</p>`;
    }
  });

  // ---------- Site config (name/tagline/etc) ----------
  fetch('data/site.json').then(r => r.json()).then(site => {
    document.querySelectorAll('[data-site]').forEach(el => {
      const k = el.getAttribute('data-site');
      const val = k.split('.').reduce((o, p) => (o ? o[p] : null), site);
      if (val != null) {
        if (el.hasAttribute('data-attr')) {
          el.setAttribute(el.getAttribute('data-attr'), val);
        } else {
          el.textContent = val;
        }
      }
    });
    // Update emergency links
    document.querySelectorAll('[data-emergency-link]').forEach(a => {
      a.setAttribute('href', site.emergencyUrl || '#');
    });
  }).catch(() => {});

  // ---------- Helpers ----------
  function escape(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function formatDate(d) {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function rearmReveal(scope) {
    const reveals = scope.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !reveals.length) {
      reveals.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }
})();
