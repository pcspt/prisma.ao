/* PRISMA — interacções do site */
(function () {
  "use strict";

  /* ---------------------------------------------------- menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }


  /* ----------------------------------------- submenu de serviços */
  var subBtns = document.querySelectorAll(".sub-toggle");
  subBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var open = btn.getAttribute("aria-expanded") === "true";
      subBtns.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      subBtns.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-sub")) {
      subBtns.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    }
  });

  /* ------------------------------------------- revelação ao scroll */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    // escalonamento calculado dentro de cada grupo de irmaos, para que
    // cada secao anime de forma independente da posicao na pagina
    targets.forEach(function (el) {
      var parent = el.parentNode;
      var group = parent ? parent.querySelectorAll(":scope > .reveal") : null;
      var idx = 0;
      if (group) {
        for (var k = 0; k < group.length; k++) {
          if (group[k] === el) { idx = k; break; }
        }
      }
      el.style.transitionDelay = Math.min(idx, 6) * 75 + "ms";
      io.observe(el);
    });
  }

})();