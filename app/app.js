(function () {
  "use strict";

  const D = window.CURRICULUM_1406;
  const STORAGE_KEY = "arshad_ai_1406_progress_v4";
  const THEME_KEY = "arshad_theme";
  const IS_NETWORK = location.protocol === "http:" || location.protocol === "https:";

  const ICONS = {
    compass: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/></svg>',
    map: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
    layers: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>',
    fileText: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    book: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    folder: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    check: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    skip: '<svg class="icon icon-sm" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    sun: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevLeft: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
    chevRight: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',
    arrowLeft: '<svg class="icon icon-sm" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    external: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    calendar: '<svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    flag: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>'
  };

  function toFa(val) {
    return String(val).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadInitialState() {
    let cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (cur && typeof cur === "object") return cur;
    const prev = JSON.parse(localStorage.getItem("arshad_ai_1406_progress_v3") || "{}");
    const migrated = {};
    Object.keys(prev).forEach(k => {
      if (k.startsWith("azad_admin_") && prev[k]) migrated[k] = true;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }

  let state = loadInitialState();
  let activeView = "roadmap";
  let activeStationIndex = computeCurrentStationIndex();
  let activePhaseFilter = null;
  let subjectBlockFilter = "all";
  let activeBookletYear = D.booklets[0].year;
  let drawerContext = null; // { type: 'subject'|'station', id: string }

  function computeCurrentStationIndex() {
    const start = new Date(D.meta.kickoffIso + "T00:00:00+03:30");
    const now = new Date();
    const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const weekNum = Math.max(1, Math.min(22, Math.floor(diffDays / 7) + 1));
    const idx = D.stations.findIndex(st => weekNum >= st.weekStart && weekNum <= st.weekEnd);
    return idx >= 0 ? idx : 0;
  }

  function subjectMap() {
    const m = {};
    D.subjects.forEach(s => { m[s.id] = s; });
    return m;
  }
  const SUBJECTS = subjectMap();

  function allTopicsOfSubject(sub) {
    return [].concat(sub.topics.core, sub.topics.important, sub.topics.bonus);
  }

  function countTopics(ids) {
    let done = 0;
    ids.forEach(id => { if (state[id]) done++; });
    return { done, total: ids.length };
  }

  function getOverallStats() {
    const allTopicIds = [];
    D.subjects.forEach(s => allTopicsOfSubject(s).forEach(t => allTopicIds.push(t.id)));
    const { done, total } = countTopics(allTopicIds);
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  function blockPillClass(block) {
    if (block === "spec") return "pill-spec";
    if (block === "math") return "pill-math";
    return "pill-eng";
  }

  function blockCoefText(sub) {
    return `ضریب ${toFa(sub.coef)}`;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (IS_NETWORK) {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      }).catch(() => {});
    }
  }

  async function syncServerState() {
    if (!IS_NETWORK) return;
    try {
      const r = await fetch("/api/progress", { cache: "no-store" });
      if (!r.ok) return;
      const server = await r.json();
      if (server && typeof server === "object") {
        const merged = Object.assign({}, state, server);
        const changed = JSON.stringify(merged) !== JSON.stringify(state);
        state = merged;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (changed) renderAll();
        if (Object.keys(server).length === 0 && Object.keys(state).length > 0) saveState();
      }
    } catch (_) {}
  }

  function toggleTopic(id, checked) {
    state[id] = !!checked;
    saveState();
    renderAll();
  }

  /* THEME */
  function applyTheme(theme) {
    const t = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(THEME_KEY, t);
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.innerHTML = t === "dark" ? ICONS.sun : ICONS.moon;
      btn.title = t === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تیره";
    }
  }

  /* NAVIGATION */
  function setView(view, updateUrl = true) {
    const valid = ["roadmap", "subjects", "exams", "guide"];
    activeView = valid.includes(view) ? view : "roadmap";
    document.querySelectorAll(".view-panel").forEach(p => {
      p.classList.toggle("active", p.id === `view-${activeView}`);
    });
    document.querySelectorAll(".nav-tab").forEach(b => {
      b.classList.toggle("active", b.dataset.view === activeView);
    });
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("view", activeView);
      history.replaceState(null, "", url.toString());
    }
    if (activeView === "roadmap") {
      requestAnimationFrame(drawRoadConnector);
    }
  }

  /* RENDER HERO & ROADMAP */
  function renderRoadmapView() {
    const st = D.stations[activeStationIndex];
    const overall = getOverallStats();
    const stTopicIds = st.topicIds.length
      ? st.topicIds
      : st.subjects.flatMap(sid => allTopicsOfSubject(SUBJECTS[sid]).map(t => t.id));
    const stProg = countTopics(stTopicIds);

    const subjectPills = st.subjects.map(sid => {
      const sub = SUBJECTS[sid];
      return `<button type="button" class="pill pill-btn ${blockPillClass(sub.block)}" data-open-subject="${sub.id}">${esc(sub.title)} (${blockCoefText(sub)})</button>`;
    }).join("");

    const packageBtn = st.packageUrl
      ? `<a class="btn-secondary" href="${esc(st.packageUrl)}" target="_blank">${ICONS.fileText}<span>فایل راهنمای این ایستگاه</span></a>`
      : "";

    const deadlineTag = st.deadline
      ? `<span class="pill pill-focal">${ICONS.calendar}<span>${esc(st.deadline)}</span></span>`
      : "";

    document.getElementById("heroCard").innerHTML = `
      <div class="hero-top">
        <div class="hero-heading-group">
          <div class="hero-meta-row">
            <div class="week-switcher">
              <button type="button" class="week-step-btn" id="prevStationBtn" ${activeStationIndex <= 0 ? "disabled" : ""} title="ایستگاه قبلی">${ICONS.chevRight}</button>
              <span class="week-label">ایستگاه ${toFa(st.step)} از ${toFa(D.stations.length)} · ${esc(st.weeks)}</span>
              <button type="button" class="week-step-btn" id="nextStationBtn" ${activeStationIndex >= D.stations.length - 1 ? "disabled" : ""} title="ایستگاه بعدی">${ICONS.chevLeft}</button>
            </div>
            <span class="pill">${esc(st.jalali)}</span>
            ${deadlineTag}
          </div>
          <h1 class="hero-title">${esc(st.title)}</h1>
          <p class="hero-sub">${esc(st.goal)}</p>
          <div class="station-pills">${subjectPills}</div>
        </div>
        <div class="hero-progress-box">
          <div class="progress-head">
            <span>پیشرفت کل کنکور ۱۴۰۶</span>
            <strong>${toFa(overall.pct)}٪</strong>
          </div>
          <div class="track"><div class="track-fill ${overall.pct === 100 ? "done" : ""}" style="width:${overall.pct}%"></div></div>
          <div style="margin-top:8px; font-size:0.79rem; color:var(--ink-muted);">
            ${toFa(overall.done)} از ${toFa(overall.total)} مبحث کلیدی · ایستگاه فعلی: ${toFa(stProg.done)} از ${toFa(stProg.total)}
          </div>
        </div>
      </div>
      <div class="hero-actions">
        <button type="button" class="btn-primary" data-open-station="${st.id}">
          <span>باز کردن چک‌لیست مباحث و منابع این ایستگاه</span>
          ${ICONS.arrowLeft}
        </button>
        ${packageBtn}
      </div>
    `;

    // 5-Phase Ribbon
    document.getElementById("phaseRibbon").innerHTML = D.phases.map(ph => {
      const isActive = activePhaseFilter === ph.id;
      return `
        <button type="button" class="phase-btn ${isActive ? "active" : ""}" data-phase="${ph.id}">
          <div class="phase-btn-top">
            <span>فاز ${toFa(ph.order)}</span>
            <span>${esc(ph.weeks)}</span>
          </div>
          <div class="phase-btn-title">${esc(ph.title)}</div>
        </button>
      `;
    }).join("");

    // Winding Highway Stations
    document.getElementById("roadList").innerHTML = D.stations.map((s, idx) => {
      const slotClass = idx % 2 === 0 ? "road-slot-right" : "road-slot-left";
      const isCurrent = idx === activeStationIndex;
      const tIds = s.topicIds.length ? s.topicIds : s.subjects.flatMap(id => allTopicsOfSubject(SUBJECTS[id]).map(t => t.id));
      const prog = countTopics(tIds);
      const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
      const isDone = prog.total > 0 && prog.done === prog.total;
      const isDimmed = activePhaseFilter && activePhaseFilter !== s.phaseId;

      const pills = s.subjects.map(sid => {
        const sub = SUBJECTS[sid];
        return `<span class="pill ${blockPillClass(sub.block)}">${esc(sub.title)}</span>`;
      }).join("");

      const dl = s.deadline
        ? `<div style="margin-bottom:10px;"><span class="pill pill-focal">${ICONS.calendar}<span>${esc(s.deadline)}</span></span></div>`
        : "";

      return `
        <div class="road-row" data-phase-row="${s.phaseId}">
          <button type="button" class="station-node ${isCurrent ? "current" : ""} ${isDone ? "completed" : ""}" data-open-station="${s.id}" aria-label="ایستگاه ${s.step}">
            ${isDone ? ICONS.check : toFa(s.step)}
          </button>
          <article class="station-card ${slotClass} ${isCurrent ? "current" : ""} ${isDimmed ? "dimmed" : ""}" data-open-station="${s.id}">
            <div class="station-head">
              <span class="station-weeks">${esc(s.weeks)}</span>
              <span class="station-jalali">${esc(s.jalali)}</span>
            </div>
            <h3 class="station-title">${esc(s.title)}</h3>
            <p class="station-goal">${esc(s.goal)}</p>
            ${dl}
            <div class="station-pills">${pills}</div>
            <div class="station-foot">
              <div class="track"><div class="track-fill ${isDone ? "done" : ""}" style="width:${pct}%"></div></div>
              <span>${toFa(prog.done)} از ${toFa(prog.total)} مبحث</span>
            </div>
          </article>
        </div>
      `;
    }).join("");

    document.getElementById("finishBanner").innerHTML = `
      <div class="finish-banner-main">
        <div class="finish-icon">${ICONS.flag}</div>
        <div>
          <strong style="display:block; font-size:0.98rem;">خط پایان: ${esc(D.meta.examDateLabel)}</strong>
          <span style="font-size:0.84rem; color:var(--ink-muted);">کد مجموعه ${esc(D.meta.code)} · مهلت فراغت از تحصیل دانشگاه آزاد: ${esc(D.meta.azadDeadlineLabel)}</span>
        </div>
      </div>
      <button type="button" class="btn-secondary" data-go-view="guide">چک‌لیست دانشگاه آزاد و روز آزمون</button>
    `;

    requestAnimationFrame(drawRoadConnector);
  }

  /* SVG HIGHWAY CONNECTOR ALIGNED TO ACTUAL NODE CENTERS */
  function drawRoadConnector() {
    const wrap = document.getElementById("roadmapWrap");
    const svg = document.getElementById("roadSvg");
    if (!wrap || !svg || activeView !== "roadmap") return;

    const nodes = Array.from(wrap.querySelectorAll(".station-node"));
    if (nodes.length < 2) {
      svg.innerHTML = "";
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    if (!wrapRect.width || !wrapRect.height) return;

    svg.setAttribute("viewBox", `0 0 ${wrapRect.width} ${wrapRect.height}`);
    svg.setAttribute("width", wrapRect.width);
    svg.setAttribute("height", wrapRect.height);

    const pts = nodes.map(n => {
      const r = n.getBoundingClientRect();
      return {
        x: r.left - wrapRect.left + r.width / 2,
        y: r.top - wrapRect.top + r.height / 2,
        done: n.classList.contains("completed") || n.classList.contains("current")
      };
    });

    const isMobile = window.innerWidth <= 960;
    let paths = "";
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      let d;
      if (isMobile) {
        d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      } else {
        const midY = (a.y + b.y) / 2;
        const curveOffset = (i % 2 === 0 ? -18 : 18);
        d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${(a.x + curveOffset).toFixed(1)} ${midY.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      }
      const stroke = a.done ? "var(--spec)" : "var(--border-strong)";
      const dash = a.done ? "" : 'stroke-dasharray="6 6"';
      paths += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" ${dash} opacity="${a.done ? "0.75" : "0.85"}"/>`;
    }
    svg.innerHTML = paths;
  }

  /* RENDER SUBJECTS VIEW */
  function renderSubjectsView() {
    document.getElementById("blockStrip").innerHTML = D.blocks.map(b => `
      <div class="block-card">
        <div class="block-card-top">
          <span class="pill ${blockPillClass(b.id)}">ضریب ${toFa(b.coef)}</span>
          <span style="font-size:0.78rem; color:var(--ink-muted);">${esc(b.estQuestions)}</span>
        </div>
        <div class="block-share">${esc(b.share)} <span style="font-size:0.86rem; font-weight:600; color:var(--ink-muted);">· ${esc(b.name)}</span></div>
        <p class="block-desc">${esc(b.summary)}</p>
      </div>
    `).join("");

    const filters = [
      { id: "all", label: "همه ۱۲ درس (ترتیب پیشنهادی)" },
      { id: "spec", label: "تخصصی ضریب ۴ (۸ درس)" },
      { id: "math", label: "ریاضیات ضریب ۲ (۳ درس)" },
      { id: "eng", label: "زبان انگلیسی ضریب ۱" }
    ];
    document.getElementById("subjectFilters").innerHTML = filters.map(f => `
      <button type="button" class="filter-btn ${subjectBlockFilter === f.id ? "active" : ""}" data-block-filter="${f.id}">${f.label}</button>
    `).join("");

    const list = D.subjects.filter(s => subjectBlockFilter === "all" || s.block === subjectBlockFilter);
    document.getElementById("subjectsGrid").innerHTML = list.map(sub => {
      const tIds = allTopicsOfSubject(sub).map(t => t.id);
      const prog = countTopics(tIds);
      const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
      const newTag = sub.isNew1406 ? `<span class="pill pill-new">جدید ۱۴۰۶</span>` : "";

      return `
        <article class="subject-card" data-open-subject="${sub.id}">
          <div>
            <div class="subject-card-top">
              <div>
                <h3 class="subject-title">${esc(sub.title)}</h3>
                <div class="subject-meta">${esc(sub.weeks)} · ${esc(sub.shareLabel)}</div>
              </div>
              <span class="subject-order">${toFa(sub.order)}</span>
            </div>
            <div class="subject-badges" style="margin:10px 0;">
              <span class="pill ${blockPillClass(sub.block)}">${blockCoefText(sub)}</span>
              ${newTag}
              <span class="pill">${esc(sub.roiBadge)}</span>
            </div>
            <p class="subject-one-liner">${esc(sub.oneLiner)}</p>
          </div>
          <div class="subject-foot">
            <div class="subject-foot-row">
              <span>پیش‌نیاز: ${esc(sub.prerequisite)}</span>
              <span>${toFa(prog.done)} از ${toFa(prog.total)}</span>
            </div>
            <div class="track"><div class="track-fill ${pct === 100 ? "done" : ""}" style="width:${pct}%"></div></div>
          </div>
        </article>
      `;
    }).join("");
  }

  /* RENDER EXAMS VIEW */
  function renderExamsView() {
    document.getElementById("examQuickLinks").innerHTML = D.extraExamLinks.map(l => `
      <a class="btn-secondary" href="${esc(l.url)}" target="_blank">${ICONS.fileText}<span>${esc(l.label)}</span></a>
    `).join("");

    document.getElementById("yearTabs").innerHTML = D.booklets.map(b => `
      <button type="button" class="year-btn ${activeBookletYear === b.year ? "active" : ""}" data-year="${b.year}">کنکور ${b.year}</button>
    `).join("");

    const bk = D.booklets.find(b => b.year === activeBookletYear) || D.booklets[0];
    document.getElementById("bookletPanel").innerHTML = `
      <div class="booklet-header">
        <div>
          <h3 style="margin:0 0 4px 0; font-size:1.1rem; font-weight:800;">دفترچه کنکور کارشناسی ارشد ${bk.year}</h3>
          <span style="font-size:0.85rem; color:var(--ink-muted);">${esc(bk.totalQ)} · ${esc(bk.duration)} · ${esc(bk.note)}</span>
        </div>
        <a class="btn-primary" href="${esc(bk.pdfUrl)}" target="_blank">${ICONS.external}<span>باز کردن PDF دفترچه ${bk.year}</span></a>
      </div>
      <div class="filter-columns">
        <div class="filter-col">
          <h4 class="filter-col-head keep">${ICONS.check}<span>سوالات معتبر برای حل در ۱۴۰۶</span></h4>
          <ul class="range-list">
            ${bk.keep.map(k => `<li class="range-item"><span class="range-code">سوال ${esc(k.range)}</span><span>${esc(k.label)}</span></li>`).join("")}
          </ul>
        </div>
        <div class="filter-col">
          <h4 class="filter-col-head skip">${ICONS.skip}<span>سوالات حذف‌شده — سر جلسه رد کنید</span></h4>
          <ul class="range-list">
            ${bk.skip.map(s => `<li class="range-item"><span class="range-code">${esc(s.range)}</span><span>${esc(s.label)}</span></li>`).join("")}
          </ul>
        </div>
      </div>
    `;

    document.getElementById("archivedList").innerHTML = `
      <div class="resource-list">
        ${D.archivedCourses.map(a => `
          <a class="resource-link" href="${esc(a.url)}" target="_blank">
            <span class="resource-left">${ICONS.folder}<span>${esc(a.title)}</span></span>
            <span class="resource-kind">آرشیو</span>
          </a>
        `).join("")}
      </div>
    `;
  }

  /* RENDER GUIDE & AZAD VIEW */
  function renderGuideView() {
    const stg = D.strategy;
    const azadProg = countTopics(D.azadChecklist.map(a => a.id));

    document.getElementById("guideLeft").innerHTML = `
      <div class="editorial-card prose-measure">
        <h3>مقایسه ساختار قدیم با نظام رسمی ۱۴۰۶ (کد ۱۲۷۷ — کد ضریب ۱)</h3>
        <div class="table-scroll">
          <table class="clean-table">
            <thead>
              <tr><th>بلوک امتحانی</th><th>نظام قدیم (تا ۱۴۰۴/۱۴۰۵)</th><th>ساختار ۱۴۰۶ (جمع ضرایب ۷)</th><th>تحلیل و اثر روی رتبه</th></tr>
            </thead>
            <tbody>
              ${stg.oldVsNew.map(r => `<tr><td><strong>${esc(r.block)}</strong></td><td>${esc(r.oldShare)}</td><td><strong>${esc(r.newShare)}</strong></td><td>${esc(r.impact)}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div class="notice-bar">${esc(D.meta.disclaimer)}</div>
      </div>

      <div class="editorial-card prose-measure">
        <h3>قوانین مهندسی مطالعه و استراتژی کنکور ۱۴۰۶</h3>
        <div class="rule-list">
          ${stg.studyRules.map(r => `<div class="rule-item"><h4>${esc(r.title)}</h4><p>${esc(r.body)}</p></div>`).join("")}
        </div>
      </div>

      <div class="editorial-card prose-measure">
        <h3>مدیریت زمان پیشنهادی سر جلسه کنکور (برآورد ۲۴۰ دقیقه)</h3>
        <div class="table-scroll">
          <table class="clean-table">
            <thead>
              <tr><th>بازه زمانی</th><th>دروس هدف</th><th>تاکتیک اجرایی</th></tr>
            </thead>
            <tbody>
              ${stg.examProtocol.map(p => `<tr><td><strong>${esc(p.step)}</strong></td><td>${esc(p.target)}</td><td>${esc(p.rule)}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="editorial-card prose-measure">
        <h3>حدود میانگین وزنی هدف برای قبولی گرایش هوش مصنوعی</h3>
        <div class="rule-list">
          ${stg.targetPercentages.map(t => `<div class="rule-item"><h4>${esc(t.tier)} — <span style="color:var(--spec-ink);">${esc(t.weighted)}</span></h4><p>${esc(t.detail)}</p></div>`).join("")}
        </div>
      </div>
    `;

    document.getElementById("guideRight").innerHTML = `
      <div class="editorial-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h3 style="margin:0;">چک‌لیست فارغ‌التحصیلی دانشگاه آزاد</h3>
          <span class="pill pill-ok">${toFa(azadProg.done)} از ${toFa(azadProg.total)}</span>
        </div>
        <p style="margin:0 0 12px 0; font-size:0.83rem; color:var(--ink-muted);">شرط قانونی ورود به ارشد مهر ۱۴۰۶: اتمام ۵ تا ۷ واحد باقیمانده تا <strong>${esc(D.meta.azadDeadlineLabel)}</strong></p>
        <div class="azad-list">
          ${D.azadChecklist.map(a => {
            const chk = !!state[a.id];
            return `
              <label class="check-row ${chk ? "done" : ""}">
                <input type="checkbox" ${chk ? "checked" : ""} data-topic-id="${a.id}" />
                <div>
                  <span class="check-text"><strong>${esc(a.step)}:</strong> ${esc(a.text)}</span>
                  <span class="check-sub">${esc(a.timing)}</span>
                </div>
              </label>
            `;
          }).join("")}
        </div>
      </div>

      <div class="editorial-card">
        <h3>تقویم تاریخ‌های سرنوشت‌ساز</h3>
        <div class="dates-list">
          ${D.criticalDates.map(d => `
            <div class="date-item">
              <div class="date-label">${esc(d.date)}</div>
              <div class="date-title">${esc(d.title)}</div>
              <div class="date-detail">${esc(d.detail)}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="editorial-card">
        <h3>اسناد رسمی و نقشه‌های مرجع</h3>
        <div class="resource-list">
          ${D.officialDocs.map(doc => `
            <a class="resource-link" href="${esc(doc.url)}" target="_blank">
              <span class="resource-left">${ICONS.fileText}<span>${esc(doc.label)}</span></span>
              <span class="resource-kind">باز کردن</span>
            </a>
          `).join("")}
        </div>
      </div>

      <div class="editorial-card">
        <h3>پشتیبان‌گیری و انتقال پیشرفت (آفلاین / آیفون)</h3>
        <p style="margin:0 0 12px 0; font-size:0.83rem; color:var(--ink-muted);">تیک‌های مطالعه و چک‌لیست روی همین دستگاه ذخیره می‌شوند. برای انتقال بین آیفون و کامپیوتر یا نگهداری نسخه پشتیبان، از دکمه‌های زیر استفاده کنید.</p>
        <div class="backup-actions">
          <button type="button" class="btn-soft" id="exportProgressBtn">ذخیره فایل بکاپ (JSON)</button>
          <button type="button" class="btn-soft" id="importProgressBtn">بازیابی از فایل بکاپ</button>
          <input type="file" id="importProgressFile" accept=".json,application/json" hidden />
        </div>
        <div id="backupStatus" style="margin-top:8px; font-size:0.78rem; color:var(--ink-muted);"></div>
      </div>
    `;
  }

  /* SLIDE-OVER DRAWER */
  function openDrawer(type, id) {
    drawerContext = { type, id };
    renderDrawerContent();
    document.getElementById("drawerBackdrop").classList.add("open");
    document.getElementById("drawerPanel").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawerContext = null;
    document.getElementById("drawerBackdrop").classList.remove("open");
    document.getElementById("drawerPanel").classList.remove("open");
    document.body.style.overflow = "";
  }

  function resourceIcon(kind) {
    if (kind === "folder") return ICONS.folder;
    if (kind === "pdf") return ICONS.book;
    return ICONS.fileText;
  }

  function resourceKindLabel(kind) {
    return { lesson: "درس‌نامه", syllabus: "سرفصل", pdf: "جزوه PDF", folder: "پوشه جزوات", tests: "تست و حل" }[kind] || "فایل";
  }

  function renderDrawerContent() {
    if (!drawerContext) return;
    const headTitle = document.getElementById("drawerTitle");
    const headBadges = document.getElementById("drawerBadges");
    const body = document.getElementById("drawerBody");

    if (drawerContext.type === "subject") {
      const sub = SUBJECTS[drawerContext.id];
      if (!sub) return;
      const tIds = allTopicsOfSubject(sub).map(t => t.id);
      const prog = countTopics(tIds);
      const newTag = sub.isNew1406 ? `<span class="pill pill-new">جدید ۱۴۰۶</span>` : "";

      headTitle.textContent = sub.title;
      headBadges.innerHTML = `
        <span class="pill ${blockPillClass(sub.block)}">${blockCoefText(sub)} · ${esc(sub.shareLabel)}</span>
        ${newTag}
        <span class="pill">${toFa(prog.done)} از ${toFa(prog.total)} مبحث</span>
      `;

      const renderTier = (title, dotClass, arr) => {
        if (!arr || !arr.length) return "";
        return `
          <div class="drawer-section">
            <h4 class="drawer-section-title"><span class="dot ${dotClass}"></span><span>${title}</span></h4>
            <div>
              ${arr.map(t => {
                const chk = !!state[t.id];
                return `
                  <label class="check-row ${chk ? "done" : ""}">
                    <input type="checkbox" ${chk ? "checked" : ""} data-topic-id="${t.id}" />
                    <span class="check-text">${esc(t.text)}</span>
                  </label>
                `;
              }).join("")}
            </div>
          </div>
        `;
      };

      body.innerHTML = `
        <p style="margin:0 0 16px 0; font-size:0.88rem; color:var(--ink-muted);">${esc(sub.oneLiner)} <br/><strong>زمان‌بندی:</strong> ${esc(sub.weeks)} · <strong>پیش‌نیاز:</strong> ${esc(sub.prerequisite)}</p>
        ${renderTier("اولویت ۱ — ستون اصلی و فوق‌پرتکرار", "dot-core", sub.topics.core)}
        ${renderTier("اولویت ۲ — مهم و نمره‌آور", "dot-imp", sub.topics.important)}
        ${renderTier("اولویت ۳ — تکمیلی و رتبه‌ساز", "dot-bonus", sub.topics.bonus)}
        <div class="drawer-section">
          <h4 class="drawer-section-title">${ICONS.compass}<span>نکات کلیدی و دام‌های تستی این درس</span></h4>
          ${sub.tips.map(tp => `<div class="tip-box">${esc(tp)}</div>`).join("")}
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-title">${ICONS.folder}<span>فایل‌ها و جزوات آماده روی سیستم</span></h4>
          <div class="resource-list">
            ${sub.resources.map(r => `
              <a class="resource-link" href="${esc(r.url)}" target="_blank">
                <span class="resource-left">${resourceIcon(r.kind)}<span>${esc(r.label)}</span></span>
                <span class="resource-kind">${resourceKindLabel(r.kind)}</span>
              </a>
            `).join("")}
          </div>
        </div>
      `;
    } else if (drawerContext.type === "station") {
      const st = D.stations.find(s => s.id === drawerContext.id);
      if (!st) return;

      const tIds = st.topicIds.length ? st.topicIds : st.subjects.flatMap(sid => allTopicsOfSubject(SUBJECTS[sid]).map(t => t.id));
      const prog = countTopics(tIds);

      headTitle.textContent = `ایستگاه ${toFa(st.step)}: ${st.title}`;
      headBadges.innerHTML = `
        <span class="pill pill-spec">${esc(st.weeks)}</span>
        <span class="pill">${esc(st.jalali)}</span>
        <span class="pill pill-ok">${toFa(prog.done)} از ${toFa(prog.total)} مبحث</span>
      `;

      // Group station topics by subject
      const topicLookup = {};
      D.subjects.forEach(s => {
        allTopicsOfSubject(s).forEach(t => { topicLookup[t.id] = { sub: s, topic: t }; });
      });

      const topicsHtml = st.topicIds.length
        ? st.topicIds.map(tid => {
            const pair = topicLookup[tid];
            if (!pair) return "";
            const chk = !!state[tid];
            return `
              <label class="check-row ${chk ? "done" : ""}">
                <input type="checkbox" ${chk ? "checked" : ""} data-topic-id="${tid}" />
                <div>
                  <span class="check-text">${esc(pair.topic.text)}</span>
                  <span class="check-sub">${esc(pair.sub.title)}</span>
                </div>
              </label>
            `;
          }).join("")
        : `<div class="tip-box">در هفته‌های ۲۱ و ۲۲ مرور کلی و شبیه‌سازی کامل انجام می‌شود؛ روی هر درس زیر کلیک کنید تا به خلاصه‌اش بروید.</div>`;

      const packageHtml = st.packageUrl
        ? `<div class="drawer-section"><h4 class="drawer-section-title">${ICONS.fileText}<span>فایل شروع و راهنمای این ایستگاه</span></h4><a class="resource-link" href="${esc(st.packageUrl)}" target="_blank"><span class="resource-left">${ICONS.fileText}<span>باز کردن راهنما و برنامه ایستگاه</span></span><span class="resource-kind">باز کردن</span></a></div>`
        : "";

      const deadlineHtml = st.deadline
        ? `<div style="margin-bottom:14px;"><span class="pill pill-focal">${ICONS.calendar}<span>${esc(st.deadline)}</span></span></div>`
        : "";

      body.innerHTML = `
        <p style="margin:0 0 12px 0; font-size:0.9rem; color:var(--ink-muted);">${esc(st.goal)}</p>
        ${deadlineHtml}
        <div class="tip-box">${esc(st.checklistNote)}</div>
        ${packageHtml}
        <div class="drawer-section">
          <h4 class="drawer-section-title">${ICONS.check}<span>مباحث هدف در این ایستگاه (تیک بزنید)</span></h4>
          <div>${topicsHtml}</div>
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-title">${ICONS.layers}<span>دروس فعال این ایستگاه (برای جزئیات و جزوات کلیک کنید)</span></h4>
          <div class="resource-list">
            ${st.subjects.map(sid => {
              const sub = SUBJECTS[sid];
              return `
                <button type="button" class="resource-link" style="width:100%; text-align:right; cursor:pointer;" data-open-subject="${sub.id}">
                  <span class="resource-left"><span class="pill ${blockPillClass(sub.block)}">${blockCoefText(sub)}</span><span>${esc(sub.title)}</span></span>
                  <span class="resource-kind">مشاهده منابع ←</span>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }
  }

  function updateCountdown() {
    const exam = new Date(D.meta.examIso + "T08:00:00+03:30");
    const days = Math.max(0, Math.ceil((exam - new Date()) / (1000 * 60 * 60 * 24)));
    const el = document.getElementById("countdownPill");
    if (el) el.innerHTML = `${ICONS.calendar}<span>${toFa(days)} روز تا کنکور ۱۶ اردیبهشت</span>`;
  }

  function renderAll() {
    renderRoadmapView();
    renderSubjectsView();
    renderExamsView();
    renderGuideView();
    if (drawerContext) renderDrawerContent();
  }

  /* EVENT DELEGATION */
  document.addEventListener("click", e => {
    const navBtn = e.target.closest("[data-view]");
    if (navBtn) { setView(navBtn.dataset.view); return; }

    const goBtn = e.target.closest("[data-go-view]");
    if (goBtn) { setView(goBtn.dataset.goView); window.scrollTo({ top: 0, behavior: "smooth" }); return; }

    if (e.target.closest("#themeToggle")) {
      const cur = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(cur === "dark" ? "light" : "dark");
      return;
    }

    if (e.target.closest("#prevStationBtn")) {
      if (activeStationIndex > 0) { activeStationIndex--; renderRoadmapView(); }
      return;
    }
    if (e.target.closest("#nextStationBtn")) {
      if (activeStationIndex < D.stations.length - 1) { activeStationIndex++; renderRoadmapView(); }
      return;
    }

    const phaseBtn = e.target.closest("[data-phase]");
    if (phaseBtn) {
      const pid = phaseBtn.dataset.phase;
      activePhaseFilter = activePhaseFilter === pid ? null : pid;
      renderRoadmapView();
      if (activePhaseFilter) {
        const firstRow = document.querySelector(`[data-phase-row="${activePhaseFilter}"]`);
        if (firstRow) firstRow.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const subTrigger = e.target.closest("[data-open-subject]");
    if (subTrigger) {
      e.stopPropagation();
      openDrawer("subject", subTrigger.dataset.openSubject);
      return;
    }

    const stTrigger = e.target.closest("[data-open-station]");
    if (stTrigger) {
      openDrawer("station", stTrigger.dataset.openStation);
      return;
    }

    const bf = e.target.closest("[data-block-filter]");
    if (bf) {
      subjectBlockFilter = bf.dataset.blockFilter;
      renderSubjectsView();
      return;
    }

    const yb = e.target.closest("[data-year]");
    if (yb) {
      activeBookletYear = yb.dataset.year;
      renderExamsView();
      return;
    }

    if (e.target.closest("#drawerClose") || e.target.id === "drawerBackdrop") {
      closeDrawer();
      return;
    }

    if (e.target.closest("#mdModalClose") || e.target.id === "mdModalBackdrop") {
      closeMarkdownReader();
      return;
    }

    if (e.target.closest("#exportProgressBtn")) {
      exportProgressJson();
      return;
    }

    if (e.target.closest("#importProgressBtn")) {
      const inp = document.getElementById("importProgressFile");
      if (inp) inp.click();
      return;
    }

    const mdLink = e.target.closest("a[href]");
    if (mdLink && IS_NETWORK) {
      const href = mdLink.getAttribute("href") || "";
      const cleanHref = href.split("#")[0].split("?")[0];
      if (cleanHref.toLowerCase().endsWith(".md") && !href.startsWith("http://") && !href.startsWith("https://")) {
        e.preventDefault();
        openMarkdownReader(cleanHref, mdLink.textContent.trim());
        return;
      }
    }
  });

  document.addEventListener("change", e => {
    const chk = e.target.closest("input[data-topic-id]");
    if (chk) {
      toggleTopic(chk.dataset.topicId, chk.checked);
      return;
    }
    if (e.target && e.target.id === "importProgressFile" && e.target.files && e.target.files[0]) {
      importProgressJson(e.target.files[0]);
      e.target.value = "";
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (document.getElementById("mdModalBackdrop")?.classList.contains("open")) {
        closeMarkdownReader();
      } else if (drawerContext) {
        closeDrawer();
      }
    }
  });

  /* OFFLINE MARKDOWN READER & BACKUP HELPERS */
  function formatInlineMd(text) {
    let s = esc(text);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, lbl, url) => {
      const safe = /^(https?:|\/|\.\/|\.\.\/)/i.test(url) || !url.includes(":") ? url : "#";
      return `<a href="${esc(safe)}" target="_blank" rel="noopener">${lbl}</a>`;
    });
    return s;
  }

  function renderMarkdownToHtml(mdText) {
    const lines = String(mdText || "").replace(/\r\n/g, "\n").split("\n");
    const out = [];
    let i = 0;
    let inCode = false;
    let codeBuf = [];

    while (i < lines.length) {
      const line = lines[i];
      if (line.trim().startsWith("```")) {
        if (!inCode) {
          inCode = true;
          codeBuf = [];
        } else {
          out.push(`<pre><code>${esc(codeBuf.join("\n"))}</code></pre>`);
          inCode = false;
        }
        i++;
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        i++;
        continue;
      }

      if (!line.trim()) {
        i++;
        continue;
      }

      if (/^---+$/.test(line.trim())) {
        out.push("<hr />");
        i++;
        continue;
      }

      const hMatch = /^(#{1,4})\s+(.*)$/.exec(line);
      if (hMatch) {
        const lvl = hMatch[1].length;
        out.push(`<h${lvl}>${formatInlineMd(hMatch[2])}</h${lvl}>`);
        i++;
        continue;
      }

      if (line.trim().startsWith(">")) {
        const quoteLines = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(formatInlineMd(lines[i].replace(/^\s*>\s?/, "")));
          i++;
        }
        out.push(`<blockquote>${quoteLines.join("<br />")}</blockquote>`);
        continue;
      }

      if (line.includes("|") && i + 1 < lines.length && /^\s*\|?[\s:-]+\|/.test(lines[i + 1])) {
        const parseRow = r => r.replace(/^\s*\||\|\s*$/g, "").split("|").map(c => c.trim());
        const headers = parseRow(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
          rows.push(parseRow(lines[i]));
          i++;
        }
        out.push(
          `<div class="table-scroll"><table class="clean-table"><thead><tr>${
            headers.map(h => `<th>${formatInlineMd(h)}</th>`).join("")
          }</tr></thead><tbody>${
            rows.map(r => `<tr>${r.map(c => `<td>${formatInlineMd(c)}</td>`).join("")}</tr>`).join("")
          }</tbody></table></div>`
        );
        continue;
      }

      if (/^\s*[-*]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          const rawItem = lines[i].replace(/^\s*[-*]\s+/, "");
          const cb = /^\[(x|X| )\]\s+(.*)$/.exec(rawItem);
          if (cb) {
            const done = cb[1].toLowerCase() === "x";
            items.push(`<li class="md-task">${done ? "&#9745;" : "&#9744;"} ${formatInlineMd(cb[2])}</li>`);
          } else {
            items.push(`<li>${formatInlineMd(rawItem)}</li>`);
          }
          i++;
        }
        out.push(`<ul>${items.join("")}</ul>`);
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          items.push(`<li>${formatInlineMd(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`);
          i++;
        }
        out.push(`<ol>${items.join("")}</ol>`);
        continue;
      }

      const para = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^(#{1,4}\s|```|---+$|>|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])
      ) {
        para.push(formatInlineMd(lines[i]));
        i++;
      }
      out.push(`<p>${para.join("<br />")}</p>`);
    }
    return out.join("\n");
  }

  async function openMarkdownReader(path, label) {
    const backdrop = document.getElementById("mdModalBackdrop");
    const titleEl = document.getElementById("mdModalTitle");
    const subEl = document.getElementById("mdModalSub");
    const bodyEl = document.getElementById("mdModalBody");
    if (!backdrop || !bodyEl) return;

    titleEl.textContent = label || path.split("/").pop();
    subEl.textContent = path;
    bodyEl.innerHTML = `<p style="color:var(--ink-muted);">در حال باز کردن جزوه...</p>`;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";

    try {
      const fetchPath = path.startsWith("./") ? path : `./${path.replace(/^\/+/, "")}`;
      const res = await fetch(encodeURI(fetchPath));
      if (!res.ok) throw new Error("HTTP " + res.status);
      const text = await res.text();
      bodyEl.innerHTML = renderMarkdownToHtml(text);
    } catch (err) {
      bodyEl.innerHTML = `<div class="notice-bar">امکان بارگذاری این فایل در حالت فعلی وجود نداشت (${esc(String(err))}).</div>`;
    }
  }

  function closeMarkdownReader() {
    const backdrop = document.getElementById("mdModalBackdrop");
    if (backdrop) backdrop.classList.remove("open");
    if (!drawerContext) document.body.style.overflow = "";
  }

  function exportProgressJson() {
    const payload = {
      app: "arshad_ai_1406",
      exportedAt: new Date().toISOString(),
      theme: localStorage.getItem(THEME_KEY) || "light",
      progress: state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `arshad-1406-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    const st = document.getElementById("backupStatus");
    if (st) st.textContent = "فایل بکاپ با موفقیت ذخیره شد.";
  }

  function importProgressJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const st = document.getElementById("backupStatus");
      try {
        const data = JSON.parse(String(reader.result || "{}"));
        const next = data.progress && typeof data.progress === "object" ? data.progress : data;
        state = Object.assign({}, next);
        saveLocalState();
        if (data.theme) applyTheme(data.theme);
        if (IS_NETWORK) {
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state)
          }).catch(() => {});
        }
        renderAll();
        if (st) st.textContent = "پیشرفت با موفقیت بازیابی و اعمال شد.";
      } catch (_) {
        if (st) st.textContent = "فایل انتخاب‌شده معتبر نیست.";
      }
    };
    reader.readAsText(file);
  }

  /* INIT */
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  updateCountdown();
  renderAll();

  const params = new URLSearchParams(location.search);
  setView(params.get("view") || "roadmap", false);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawRoadConnector);
  }
  window.addEventListener("resize", () => requestAnimationFrame(drawRoadConnector));
  const roadListEl = document.getElementById("roadList");
  if (roadListEl && typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => requestAnimationFrame(drawRoadConnector)).observe(roadListEl);
  }
  syncServerState();

  if (IS_NETWORK && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
})();
