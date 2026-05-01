/**
 * Telin GRC Suite — Toast notification system
 *
 * Vanilla JS, zero deps. Loads on every page via:
 *   <script src="components/toast.js" defer></script>
 *
 * Public API (window.AppToast):
 *   success(message)       — green
 *   error(message)         — red
 *   info(message)          — blue
 *   warn(message)          — amber
 *   dismiss(id?)           — close one toast by id, or all if omitted
 *
 * UX:
 *   - Stack bottom-right
 *   - Auto-dismiss after 3.5s (5s for error)
 *   - Click toast to dismiss immediately
 *   - Max 4 visible at once; oldest fades out
 *   - Mobile: respects safe-area-inset-bottom
 */

(function () {
  'use strict';

  var MAX_VISIBLE = 4;
  var DEFAULT_TTL = { success: 3500, info: 3500, warn: 4500, error: 5000 };
  var KIND_ICONS = { success: '✓', error: '✕', info: 'ℹ', warn: '!' };

  var nextId = 1;
  var toasts = [];
  var $container;

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function ensureContainer() {
    if ($container && document.body && document.body.contains($container)) return $container;
    $container = document.createElement('div');
    $container.className = 'app-toast-container';
    $container.setAttribute('aria-live', 'polite');
    $container.setAttribute('aria-atomic', 'false');
    document.body.appendChild($container);
    return $container;
  }

  function show(kind, message, opts) {
    if (!message) return null;
    if (!document.body) {
      // Defer until DOM is ready
      document.addEventListener('DOMContentLoaded', function () { show(kind, message, opts); });
      return null;
    }
    ensureContainer();

    // Trim oldest if over cap
    while (toasts.length >= MAX_VISIBLE) {
      var oldest = toasts.shift();
      if (oldest && oldest.el && oldest.el.parentNode) oldest.el.parentNode.removeChild(oldest.el);
    }

    var id = nextId++;
    var ttl = (opts && opts.ttl) || DEFAULT_TTL[kind] || 3500;
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'app-toast app-toast--' + kind;
    el.setAttribute('role', 'status');
    el.setAttribute('data-toast-id', String(id));
    el.innerHTML =
      '<span class="app-toast__icon">' + escapeHtml(KIND_ICONS[kind] || '') + '</span>' +
      '<span class="app-toast__msg">' + escapeHtml(message) + '</span>';
    el.addEventListener('click', function () { dismiss(id); });
    $container.appendChild(el);

    var entry = { id: id, kind: kind, el: el, timer: null };
    toasts.push(entry);

    // Slide-in animation hook (next frame)
    requestAnimationFrame(function () { el.classList.add('is-shown'); });

    if (ttl > 0) {
      entry.timer = setTimeout(function () { dismiss(id); }, ttl);
    }
    return id;
  }

  function dismiss(id) {
    if (id == null) {
      toasts.slice().forEach(function (t) { dismiss(t.id); });
      return;
    }
    var idx = -1;
    for (var i = 0; i < toasts.length; i++) {
      if (toasts[i].id === id) { idx = i; break; }
    }
    if (idx === -1) return;
    var entry = toasts[idx];
    if (entry.timer) clearTimeout(entry.timer);
    if (entry.el) {
      entry.el.classList.remove('is-shown');
      entry.el.classList.add('is-leaving');
      setTimeout(function () {
        if (entry.el && entry.el.parentNode) entry.el.parentNode.removeChild(entry.el);
      }, 200);
    }
    toasts.splice(idx, 1);
  }

  window.AppToast = {
    success: function (m, o) { return show('success', m, o); },
    error:   function (m, o) { return show('error', m, o); },
    info:    function (m, o) { return show('info', m, o); },
    warn:    function (m, o) { return show('warn', m, o); },
    dismiss: dismiss
  };
})();
