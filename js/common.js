(function () {
  var COOKIE_CONSENT_KEY = 'PocketRupee_cookie_consent';

  function getCookieConsent() {
    try {
      return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
    } catch (e) {
      return false;
    }
  }

  function setCookieConsent() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      return true;
    } catch (e) {
      return false;
    }
  }

  function showCookieBar() {
    var bar = document.getElementById('PocketRupee-cookie-bar');
    if (bar && !getCookieConsent()) {
      bar.classList.add('PocketRupee-cookie-bar-visible');
    }
  }

  function hideCookieBar() {
    var bar = document.getElementById('PocketRupee-cookie-bar');
    if (bar) {
      bar.classList.remove('PocketRupee-cookie-bar-visible');
    }
  }

  function initCookieConsent() {
    if (getCookieConsent()) {
      hideCookieBar();
      return;
    }
    showCookieBar();
    var btn = document.getElementById('PocketRupee-cookie-accept');
    if (btn) {
      btn.addEventListener('click', function () {
        setCookieConsent();
        hideCookieBar();
      });
    }
  }

  function initNavToggle() {
    var toggle = document.getElementById('PocketRupee-nav-toggle');
    var mobileNav = document.getElementById('PocketRupee-mobile-nav');
    if (!toggle || !mobileNav) return;
    toggle.addEventListener('click', function () {
      mobileNav.classList.toggle('PocketRupee-mobile-nav-open');
      toggle.setAttribute('aria-expanded', mobileNav.classList.contains('PocketRupee-mobile-nav-open'));
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('PocketRupee-mobile-nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initScrollReveal() {
    var reveals = document.querySelectorAll('.PocketRupee-reveal');
    if (!reveals.length) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('PocketRupee-reveal-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    initCookieConsent();
    initNavToggle();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
