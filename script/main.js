
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // 1) FORM: validaciones + mensajes
  // Requiere en tu HTML (dentro del form):
  // <div class="form-message" id="formMessage" aria-live="polite"></div>
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

      // Validaciones básicas
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

      // Reglas: edad
      if (age >= 18) {
        // Mayor de edad
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
        // Menor de edad
        showMessage(
          "⚠️ Sos menor de 18 años. Para inscribirte necesitás venir con una autorización firmada por tu madre, padre o tutor legal.",
          "warning"
        );
      }

      // Futuro (si querés):
      // - enviar datos al backend
      // - abrir WhatsApp con mensaje prearmado
      // - redirigir a una sección específica
    });
  }


  //
  // Horario: Lun–Vie 07:00–22:00 (hora local del navegador)
  // -----------------------------------------
  const statusEl = document.getElementById("gymStatus");

  function updateGymStatus() {
    if (!statusEl) return;

    const now = new Date();

    // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const isWeekday = day >= 1 && day <= 5;

    // Ajustá el horario acá si querés
    const openHour = 7;    // abre 07:00
    const closeHour = 22;  // cierra 22:00 (a las 22:00 ya se considera cerrado)

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
  setInterval(updateGymStatus, 30000); // refresca cada 30s

    // -----------------------------------------
  // FEATURES ICONS: pulso SOLO JS (sin CSS)
  // compatible con tu .feature-icon actual
  // -----------------------------------------
  const featureIcons = document.querySelectorAll(".feature-card .feature-icon");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (featureIcons.length && !reduceMotion) {
    const BASE_INTERVAL_MS = 3500; // 3.5s
    const JITTER_MS = 500;         // +/- 0.5s => ~3.0 a 4.0s
    const PULSE_MS = 620;          // duración del pulso
    const STAGGER_MS = 140;        // wave

    // Guardar estilos inline originales (si existieran)
    featureIcons.forEach((icon) => {
      icon.dataset._transform = icon.style.transform || "";
      icon.dataset._filter = icon.style.filter || "";
      icon.dataset._opacity = icon.style.opacity || "";
      icon.dataset._transition = icon.style.transition || "";
      icon.dataset._boxShadow = icon.style.boxShadow || "";
      icon.dataset._borderColor = icon.style.borderColor || "";
    });

    function pulseOn(icon) {
      // Transición suave (temporal)
      icon.style.transition =
        "transform 200ms ease, filter 200ms ease, box-shadow 200ms ease, border-color 200ms ease, opacity 200ms ease";

      // Pulso: escala + brillo + glow verde
      icon.style.transform = "scale(1.12)";
      icon.style.opacity = "1";
      icon.style.borderColor = "rgba(34,197,94,0.65)";
      icon.style.boxShadow =
        "0 0 0 4px rgba(34,197,94,0.12), 0 16px 40px rgba(34,197,94,0.18)";
      icon.style.filter =
        "brightness(1.35) saturate(1.1) drop-shadow(0 10px 18px rgba(34,197,94,0.35))";

      // Volver al estado original
      setTimeout(() => {
        icon.style.transform = icon.dataset._transform;
        icon.style.filter = icon.dataset._filter;
        icon.style.opacity = icon.dataset._opacity;
        icon.style.boxShadow = icon.dataset._boxShadow;
        icon.style.borderColor = icon.dataset._borderColor;

        // Restaurar transición original para no pisar estilos
        icon.style.transition = icon.dataset._transition;
      }, PULSE_MS);
    }

    function pulseWave() {
      featureIcons.forEach((icon, i) => {
        setTimeout(() => pulseOn(icon), i * STAGGER_MS);
      });
    }

    // Primer pulso al cargar
    setTimeout(pulseWave, 900);

    // Loop con jitter real (3–4s aprox)
    function scheduleNext() {
      const next = BASE_INTERVAL_MS + (Math.random() * 2 - 1) * JITTER_MS;
      setTimeout(() => {
        pulseWave();
        scheduleNext();
      }, next);
    }
    scheduleNext();

    // Hover: pulso inmediato
    featureIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => pulseOn(icon));
    });
  }

});
