/* ==========================================================================
   webdiv – Motion & Interaktion (Runde 1, Prototyp)
   Vanilla JS: rAF-Loop mit gelerptem Scrollwert (Lenis-Gefühl),
   IntersectionObserver fuer Reveals, WAAPI fuer den Preloader.
   In der Umsetzung: Lenis + GSAP/ScrollTrigger (siehe HANDOFF.md).
   ========================================================================== */

(() => {
  "use strict";

  /* ---------- Utilities ---------- */

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (t) => t * t * (3 - 2 * t);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const finePointer = matchMedia("(pointer: fine)").matches;
  const docEl = document.documentElement;

  let vh = innerHeight;
  let scrollY_ = window.scrollY;
  let smoothY = scrollY_;

  const mouse = { x: innerWidth / 2, y: innerHeight / 2, nx: 0, ny: 0 };
  if (finePointer) {
    addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.nx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ny = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });
  }

  /* Sichtbarkeits-Flags fuer teure Module */
  const visible = new Map();
  const watchVisibility = (el, key) => {
    if (!el) return;
    new IntersectionObserver((es) => {
      es.forEach((e) => visible.set(key, e.isIntersecting));
    }, { rootMargin: "80px 0px" }).observe(el);
  };

  /* ==========================================================================
     Signatur (geteilte Baufunktion: Preloader + Ueber mich)
     ========================================================================== */

  function buildSignature(container) {
    if (!container || typeof SIGNATURE === "undefined") return null;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", SIGNATURE.viewBox);
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    SIGNATURE.glyphs.forEach((d) => {
      const p = document.createElementNS(ns, "path");
      p.setAttribute("class", "sig-glyph");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    container.appendChild(svg);
    return svg;
  }

  /* Schreib-Animation: Kontur zeichnet sich pro Glyphe, dann fuellt sie auf */
  function writeSignature(svg, totalMs = 1350) {
    const glyphs = $$(".sig-glyph", svg);
    const lens = glyphs.map((g) => g.getTotalLength());
    const sum = lens.reduce((a, b) => a + b, 0);
    let t = 0;
    glyphs.forEach((g, i) => {
      const dur = (lens[i] / sum) * totalMs;
      g.style.strokeDasharray = lens[i];
      g.style.strokeDashoffset = lens[i];
      g.animate(
        [{ strokeDashoffset: lens[i] }, { strokeDashoffset: 0 }],
        { duration: dur, delay: t, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" }
      );
      g.animate(
        [{ fillOpacity: 0 }, { fillOpacity: 1 }],
        { duration: 300, delay: t + dur * 0.6, easing: "ease-out", fill: "forwards" }
      );
      t += dur * 0.82; /* Glyphen ueberlappen leicht – fluessiger Schreibfluss */
    });
    return t + 380;
  }

  /* Logo-Zeichen: drei Striche zeichnen sich (Slash, oberer, unterer Schenkel) */
  function drawMark(svg, dur = 620, delay = 0) {
    const slash = $(".mark-slash", svg);
    const angle = $(".mark-angle", svg);
    if (!slash || !angle) return;
    const ls = slash.getTotalLength();
    const la = angle.getTotalLength();
    slash.style.strokeDasharray = ls;
    slash.style.strokeDashoffset = ls;
    angle.style.strokeDasharray = la;
    angle.style.strokeDashoffset = la;
    slash.animate([{ strokeDashoffset: ls }, { strokeDashoffset: 0 }], {
      duration: dur * 0.4, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards"
    });
    /* Winkel in zwei Phasen – liest sich als zwei Striche */
    angle.animate([
      { strokeDashoffset: la, offset: 0 },
      { strokeDashoffset: la * 0.5, offset: 0.42 },
      { strokeDashoffset: la * 0.5, offset: 0.55 },
      { strokeDashoffset: 0, offset: 1 }
    ], { duration: dur, delay: delay + dur * 0.28, easing: "ease-in-out", fill: "forwards" });
  }

  /* ==========================================================================
     Preloader
     ========================================================================== */

  const preloader = $("#preloader");
  const nav = $("#siteNav");
  const hero = $("#hero");

  function revealHero() {
    hero.classList.add("revealed");
  }

  function initPreloader() {
    const seen = sessionStorage.getItem("webdiv-seen");
    const fontsReady = Promise.race([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => setTimeout(r, 900))
    ]);

    if (seen || typeof SIGNATURE === "undefined") {
      fontsReady.then(() => requestAnimationFrame(revealHero));
      return;
    }

    sessionStorage.setItem("webdiv-seen", "1");
    preloader.hidden = false;
    nav.style.opacity = "0";
    document.body.style.overflow = "hidden";

    const sigWrap = $("#preloaderSig");
    const svg = buildSignature(sigWrap);

    fontsReady.then(() => {
      const writeDur = writeSignature(svg, 1250);

      /* Uebergabe: Signatur verkleinert sich zur Logo-Position, Zeichen zeichnet sich */
      setTimeout(() => {
        const navMark = $("#navMark");
        const from = sigWrap.getBoundingClientRect();
        const to = navMark.getBoundingClientRect();
        const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
        const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
        const s = Math.max(0.08, (to.height * 2.4) / from.height);

        sigWrap.animate([
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0 }
        ], { duration: 640, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" });

        nav.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 450, delay: 240, fill: "forwards"
        }).onfinish = () => (nav.style.opacity = "");
        drawMark($("#navMark"), 620, 260);

        setTimeout(() => {
          preloader.classList.add("done");
          document.body.style.overflow = "";
          revealHero();
          setTimeout(() => (preloader.hidden = true), 550);
        }, 480);
      }, writeDur + 120);
    });
  }

  /* ==========================================================================
     Hero: Lupe (Gewicht + Breite) mit Idle-Welle
     ========================================================================== */

  const heroState = {
    letters: [], centers: [], lineY: 0,
    cur: [], base: { wght: 700, wdth: 105 }, peak: { wght: 900, wdth: 125 },
    radius: 220, waveStart: 0, waveActive: false, lastWave: 0, hover: false
  };

  function heroReadVars() {
    const cs = getComputedStyle(docEl);
    heroState.base.wght = parseFloat(cs.getPropertyValue("--hero-wght-base")) || 700;
    heroState.base.wdth = parseFloat(cs.getPropertyValue("--hero-wdth-base")) || 105;
    heroState.peak.wght = parseFloat(cs.getPropertyValue("--hero-wght-peak")) || 900;
    heroState.peak.wdth = parseFloat(cs.getPropertyValue("--hero-wdth-peak")) || 125;
  }

  function initHero() {
    const mark = $("#heroMark");
    const text = mark.textContent;
    mark.textContent = "";
    [...text].forEach((ch) => {
      const s = document.createElement("span");
      s.className = "ltr";
      s.textContent = ch;
      mark.appendChild(s);
    });
    heroState.letters = $$(".ltr", mark);
    heroState.cur = heroState.letters.map(() => ({ wght: heroState.base.wght, wdth: heroState.base.wdth }));
    heroReadVars();

    hero.addEventListener("mouseenter", () => (heroState.hover = true));
    hero.addEventListener("mouseleave", () => (heroState.hover = false));
    watchVisibility(hero, "hero");
    visible.set("hero", true);
  }

  function measureHero() {
    /* Wrap statt Mark messen: die Mark startet um 105 % verschoben (Reveal) */
    const wrapRect = $(".hero-mark-wrap").getBoundingClientRect();
    heroState.lineY = wrapRect.top + wrapRect.height * 0.55 + scrollY_;
    heroState.centers = heroState.letters.map((l) => {
      const r = l.getBoundingClientRect();
      return r.left + r.width / 2;
    });
  }

  function tickHero(now) {
    if (!visible.get("hero")) return;
    const st = heroState;

    /* Idle-Welle: alle 3.5 s laeuft ein virtueller Zeiger in 1.6 s ueber die Zeile */
    let px = null, py = null;
    const canWave = !(finePointer && st.hover);
    if (canWave && !st.waveActive && now - st.lastWave > 3500) {
      st.waveActive = true;
      st.waveStart = now;
    }
    if (st.waveActive) {
      const t = (now - st.waveStart) / 1600;
      if (t >= 1 || (finePointer && st.hover)) {
        st.waveActive = false;
        st.lastWave = now;
      } else {
        const e = 0.5 - 0.5 * Math.cos(Math.PI * t); /* easeInOut */
        px = -st.radius + e * (innerWidth + st.radius * 2);
        py = st.lineY - scrollY_;
      }
    }
    if (finePointer && st.hover) {
      px = mouse.x;
      py = mouse.y;
    }

    st.letters.forEach((l, i) => {
      let f = 0;
      if (px !== null) {
        const dx = st.centers[i] - px;
        const dy = (st.lineY - scrollY_) - py;
        const d = Math.hypot(dx, dy * 0.6); /* horizontale Naehe zaehlt staerker */
        f = smoothstep(clamp(1 - d / st.radius, 0, 1));
      }
      const tw = st.base.wght + (st.peak.wght - st.base.wght) * f;
      const td = st.base.wdth + (st.peak.wdth - st.base.wdth) * f;
      const c = st.cur[i];
      c.wght = lerp(c.wght, tw, 0.2);
      c.wdth = lerp(c.wdth, td, 0.2);
      const w = Math.round(c.wght * 2) / 2;
      const d2 = Math.round(c.wdth * 2) / 2;
      if (l._w !== w || l._d !== d2) {
        l._w = w; l._d = d2;
        l.style.fontVariationSettings = `"wght" ${w}, "wdth" ${d2}`;
      }
    });
  }

  /* ==========================================================================
     Portraet: Parallax, Kobalt-Strich, Pills
     ========================================================================== */

  const portrait = $("#portrait");
  const stack = $(".stack");
  const portraitFigure = $("#portraitFigure");
  const strokePath = $("#portraitStrokePath");
  let stackTop = 0, strokeLen = 0;

  function initPortrait() {
    /* Platzhalter aktivieren, solange das Portraet fehlt */
    const img = $("#portraitImg");
    img.addEventListener("error", () => portraitFigure.classList.add("missing"));
    if (img.complete && img.naturalWidth === 0) portraitFigure.classList.add("missing");

    strokeLen = strokePath.getTotalLength();
    strokePath.style.strokeDasharray = strokeLen;
    strokePath.style.strokeDashoffset = strokeLen;

    new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) portrait.classList.add("in"); });
    }, { threshold: 0.45 }).observe(portrait);

    watchVisibility(stack, "stack");
  }

  function tickPortrait() {
    if (!visible.get("stack")) return;
    /* Parallax: Foto laeuft langsamer als der Scroll (ca. -12 % Sektionshoehe) */
    const f = clamp((smoothY - (stackTop - vh)) / (1.5 * vh), 0, 1);
    portraitFigure.style.transform = `translateX(-50%) translateY(${(0.06 - 0.12 * f) * vh}px)`;

    /* Kobalt-Strich zeichnet sich beim Einfahren */
    const draw = clamp((f - 0.18) / 0.5, 0, 1);
    strokePath.style.strokeDashoffset = strokeLen * (1 - smoothstep(draw));
  }

  /* ==========================================================================
     Statement: Wortfuellung, Kobalt-Linie, 3D-Objekte
     ========================================================================== */

  const statement = $("#statement");
  const stLinePath = $("#statementLinePath");
  let stTop = 0, stH = 0, stLineLen = 0;
  let words = [];
  const objs = [];

  function initStatement() {
    const p = $("#statementText");
    /* Textknoten (ausser "Ueber zehn Jahre") in Wort-Spans zerlegen */
    const nodes = [...p.childNodes];
    nodes.forEach((n) => {
      if (n.nodeType !== Node.TEXT_NODE) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const s = document.createElement("span");
          s.className = "w";
          s.textContent = part;
          frag.appendChild(s);
        }
      });
      p.replaceChild(frag, n);
    });
    words = $$(".w", p);

    stLineLen = stLinePath.getTotalLength();
    stLinePath.style.strokeDasharray = stLineLen;
    stLinePath.style.strokeDashoffset = stLineLen;

    $$(".float-obj", statement).forEach((el, i) => {
      objs.push({ el, depth: parseFloat(el.dataset.depth || "1"), phase: i * 1.7, mx: 0, my: 0 });
    });

    watchVisibility(statement, "statement");
  }

  function tickStatement(now) {
    if (!visible.get("statement")) return;
    const p = clamp((smoothY - stTop) / (stH - vh), 0, 1);

    /* Woerter fuellen sich Wort fuer Wort auf 100 % */
    const n = words.length;
    const x = clamp((p - 0.06) / 0.6, 0, 1) * (n + 2);
    words.forEach((w, i) => {
      const wp = clamp(x - i, 0, 1);
      const o = 0.28 + 0.72 * wp;
      if (w._o !== o) { w._o = o; w.style.setProperty("--wo", o.toFixed(3)); }
    });

    /* Kobalt-Linie zeichnet sich synchron zum Scroll */
    const dl = clamp((p - 0.5) / 0.42, 0, 1);
    stLinePath.style.strokeDashoffset = stLineLen * (1 - dl);

    /* Objekte: langsame Rotation (24 s/Umdrehung), minimale Zeiger-Reaktion */
    const baseRot = (now / 24000) * 360;
    objs.forEach((o) => {
      o.mx = lerp(o.mx, mouse.nx, 0.04);
      o.my = lerp(o.my, mouse.ny, 0.04);
      const rotY = Math.sin(((baseRot + o.phase * 40) * Math.PI) / 180) * 24 + o.mx * 6 * o.depth;
      const rotX = 10 + Math.cos(((baseRot * 0.7 + o.phase * 60) * Math.PI) / 180) * 6 + o.my * -4 * o.depth;
      const fy = Math.sin(now / 2400 + o.phase) * 9;
      o.el.style.transform =
        `perspective(1100px) translateY(${fy}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  }

  /* ==========================================================================
     Leistungen: Pin, kontinuierlicher Fortschritt, Hover-Override
     ========================================================================== */

  const pinWrap = $("#servicesPinWrap");
  const svcs = $$(".svc");
  const layers = $$(".media-layer");
  let pinTop = 0, pinH = 0, svcIdx = 0, svcHover = null;

  function initServices() {
    svcs.forEach((s) => {
      const idx = parseInt(s.dataset.idx, 10);
      s.addEventListener("mouseenter", () => { svcHover = idx; applyService(); });
      s.addEventListener("focusin", () => { svcHover = idx; applyService(); });
    });
    $("#servicesList").addEventListener("mouseleave", () => { svcHover = null; applyService(); });
    $("#servicesList").addEventListener("focusout", (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) { svcHover = null; applyService(); }
    });
    watchVisibility(pinWrap, "services");
  }

  function applyService() {
    const idx = svcHover !== null ? svcHover : svcIdx;
    svcs.forEach((s, i) => s.classList.toggle("active", i === idx));
    layers.forEach((l, i) => l.classList.toggle("active", i === idx));
  }

  function tickServices() {
    if (!visible.get("services")) return;
    const p = clamp((smoothY - pinTop) / (pinH - vh), 0, 0.999);
    const idx = Math.floor(p * 3);
    if (idx !== svcIdx) { svcIdx = idx; applyService(); }
  }

  /* ==========================================================================
     Projekte: Vorschaubild + Cursor-Pill folgen dem Zeiger
     ========================================================================== */

  const thumb = $("#projThumb");
  const pill = $("#cursorPill");
  const follow = { on: false, tx: 0, ty: 0, x: 0, y: 0, px: 0, py: 0, vx: 0 };

  function initProjects() {
    if (!finePointer) return;
    $$(".project-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        follow.on = true;
        follow.x = follow.tx = mouse.x;
        follow.y = follow.ty = mouse.y;
        thumb.classList.add("on");
        pill.classList.add("on");
      });
      row.addEventListener("mouseleave", () => {
        follow.on = false;
        thumb.classList.remove("on");
        pill.classList.remove("on");
      });
    });
  }

  function tickProjects() {
    if (!thumb.classList.contains("on") && Math.abs(follow.x - follow.tx) < 0.5) return;
    follow.tx = mouse.x;
    follow.ty = mouse.y;
    follow.vx = lerp(follow.vx, follow.tx - follow.x, 0.2);
    follow.x = lerp(follow.x, follow.tx, 0.14);
    follow.y = lerp(follow.y, follow.ty, 0.14);
    follow.px = lerp(follow.px, follow.tx, 0.26);
    follow.py = lerp(follow.py, follow.ty, 0.26);
    const rot = clamp(follow.vx * 0.35, -6, 6);
    thumb.style.transform =
      `translate(-50%, -50%) translate3d(${follow.x + 210}px, ${follow.y - 8}px, 0) rotate(${rot}deg) scale(1)`;
    pill.style.transform =
      `translate(-50%, -50%) translate3d(${follow.px}px, ${follow.py}px, 0) scale(1)`;
  }

  /* ==========================================================================
     Ablauf: Spalten-Stagger + Nummern zaehlen hoch
     ========================================================================== */

  function initProcess() {
    const sec = $(".process");
    new IntersectionObserver((es, io) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        sec.classList.add("in");
        $$(".process-num", sec).forEach((numEl, i) => {
          const target = parseInt(numEl.dataset.num, 10);
          const t0 = performance.now() + i * 90;
          const dur = 520;
          numEl.textContent = "00";
          const step = (now) => {
            const t = clamp((now - t0) / dur, 0, 1);
            const v = Math.round(target * t);
            numEl.textContent = String(v).padStart(2, "0");
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        io.disconnect();
      });
    }, { threshold: 0.3 }).observe(sec);
  }

  /* ==========================================================================
     Ueber mich: Bild-Platzhalter + Signatur zeichnet sich
     ========================================================================== */

  function initAbout() {
    const img = $("#aboutImg");
    const fig = $("#aboutFigure");
    img.addEventListener("error", () => fig.classList.add("missing"));
    if (img.complete && img.naturalWidth === 0) fig.classList.add("missing");

    const sigWrap = $("#aboutSig");
    const svg = buildSignature(sigWrap);
    if (!svg) return;
    new IntersectionObserver((es, io) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        writeSignature(svg, 1500);
        io.disconnect();
      });
    }, { threshold: 0.6 }).observe(sigWrap);
  }

  /* ==========================================================================
     Kontakt / Footer: Sequenz, Pixel-Portraet, Formular
     ========================================================================== */

  function initContact() {
    const sec = $("#kontakt");
    new IntersectionObserver((es, io) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        sec.classList.add("in");
        io.disconnect();
      });
    }, { threshold: 0.16 }).observe(sec);

    /* Pixel-Portraet: 24x24, dunkle Pixel (Foto-Hintergrund) werden transparent */
    const img = new Image();
    img.src = "assets/img/portrait.jpg";
    img.onload = () => {
      const c = $("#pixelCanvas");
      const ctx = c.getContext("2d");
      const side = Math.min(img.naturalWidth, img.naturalHeight * 0.72);
      const sx = (img.naturalWidth - side) / 2;
      const sy = img.naturalHeight * 0.04;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, 24, 24);
      const d = ctx.getImageData(0, 0, 24, 24);
      for (let i = 0; i < d.data.length; i += 4) {
        const lum = 0.2126 * d.data[i] + 0.7152 * d.data[i + 1] + 0.0722 * d.data[i + 2];
        if (lum < 26) d.data[i + 3] = 0;
      }
      ctx.putImageData(d, 0, 0);
      c.hidden = false;
      $("#pixelNote").hidden = true;
    };

    /* Formular: Prototyp-Verhalten ohne Backend (siehe HANDOFF.md) */
    const form = $("#contactForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      $$(".field", form).forEach((f) => {
        const input = $("input, textarea", f);
        const bad = !input.value.trim() ||
          (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
        f.classList.toggle("has-error", bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      form.classList.add("sent");
      $("button[type=submit]", form).disabled = true;
    });
    $$("input, textarea", form).forEach((i) =>
      i.addEventListener("input", () => i.closest(".field").classList.remove("has-error"))
    );
  }

  /* ==========================================================================
     Navigation: Hide/Show + Theme-Invertierung
     ========================================================================== */

  let lastY = 0;
  let themeZones = [];

  function measureThemes() {
    themeZones = [];
    const edges = $$(".step-edge");
    const stepH = parseFloat(getComputedStyle(docEl).getPropertyValue("--step-h")) || 64;
    const mid = stepH * 1.5;
    const at = (el) => el.getBoundingClientRect().top + scrollY_;
    themeZones.push({ y: 0, dark: false });
    themeZones.push({ y: at(edges[0]) + mid, dark: true });   /* -> dark-photo */
    themeZones.push({ y: at(edges[1]) + mid, dark: false });  /* -> paper */
    themeZones.push({ y: at(edges[2]) + mid, dark: true });   /* -> cobalt */
  }

  function tickNav() {
    const y = scrollY_;
    if (y > 120 && y > lastY + 4) {
      nav.classList.add("nav-hidden");
      lastY = y;
    } else if (y < lastY - 8 || y <= 120) {
      nav.classList.remove("nav-hidden");
      lastY = y;
    }
    let dark = false;
    for (const z of themeZones) if (y + 44 >= z.y) dark = z.dark;
    nav.classList.toggle("on-dark", dark);
  }

  /* ==========================================================================
     Generische Reveals
     ========================================================================== */

  function initReveals() {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.18 });
    $$("[data-reveal]").forEach((el) => io.observe(el));
  }

  /* ==========================================================================
     Regler-Panel
     ========================================================================== */

  function initControls() {
    const root = $("#controls");
    const toggle = $("#controlsToggle");
    toggle.addEventListener("click", () => {
      const open = root.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    const bind = (id, outId, fn) => {
      const input = $("#" + id);
      const out = $("#" + outId);
      input.addEventListener("input", () => {
        out.textContent = input.value;
        fn(parseFloat(input.value));
      });
      return input;
    };

    const setAccent = () => {
      const h = parseFloat($("#ctlHue").value);
      const s = parseFloat($("#ctlSat").value);
      docEl.style.setProperty("--cobalt", `hsl(${h}, ${s}%, 58%)`);
      docEl.style.setProperty("--cobalt-deep", `hsl(${h}, ${Math.round(s * 0.76)}%, 50%)`);
      docEl.style.setProperty("--cobalt-tint", `hsl(${h}, ${s}%, 93%)`);
    };

    bind("ctlHue", "outHue", setAccent);
    bind("ctlSat", "outSat", setAccent);
    bind("ctlWghtBase", "outWghtBase", (v) => { docEl.style.setProperty("--hero-wght-base", v); heroReadVars(); });
    bind("ctlWghtPeak", "outWghtPeak", (v) => { docEl.style.setProperty("--hero-wght-peak", v); heroReadVars(); });
    bind("ctlWdthBase", "outWdthBase", (v) => { docEl.style.setProperty("--hero-wdth-base", v); heroReadVars(); });
    bind("ctlWdthPeak", "outWdthPeak", (v) => { docEl.style.setProperty("--hero-wdth-peak", v); heroReadVars(); });
    bind("ctlStep", "outStep", (v) => { docEl.style.setProperty("--step-h", v + "px"); measureAll(); });
    bind("ctlGap", "outGap", (v) => { docEl.style.setProperty("--section-gap", v + "px"); measureAll(); });
    bind("ctlGrid", "outGrid", (v) => docEl.style.setProperty("--grid-vis", v / 100));
    $("#ctlCols").addEventListener("change", (e) =>
      $("#colOverlay").classList.toggle("on", e.target.checked)
    );

    $("#ctlReset").addEventListener("click", () => {
      ["--cobalt", "--cobalt-deep", "--cobalt-tint", "--hero-wght-base", "--hero-wght-peak",
       "--hero-wdth-base", "--hero-wdth-peak", "--step-h", "--section-gap", "--grid-vis"]
        .forEach((p) => docEl.style.removeProperty(p));
      const defaults = {
        ctlHue: 233, ctlSat: 100, ctlWghtBase: 700, ctlWghtPeak: 900,
        ctlWdthBase: 105, ctlWdthPeak: 125, ctlStep: 64, ctlGap: 180, ctlGrid: 100
      };
      Object.entries(defaults).forEach(([id, v]) => {
        $("#" + id).value = v;
        $("#out" + id.slice(3)).textContent = v;
      });
      $("#ctlCols").checked = false;
      $("#colOverlay").classList.remove("on");
      heroReadVars();
      measureAll();
    });
  }

  /* ==========================================================================
     Messen, Loop, Start
     ========================================================================== */

  function measureAll() {
    vh = innerHeight;
    scrollY_ = window.scrollY;
    stackTop = stack.getBoundingClientRect().top + scrollY_;
    stTop = statement.getBoundingClientRect().top + scrollY_;
    stH = statement.offsetHeight;
    pinTop = pinWrap.getBoundingClientRect().top + scrollY_;
    pinH = pinWrap.offsetHeight;
    measureHero();
    measureThemes();
  }

  function loop(now) {
    scrollY_ = window.scrollY;
    smoothY = Math.abs(smoothY - scrollY_) < 0.05 ? scrollY_ : lerp(smoothY, scrollY_, 0.115);

    tickNav();
    tickHero(now);
    tickPortrait();
    tickStatement(now);
    tickServices();
    tickProjects();

    requestAnimationFrame(loop);
  }

  /* Start */
  initHero();
  initPortrait();
  initStatement();
  initServices();
  initProjects();
  initProcess();
  initAbout();
  initContact();
  initReveals();
  initControls();
  initPreloader();

  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1000))]).then(() => {
    measureAll();
    applyService();
  });
  addEventListener("resize", measureAll);
  addEventListener("load", measureAll);

  requestAnimationFrame(loop);
})();
