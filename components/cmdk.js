/**
 * Telin GRC Suite — Command Palette (⌘K / Ctrl+K)
 *
 * Vanilla JS, zero deps. Loads on every page via:
 *   <script src="components/cmdk.js" defer></script>
 *
 * What it indexes:
 *   - Pages              (8 — from NAV)
 *   - HS subclauses      (~30 — from window.ISO_DATA.harmonizedStructure)
 *   - Standard extensions (~50 — from window.ISO_DATA.standardsHsMapping[].extensions_beyond_hs[])
 *
 * UX:
 *   - ⌘K (Mac) / Ctrl+K (Win/Linux) opens
 *   - Substring match (case-insensitive) across id + title + code
 *   - ↑/↓ to navigate, Enter to commit, Esc / backdrop to close
 *   - Page result      → navigates to Foo.html
 *   - Clause result    → navigates to ISO Crosswalk.html#clause=4.1
 *   - Extension result → navigates to ISO Crosswalk.html#std=isoXXX
 */

(function () {
  'use strict';

  var PAGES = [
    { href: 'Dashboard.html',         icon: '⊞', label: 'Dashboard' },
    { href: 'ISO Crosswalk.html',     icon: '⊕', label: 'ISO Crosswalk' },
    { href: 'Evidence Register.html', icon: '◷', label: 'Evidence Register' },
    { href: 'NCR Tracker.html',       icon: '⚠', label: 'NCR Tracker' },
    { href: 'Risk Register.html',     icon: '◈', label: 'Risk Register' },
    { href: 'Audit Checklist.html',   icon: '✓', label: 'Audit Checklist' },
    { href: 'Legal Register.html',    icon: '⚖', label: 'Legal Register' },
    { href: 'Data Governance.html',   icon: '⊛', label: 'Data Governance' }
  ];

  var open = false, items = [], filtered = [], cursor = 0, $modal, $input, $list;

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightMatch(text, parts) {
    var safe = escapeHtml(text);
    if (!parts || !parts.length) return safe;
    var rx = parts.filter(Boolean).map(escapeRegExp).join('|');
    if (!rx) return safe;
    try {
      return safe.replace(new RegExp('(' + rx + ')', 'gi'), '<mark>$1</mark>');
    } catch (_) { return safe; }
  }

  function buildIndex() {
    var iso = (typeof window !== 'undefined' && window.ISO_DATA) || null;
    var idx = [];

    PAGES.forEach(function (p) {
      idx.push({
        kind: 'page',
        icon: p.icon,
        title: p.label,
        subtitle: 'Page',
        href: p.href,
        searchKey: (p.label + ' ' + p.href).toLowerCase()
      });
    });

    if (iso && iso.harmonizedStructure && iso.harmonizedStructure.clauses) {
      iso.harmonizedStructure.clauses.forEach(function (c) {
        if (!c.subclauses) return;
        c.subclauses.forEach(function (sc) {
          idx.push({
            kind: 'clause',
            icon: '§',
            title: '§' + sc.id + '  ' + sc.title,
            subtitle: 'HS clause · ' + c.title,
            href: 'ISO Crosswalk.html#clause=' + encodeURIComponent(sc.id),
            searchKey: (sc.id + ' ' + sc.title + ' ' + c.title).toLowerCase()
          });
          if (sc.children) sc.children.forEach(function (ch) {
            idx.push({
              kind: 'clause',
              icon: '§',
              title: '§' + ch.id + '  ' + ch.title,
              subtitle: 'HS sub-subclause · ' + c.title,
              href: 'ISO Crosswalk.html#clause=' + encodeURIComponent(ch.id),
              searchKey: (ch.id + ' ' + ch.title).toLowerCase()
            });
          });
        });
      });
    }

    if (iso && iso.standardsHsMapping) {
      iso.standardsHsMapping.forEach(function (s) {
        idx.push({
          kind: 'standard',
          icon: '◆',
          title: s.code,
          subtitle: s.name,
          href: 'ISO Crosswalk.html#std=' + encodeURIComponent(s.id),
          searchKey: (s.id + ' ' + s.code + ' ' + s.name + ' ' + (s.hs_revision_followed || '')).toLowerCase()
        });
        (s.extensions_beyond_hs || []).forEach(function (ext) {
          idx.push({
            kind: 'extension',
            icon: '+',
            title: '§' + ext.ref + '  ' + ext.title,
            subtitle: s.code + ' extension',
            href: 'ISO Crosswalk.html#std=' + encodeURIComponent(s.id) + '&clause=' + encodeURIComponent(ext.ref),
            searchKey: (ext.ref + ' ' + ext.title + ' ' + s.code).toLowerCase()
          });
        });
      });
    }

    return idx;
  }

  function ensureMounted() {
    if ($modal) return;
    var wrap = document.createElement('div');
    wrap.className = 'app-cmdk-backdrop';
    wrap.setAttribute('role', 'presentation');
    wrap.innerHTML =
      '<div class="app-cmdk-modal" role="dialog" aria-modal="true" aria-label="Command palette">' +
        '<div class="app-cmdk-input-wrap">' +
          '<span class="app-cmdk-prompt">⌘K</span>' +
          '<input type="text" class="app-cmdk-input" placeholder="Search pages, HS clauses, standards…" autocomplete="off" spellcheck="false" />' +
          '<span class="app-cmdk-hint-key">Esc</span>' +
        '</div>' +
        '<div class="app-cmdk-list" role="listbox"></div>' +
        '<div class="app-cmdk-foot">' +
          '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>' +
          '<span><kbd>↵</kbd> open</span>' +
          '<span><kbd>esc</kbd> close</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    $modal = wrap;
    $input = wrap.querySelector('.app-cmdk-input');
    $list = wrap.querySelector('.app-cmdk-list');
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
    $input.addEventListener('input', onInput);
    $input.addEventListener('keydown', onKeydown);
  }

  function openPalette() {
    ensureMounted();
    items = buildIndex();
    filtered = items.slice(0, 50);
    cursor = 0;
    $input.value = '';
    $modal.classList.add('is-open');
    open = true;
    render();
    setTimeout(function () { $input.focus(); }, 0);
  }

  function close() {
    if (!$modal) return;
    $modal.classList.remove('is-open');
    open = false;
  }

  function onInput() {
    var q = $input.value.trim().toLowerCase();
    if (!q) {
      filtered = items.slice(0, 50);
    } else {
      var parts = q.split(/\s+/);
      filtered = items.filter(function (it) {
        for (var i = 0; i < parts.length; i++) {
          if (it.searchKey.indexOf(parts[i]) === -1) return false;
        }
        return true;
      }).slice(0, 60);
    }
    cursor = 0;
    render();
  }

  function onKeydown(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); cursor = Math.min(filtered.length - 1, cursor + 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cursor = Math.max(0, cursor - 1); render(); }
    else if (e.key === 'Enter') { e.preventDefault(); commit(); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  }

  function commit() {
    var it = filtered[cursor];
    if (!it) return;
    close();
    window.location.href = it.href;
  }

  function render() {
    if (!$list) return;
    if (!filtered.length) {
      $list.innerHTML = '<div class="app-cmdk-empty">No matches. Try "27001", "evidence", or a clause number.</div>';
      return;
    }
    var queryParts = ($input && $input.value || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    var html = '';
    filtered.forEach(function (it, i) {
      var sel = i === cursor ? ' is-active' : '';
      html +=
        '<button type="button" class="app-cmdk-item app-cmdk-item--' + escapeHtml(it.kind) + sel + '" data-i="' + i + '" role="option">' +
          '<span class="app-cmdk-item-icon">' + escapeHtml(it.icon) + '</span>' +
          '<span class="app-cmdk-item-body">' +
            '<span class="app-cmdk-item-title">' + highlightMatch(it.title, queryParts) + '</span>' +
            '<span class="app-cmdk-item-sub">' + highlightMatch(it.subtitle, queryParts) + '</span>' +
          '</span>' +
          '<span class="app-cmdk-item-kind">' + escapeHtml(it.kind) + '</span>' +
        '</button>';
    });
    $list.innerHTML = html;
    $list.querySelectorAll('.app-cmdk-item').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor = +el.dataset.i; render(); });
      el.addEventListener('click', function () { cursor = +el.dataset.i; commit(); });
    });
    var active = $list.querySelector('.is-active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function onGlobalKeydown(e) {
    var isToggle = (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
    if (isToggle) {
      e.preventDefault();
      if (open) close(); else openPalette();
    }
  }

  // Expose for the sidebar Cmd+K hint chip to call programmatically
  window.AppCmdK = { open: openPalette, close: close };

  document.addEventListener('keydown', onGlobalKeydown);
})();
