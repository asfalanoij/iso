/**
 * Telin GRC Suite — shared sidebar component (vanilla JS, no React)
 *
 * Usage on any module page:
 *   <link rel="stylesheet" href="theme.css">
 *   <body>
 *     <aside id="app-sidebar" class="app-sidebar"></aside>
 *     <main class="app-main">
 *       <div id="root"></div>            <!-- existing React mount -->
 *     </main>
 *     <script src="components/app-sidebar.js"></script>
 *
 * The script:
 *   - Renders the shared brand header + nav links into <aside id="app-sidebar">
 *   - Highlights the current page based on window.location.pathname
 *   - Stays out of React's way (separate DOM tree)
 */

(function () {
  'use strict';

  // Same NAV array as the React Dashboard sidebar — single source of nav structure.
  // Cross-page links visible on every module page.
  var NAV_LINKS = [
    { href: 'Dashboard.html',         icon: '⊞', label: 'Dashboard' },
    { href: 'ISO Crosswalk.html',     icon: '⊕', label: 'ISO Crosswalk' },
    { href: 'Evidence Register.html', icon: '◷', label: 'Evidence Register' },
    { href: 'NCR Tracker.html',       icon: '⚠', label: 'NCR Tracker' },
    { href: 'Risk Register.html',     icon: '◈', label: 'Risk Register' },
    { href: 'Audit Checklist.html',   icon: '✓', label: 'Audit Checklist' },
    { href: 'Legal Register.html',    icon: '⚖', label: 'Legal Register' },
    { href: 'Data Governance.html',   icon: '⊛', label: 'Data Governance' }
  ];

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function currentBasename() {
    try {
      var path = decodeURIComponent(window.location.pathname || '');
      var seg = path.split('/').pop();
      return seg || 'index.html';
    } catch (_) { return ''; }
  }

  function isMobile() { return window.matchMedia('(max-width: 900px)').matches; }
  function closeDrawer() {
    var host = document.getElementById('app-sidebar');
    if (host) host.classList.remove('is-open');
  }
  function toggleDrawer() {
    var host = document.getElementById('app-sidebar');
    if (!host) return;
    host.classList.toggle('is-open');
  }

  function render() {
    var host = document.getElementById('app-sidebar');
    if (!host) return;
    host.classList.add('app-sidebar');
    var here = currentBasename();

    var brandHtml =
      '<div class="app-sidebar__brand">' +
        '<div class="app-sidebar__logo">T</div>' +
        '<div>' +
          '<div class="app-sidebar__title">Telin</div>' +
          '<div class="app-sidebar__subtitle">ISO One Telin 2026 · Mock</div>' +
        '</div>' +
      '</div>';

    var navHtml = '<nav class="app-sidebar__nav" aria-label="Tools">';
    navHtml += '<div class="app-sidebar__section-title">Tools</div>';
    NAV_LINKS.forEach(function (item) {
      var active = item.href === here ? ' aria-current="page"' : '';
      navHtml +=
        '<a class="app-sidebar__link" href="' + escapeHtml(item.href) + '"' + active + '>' +
          '<span class="app-sidebar__icon">' + escapeHtml(item.icon) + '</span>' +
          '<span>' + escapeHtml(item.label) + '</span>' +
        '</a>';
    });
    navHtml += '</nav>';

    var footerHtml =
      '<div class="app-sidebar__footer">' +
        '<button type="button" class="app-cmdk-hint" id="app-cmdk-hint">' +
          '<span>Search</span>' +
          '<kbd>⌘K</kbd>' +
        '</button>' +
      '</div>';

    host.innerHTML = brandHtml + navHtml + footerHtml;

    // Inject hamburger + backdrop as siblings (idempotent)
    if (!document.querySelector('.app-sidebar-hamburger')) {
      var hb = document.createElement('button');
      hb.type = 'button';
      hb.className = 'app-sidebar-hamburger';
      hb.setAttribute('aria-label', 'Open menu');
      hb.innerHTML = '☰';
      hb.addEventListener('click', toggleDrawer);
      host.parentNode.insertBefore(hb, host);
    }
    if (!document.querySelector('.app-sidebar-backdrop')) {
      var bd = document.createElement('div');
      bd.className = 'app-sidebar-backdrop';
      bd.addEventListener('click', closeDrawer);
      host.parentNode.insertBefore(bd, host.nextSibling);
    }

    // Close drawer on link tap (mobile)
    host.querySelectorAll('.app-sidebar__link').forEach(function (a) {
      a.addEventListener('click', function () { if (isMobile()) closeDrawer(); });
    });

    // Cmd+K hint → open palette
    var hint = document.getElementById('app-cmdk-hint');
    if (hint) hint.addEventListener('click', function () {
      if (window.AppCmdK && window.AppCmdK.open) window.AppCmdK.open();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
