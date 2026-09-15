// assets/js/site.js
// Compartido por todas las páginas: menú móvil, consentimiento de cookies y GA4.
// Lee configuración opcional desde window.SITE_CONFIG (definida inline en cada página).

(function () {
  var CONFIG = window.SITE_CONFIG || {};

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }
  function getCookie(name) {
    var match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return match ? match[2] : null;
  }

  // ---------- Mobile menu ----------
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  // ---------- Google Analytics 4 (solo si hay consentimiento) ----------
  function loadGA4() {
    var id = CONFIG.GA4_MEASUREMENT_ID;
    if (!id || id.indexOf('XXXX') > -1) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id);
  }

  // ---------- Cookie consent banner ----------
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieReject = document.getElementById('cookieReject');
  if (cookieBanner) {
    var consent = getCookie('cc_consent');
    if (consent === 'accepted') {
      loadGA4();
    } else if (!consent) {
      cookieBanner.classList.add('show');
    }
    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        setCookie('cc_consent', 'accepted', 180);
        cookieBanner.classList.remove('show');
        loadGA4();
      });
    }
    if (cookieReject) {
      cookieReject.addEventListener('click', function () {
        setCookie('cc_consent', 'rejected', 180);
        cookieBanner.classList.remove('show');
      });
    }
  }
})();
