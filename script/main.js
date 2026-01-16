document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // 1) FORM: validaciones + mensajes
  // -------------------------------
  const form = document.querySelector(".lead-form");
  const ageInput = document.getElementById("age");
  const weightInput = document.getElementById("kg");
  const heightInput = document.getElementById("cm");
  const messageBox = document.getElementById("formMessage");

  function showMessage(text, type) {
    if (!messageBox) return;
    messageBox.className = "form-message show " + type; // success | warning | error
    messageBox.textContent = text;
  }

  function clearMessage() {
    if (!messageBox) return;
    messageBox.className = "form-message";
    messageBox.textContent = "";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      clearMessage();

      const age = parseInt(ageInput?.value, 10);
      const weight = parseInt(weightInput?.value, 10);
      const height = parseInt(heightInput?.value, 10);

      if (Number.isNaN(age) || age <= 0) {
        showMessage("Por favor ingresá una edad válida.", "error");
        ageInput?.focus();
        return;
      }

      if (Number.isNaN(weight) || weight <= 0) {
        showMessage("Por favor ingresá un peso válido (kg).", "error");
        weightInput?.focus();
        return;
      }

      if (Number.isNaN(height) || height <= 0) {
        showMessage("Por favor ingresá una altura válida (cm).", "error");
        heightInput?.focus();
        return;
      }

      if (age >= 18) {
        if (weight >= 80) {
          showMessage(
            "✅ Podés ser socio del Gym. Además: tu peso es superior a 80 kg; te recomendamos evaluación inicial para ajustar el plan. En breve te contactamos con planes y horarios.",
            "warning"
          );
        } else {
          showMessage(
            "✅ Podés ser socio del Gym. En breve nos comunicamos para enviarte los planes disponibles.",
            "success"
          );
        }
      } else {
        showMessage(
          "⚠️ Sos menor de 18 años. Para inscribirte necesitás venir con una autorización firmada por tu madre, padre o tutor legal.",
          "warning"
        );
      }
    });
  }

  // -----------------------------------------
  // 2) STATUS: Abierto/Cerrado
  // -----------------------------------------
  const statusEl = document.getElementById("gymStatus");

  function updateGymStatus() {
    if (!statusEl) return;

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const isWeekday = day >= 1 && day <= 5;

    const openHour = 7;
    const closeHour = 22;

    const isOpen =
      isWeekday &&
      (hour > openHour || (hour === openHour && minute >= 0)) &&
      hour < closeHour;

    statusEl.classList.remove("is-open", "is-closed");

    const label = statusEl.querySelector(".label");
    if (!label) return;

    if (isOpen) {
      statusEl.classList.add("is-open");
      label.textContent = "Abierto ahora (Lun–Vie 07:00–22:00)";
    } else {
      statusEl.classList.add("is-closed");
      label.textContent = "Cerrado (Lun–Vie 07:00–22:00)";
    }
  }

  updateGymStatus();
  setInterval(updateGymStatus, 30000);

  // -----------------------------------------
  // 3) FEATURES ICONS: pulso SOLO JS
  // -----------------------------------------
  const featureIcons = document.querySelectorAll(".feature-card .feature-icon");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (featureIcons.length && !reduceMotion) {
    const BASE_INTERVAL_MS = 3500;
    const JITTER_MS = 500;
    const PULSE_MS = 620;
    const STAGGER_MS = 140;

    featureIcons.forEach((icon) => {
      icon.dataset._transform = icon.style.transform || "";
      icon.dataset._filter = icon.style.filter || "";
      icon.dataset._opacity = icon.style.opacity || "";
      icon.dataset._transition = icon.style.transition || "";
      icon.dataset._boxShadow = icon.style.boxShadow || "";
      icon.dataset._borderColor = icon.style.borderColor || "";
    });

    function pulseOn(icon) {
      icon.style.transition =
        "transform 200ms ease, filter 200ms ease, box-shadow 200ms ease, border-color 200ms ease, opacity 200ms ease";

      icon.style.transform = "scale(1.12)";
      icon.style.opacity = "1";
      icon.style.borderColor = "rgba(34,197,94,0.65)";
      icon.style.boxShadow =
        "0 0 0 4px rgba(34,197,94,0.12), 0 16px 40px rgba(34,197,94,0.18)";
      icon.style.filter =
        "brightness(1.35) saturate(1.1) drop-shadow(0 10px 18px rgba(34,197,94,0.35))";

      setTimeout(() => {
        icon.style.transform = icon.dataset._transform;
        icon.style.filter = icon.dataset._filter;
        icon.style.opacity = icon.dataset._opacity;
        icon.style.boxShadow = icon.dataset._boxShadow;
        icon.style.borderColor = icon.dataset._borderColor;
        icon.style.transition = icon.dataset._transition;
      }, PULSE_MS);
    }

    function pulseWave() {
      featureIcons.forEach((icon, i) => {
        setTimeout(() => pulseOn(icon), i * STAGGER_MS);
      });
    }

    setTimeout(pulseWave, 900);

    function scheduleNext() {
      const next = BASE_INTERVAL_MS + (Math.random() * 2 - 1) * JITTER_MS;
      setTimeout(() => {
        pulseWave();
        scheduleNext();
      }, next);
    }
    scheduleNext();

    featureIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => pulseOn(icon));
    });
  }

  // -----------------------------------------
  // 4) CARRUSEL (custom)
  // -----------------------------------------
  const root = document.getElementById("gpCarousel");
  if (root) {
    const slides = Array.from(root.querySelectorAll(".gp-slide"));
    const dots = Array.from(root.querySelectorAll(".gp-dot"));
    const prevBtn = root.querySelector(".gp-prev");
    const nextBtn = root.querySelector(".gp-next");

    let index = 0;
    let timer = null;
    const INTERVAL = 3000;

    const setActive = (i) => {
      if (!slides.length) return;
      index = (i + slides.length) % slides.length;

      slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === index));
    };

    const next = () => setActive(index + 1);
    const prev = () => setActive(index - 1);

    const start = () => {
      stop();
      timer = window.setInterval(next, INTERVAL);
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    nextBtn?.addEventListener("click", () => {
      next();
      start();
    });

    prevBtn?.addEventListener("click", () => {
      prev();
      start();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        setActive(i);
        start();
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    setActive(0);
    start();
  }
   
    // -----------------------------------------
  // 5) SCROLL REVEAL (IntersectionObserver)
  // -----------------------------------------
  const revealEls = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (revealEls.length && !reduce) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = entry.target.getAttribute("data-delay");
        if (delay) entry.target.style.setProperty("--delay", `${Number(delay)}ms`);

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // anima solo una vez
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px"
    });

    revealEls.forEach((el) => io.observe(el));
  } else {
    // fallback: si reduce motion o no hay observer
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // -----------------------------------------
// CTA "Unite ahora": shake DESPUÉS y cada 5s
// -----------------------------------------
const ctaJoin = document.getElementById("ctaJoin");
const reduceMotionCTA = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

if (ctaJoin && !reduceMotionCTA) {
  const SHAKE_CLASS = "shake-vertical";
  const SHAKE_MS = 800;     // 0.8s
  const INTERVAL_MS = 5000; // cada 5 segundos
  const START_DELAY_MS = 2500; // empieza "después" de cargar

  const triggerShake = () => {
    ctaJoin.classList.remove(SHAKE_CLASS);
    void ctaJoin.offsetWidth; // reinicia animación
    ctaJoin.classList.add(SHAKE_CLASS);
    setTimeout(() => ctaJoin.classList.remove(SHAKE_CLASS), SHAKE_MS + 30);
  };

  const inView = () => {
    const r = ctaJoin.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  };

  // Arranca "después"
  setTimeout(() => {
    if (inView()) triggerShake();

    // después de arrancar, sigue cada 5s
    setInterval(() => {
      if (inView()) triggerShake();
    }, INTERVAL_MS);

  }, START_DELAY_MS);

  // Bonus opcional: shake al hover
  ctaJoin.addEventListener("mouseenter", triggerShake);
}
// -----------------------------------------
// HERO TITLE: animación texto sin "cuadro" (cada 10s)
// -----------------------------------------
const reduceMotionText = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

if (!reduceMotionText) {
  import("https://esm.sh/animejs@4.2.2").then(({ createTimeline, stagger, splitText }) => {
    const title = document.querySelector(".hero-title--flip");
    if (!title) return;

    // ✅ Split normal: NO clip, NO clone (no aparece el recuadro)
    const { chars } = splitText(".hero-title--flip", {
      chars: { wrap: "span" }
    });

    createTimeline({
      loop: true,
      loopDelay: 10000 // cada 10s
    }).add(chars, {
      translateY: [0, -14, 0], // sube y vuelve
      duration: 850,
      ease: "inOut(2)"
    }, stagger(22, { from: "first" }));

  }).catch((err) => console.warn("Anime.js no cargó:", err));
}



});
