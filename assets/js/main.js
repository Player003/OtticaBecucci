/* ============================================================
   Ottica Becucci — main.js
   Nav, reveal, stats count-up, frames carousel, marquee, to-top
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header ---------- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu && nav) {
    var setOpen = function (open) {
      menu.classList.toggle("is-open", open);
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () { setOpen(!menu.classList.contains("is-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Stats count-up ---------- */
  var nums = document.querySelectorAll("[data-count]");
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (nums.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Marquee: duplicate items for seamless loop ---------- */
  var mtrack = document.querySelector(".marquee__track");
  if (mtrack && !prefersReduced) { mtrack.innerHTML += mtrack.innerHTML; }

  /* ---------- Frames carousel ---------- */
  (function () {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;
    var track = root.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(track.children);
    var prevBtn = root.querySelector("[data-prev]");
    var nextBtn = root.querySelector("[data-next]");
    var dotsWrap = root.querySelector(".carousel__dots");
    var index = 0, autoTimer = null;

    var perView = function () {
      var w = window.innerWidth;
      if (w >= 900) return 3;
      if (w >= 560) return 2;
      return 1;
    };
    var maxIndex = function () { return Math.max(0, slides.length - perView()); };

    // Build dots
    var dots = [];
    var buildDots = function () {
      dotsWrap.innerHTML = "";
      dots = [];
      var pages = maxIndex() + 1;
      for (var i = 0; i < pages; i++) {
        var b = document.createElement("button");
        b.className = "carousel__dot";
        b.setAttribute("aria-label", "Vai alla diapositiva " + (i + 1));
        (function (i) { b.addEventListener("click", function () { go(i, true); }); })(i);
        dotsWrap.appendChild(b);
        dots.push(b);
      }
    };

    var update = function () {
      var slide = slides[0];
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 22) || 22;
      var step = slide.getBoundingClientRect().width + gap;
      track.style.transform = "translateX(" + (-index * step) + "px)";
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
    };

    var go = function (i, user) {
      index = Math.max(0, Math.min(i, maxIndex()));
      update();
      if (user) restartAuto();
    };
    var next = function () { index = index >= maxIndex() ? 0 : index + 1; update(); };
    var prev = function () { index = index <= 0 ? maxIndex() : index - 1; update(); };

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAuto(); });

    // Keyboard
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); restartAuto(); }
      if (e.key === "ArrowLeft") { prev(); restartAuto(); }
    });

    // Touch / drag swipe
    var startX = 0, dragging = false;
    var onStart = function (x) { startX = x; dragging = true; stopAuto(); };
    var onEnd = function (x) {
      if (!dragging) return; dragging = false;
      var dx = x - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      restartAuto();
    };
    track.addEventListener("touchstart", function (e) { onStart(e.touches[0].clientX); }, { passive: true });
    track.addEventListener("touchend", function (e) { onEnd(e.changedTouches[0].clientX); });
    track.addEventListener("mousedown", function (e) { onStart(e.clientX); });
    window.addEventListener("mouseup", function (e) { if (dragging) onEnd(e.clientX); });

    // Autoplay
    var startAuto = function () { if (prefersReduced) return; autoTimer = setInterval(next, 4500); };
    var stopAuto = function () { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };
    var restartAuto = function () { stopAuto(); startAuto(); };
    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", startAuto);

    var rebuild = function () { buildDots(); go(Math.min(index, maxIndex())); };
    var resizeTimer;
    window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(rebuild, 150); });

    buildDots();
    update();
    startAuto();
  })();

  /* ---------- Back to top ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("is-visible", window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Cookie consent + map gating ---------- */
  (function () {
    var KEY = "ob-consent";
    var banner = document.querySelector("[data-cookie]");
    var mapEl = document.querySelector("[data-map]");

    var loadMap = function () {
      if (!mapEl) return;
      var src = mapEl.getAttribute("data-map-src");
      if (!src || mapEl.querySelector("iframe")) return;
      var ph = mapEl.querySelector(".map__placeholder");
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = mapEl.getAttribute("data-map-title") || "Mappa";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      if (ph) ph.remove();
      mapEl.appendChild(iframe);
    };

    var setConsent = function (value) {
      try { localStorage.setItem(KEY, value); } catch (e) {}
      if (banner) banner.classList.remove("is-visible");
      if (value === "granted") loadMap();
    };

    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}

    if (stored === "granted") {
      loadMap();
    } else if (stored !== "denied" && banner) {
      setTimeout(function () { banner.classList.add("is-visible"); }, 800);
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-cookie-accept]")) setConsent("granted");
      else if (e.target.closest("[data-cookie-reject]")) setConsent("denied");
      else if (e.target.closest("[data-map-accept]")) setConsent("granted");
    });
  })();

  /* ---------- Dynamic year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
