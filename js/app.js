/* =========================================================
 * 안전제일 PPE 체크 — 앱 로직
 * 해시 라우팅 · KO/EN 전환 · 체크리스트 · 점검 기록
 * ========================================================= */
(function () {
  "use strict";

  var D = window.APP_DATA;
  var STORE_LANG = "ppe_lang";
  var STORE_RECORDS = "ppe_records_v1";

  var lang = localStorage.getItem(STORE_LANG) === "en" ? "en" : "ko";

  /* URL로 언어 지정 가능: index.html?lang=en (공유용 링크) */
  var urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang === "en" || urlLang === "ko") {
    lang = urlLang;
    localStorage.setItem(STORE_LANG, lang);
  }

  /* 공종별 점검 세션 — 사이드바로 공종을 오가도 체크 상태가 유지됩니다 */
  var sessions = {};
  var session = null;

  function freshSession(id) {
    return { tradeId: id, checked: {}, worker: "", completed: false };
  }

  var app = document.getElementById("app");

  /* ---------- 유틸 ---------- */

  function t(key, vars) {
    var entry = D.i18n[key];
    var s = entry ? entry[lang] : key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace("{" + k + "}", vars[k]);
      });
    }
    return s;
  }

  function loc(field) {
    return field ? field[lang] : "";
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function getTrade(id) {
    for (var i = 0; i < D.trades.length; i++) {
      if (D.trades[i].id === id) return D.trades[i];
    }
    return null;
  }

  function ppeOf(tradePpe) {
    var item = D.ppeCatalog[tradePpe.id];
    return {
      id: tradePpe.id,
      level: tradePpe.level,
      note: tradePpe.note || null,
      cat: item.cat,
      aiLabel: item.aiLabel,
      name: item.name,
      desc: item.desc
    };
  }

  function todayStr() {
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function loadRecords() {
    try {
      return JSON.parse(localStorage.getItem(STORE_RECORDS)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveRecords(records) {
    localStorage.setItem(STORE_RECORDS, JSON.stringify(records));
  }

  /* ---------- 언어 전환 ---------- */

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-t]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-t"));
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
    document.title = lang === "ko"
      ? "안전제일 PPE 체크 — 툴박스 미팅 보호구 점검"
      : "Safety First PPE Check — Toolbox Meeting PPE Checklists";
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-lang");
      if (next === lang) return;
      lang = next;
      localStorage.setItem(STORE_LANG, lang);
      applyLang();
      route(); /* 현재 화면을 새 언어로 다시 그림 (체크 상태 유지) */
    });
  });

  /* ---------- 라우터 ---------- */

  function route() {
    var hash = location.hash || "#/";
    var m;
    if ((m = hash.match(/^#\/trade\/([\w-]+)/))) {
      renderTrade(m[1]);
      setNav("home");
    } else if (hash.indexOf("#/summary") === 0) {
      renderSummary();
      setNav("summary");
    } else if (hash.indexOf("#/records") === 0) {
      renderRecords();
      setNav("records");
    } else {
      renderHome();
      setNav("home");
    }
    window.scrollTo(0, 0);
  }

  function setNav(active) {
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === active);
    });
  }

  window.addEventListener("hashchange", route);

  /* ---------- 화면: 홈 ---------- */

  function renderHome() {
    var cards = D.trades.map(function (trade) {
      var req = 0, cond = 0;
      trade.ppe.forEach(function (p) { p.level === "required" ? req++ : cond++; });
      return (
        '<a class="trade-card" href="#/trade/' + trade.id + '">' +
          '<span class="trade-plate" aria-hidden="true">' + esc(trade.plate) + "</span>" +
          '<span class="trade-card-body">' +
            "<strong>" + esc(loc(trade.name)) + "</strong>" +
            "<small>" + esc(lang === "ko" ? trade.name.en : trade.name.ko) + "</small>" +
            '<span class="trade-count">' + t("cardCount", { r: req, c: cond }) + "</span>" +
          "</span>" +
          '<span class="trade-arrow" aria-hidden="true">→</span>' +
        "</a>"
      );
    }).join("");

    app.innerHTML =
      '<section class="hero">' +
        '<div class="hero-stripe" aria-hidden="true"></div>' +
        '<div class="hero-inner">' +
          '<div class="hero-stamp" aria-hidden="true"><span>' + t("safetyFirst") + "</span></div>" +
          '<p class="hero-kicker">' + t("heroKicker") + "</p>" +
          '<h1 class="hero-title">' + t("heroTitleA") + "<br><em>" + t("heroTitleB") + "</em></h1>" +
          '<p class="hero-sub">' + t("heroSub") + "</p>" +
          '<div class="hero-actions">' +
            '<a class="btn btn-yellow" href="#trades">' + t("heroCta") + "</a>" +
            '<a class="hero-link" href="#/summary">' + t("heroSummaryLink") + " →</a>" +
            '<span class="hero-stat">' +
              t("heroStat", { trades: D.trades.length, items: Object.keys(D.ppeCatalog).length }) +
            "</span>" +
          "</div>" +
        "</div>" +
      "</section>" +
      '<section class="trades" id="trades">' +
        '<h2 class="section-title">' + t("tradesTitle") + "</h2>" +
        '<p class="section-sub">' + t("tradesSub") + "</p>" +
        '<div class="trade-grid">' + cards + "</div>" +
      "</section>";
  }

  /* ---------- 화면: 공종 상세 + 체크리스트 ---------- */

  function renderTrade(id) {
    var trade = getTrade(id);
    if (!trade) {
      app.innerHTML = '<section class="detail"><p class="empty">' + t("notFound") + "</p>" +
        '<p><a class="btn btn-ghost" href="#/">← ' + t("backLink") + "</a></p></section>";
      return;
    }

    if (!sessions[id]) sessions[id] = freshSession(id);
    session = sessions[id];

    var items = trade.ppe.map(ppeOf);

    var sideItems = D.trades.map(function (tr) {
      return (
        '<a class="side-item' + (tr.id === id ? " active" : "") + '" href="#/trade/' + tr.id + '"' +
          (tr.id === id ? ' aria-current="page"' : "") + ">" +
          '<span class="side-plate" aria-hidden="true">' + esc(tr.plate) + "</span>" +
          '<span class="side-name">' + esc(loc(tr.name)) + "</span>" +
        "</a>"
      );
    }).join("");

    var hazardChips = trade.hazards.map(function (h) {
      return '<li class="hazard-chip">' + esc(loc(h)) + "</li>";
    }).join("");

    var talkItems = trade.talk.map(function (q) {
      return '<li><span class="talk-q" aria-hidden="true">Q</span><p>' + esc(loc(q)) + "</p></li>";
    }).join("");

    var checklistRows = items.map(function (item) {
      var checked = session.checked[item.id] ? " checked" : "";
      var noteHtml = item.note
        ? '<span class="item-note">' + esc(loc(item.note)) + "</span>"
        : "";
      return (
        '<li class="check-item level-' + item.level + '">' +
          '<label>' +
            '<input type="checkbox" data-item="' + item.id + '"' + checked +
              (session.completed ? " disabled" : "") + ">" +
            '<span class="check-box" aria-hidden="true"></span>' +
            '<span class="item-cat cat-' + item.cat + '">' + esc(loc(D.categories[item.cat])) + "</span>" +
            '<span class="item-text">' +
              "<strong>" + esc(loc(item.name)) + "</strong>" +
              "<small>" + esc(loc(item.desc)) + "</small>" +
              noteHtml +
            "</span>" +
            '<span class="item-level">' +
              t(item.level === "required" ? "requiredBadge" : "conditionalBadge") +
            "</span>" +
          "</label>" +
        "</li>"
      );
    }).join("");

    app.innerHTML =
      '<section class="detail">' +
        '<div class="detail-top no-print">' +
          '<a class="back-link" href="#/">← ' + t("backLink") + "</a>" +
          '<button type="button" class="btn btn-ghost" id="printBtn">🖨 ' + t("printBtn") + "</button>" +
        "</div>" +
        '<div class="trade-layout">' +
        '<nav class="trade-sidebar no-print" aria-label="' + esc(t("navTrades")) + '">' + sideItems + "</nav>" +
        '<div class="trade-main">' +
        '<header class="detail-head">' +
          '<span class="trade-plate plate-lg" aria-hidden="true">' + esc(trade.plate) + "</span>" +
          "<div>" +
            "<h1>" + esc(loc(trade.name)) + "</h1>" +
            '<p class="detail-alt">' + esc(lang === "ko" ? trade.name.en : trade.name.ko) + "</p>" +
          "</div>" +
        "</header>" +
        '<div class="detail-grid">' +
          '<div class="detail-info">' +
            '<h2 class="block-title">' + t("hazardsTitle") + "</h2>" +
            '<ul class="hazard-list">' + hazardChips + "</ul>" +
            '<h2 class="block-title">' + t("talkTitle") + "</h2>" +
            '<p class="block-sub">' + t("talkSub") + "</p>" +
            '<ul class="talk-list">' + talkItems + "</ul>" +
          "</div>" +
          '<div class="checklist-card" id="checklistCard">' +
            '<div class="checklist-head">' +
              "<h2>" + t("checklistTitle") + "</h2>" +
              '<span class="check-date">' + t("dateLabel") + " · " + todayStr() + "</span>" +
            "</div>" +
            '<input type="text" class="worker-input" id="workerInput" ' +
              'placeholder="' + esc(t("workerPlaceholder")) + '" value="' + esc(session.worker) + '"' +
              (session.completed ? " disabled" : "") + ">" +
            '<ul class="check-list">' + checklistRows + "</ul>" +
            '<div class="checklist-foot no-print">' +
              '<div class="progress-wrap">' +
                '<div class="progress-bar"><span id="progressFill"></span></div>' +
                '<span class="progress-label" id="progressLabel"></span>' +
              "</div>" +
              '<button type="button" class="btn btn-complete" id="completeBtn"></button>' +
              '<p class="complete-hint" id="completeHint">' + t("completeLocked") + "</p>" +
            "</div>" +
            '<div class="sign-line print-only">' +
              "<span>" + t("signLine") + '</span><span class="sign-rule"></span>' +
            "</div>" +
            (session.completed ? completedOverlay() : "") +
          "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
      "</section>";

    /* --- 이벤트 바인딩 --- */

    document.getElementById("printBtn").addEventListener("click", function () {
      window.print();
    });

    var workerInput = document.getElementById("workerInput");
    workerInput.addEventListener("input", function () {
      session.worker = workerInput.value;
    });

    app.querySelectorAll('input[type="checkbox"][data-item]').forEach(function (cb) {
      cb.addEventListener("change", function () {
        session.checked[cb.getAttribute("data-item")] = cb.checked;
        updateProgress(trade, items);
      });
    });

    var completeBtn = document.getElementById("completeBtn");
    if (completeBtn) {
      completeBtn.addEventListener("click", function () {
        if (completeBtn.disabled) return;
        completeCheck(trade, items);
      });
    }

    var newBtn = document.getElementById("newCheckBtn");
    if (newBtn) {
      newBtn.addEventListener("click", function () {
        sessions[id] = freshSession(id);
        renderTrade(id);
      });
    }

    updateProgress(trade, items);
  }

  function completedOverlay() {
    return (
      '<div class="stamp-layer" role="status">' +
        '<div class="stamp">' + t("completedStamp") + "</div>" +
        '<p class="stamp-note">' + t("savedNote") + "</p>" +
        '<button type="button" class="btn btn-yellow" id="newCheckBtn">' + t("newCheckBtn") + "</button>" +
      "</div>"
    );
  }

  function updateProgress(trade, items) {
    var required = items.filter(function (i) { return i.level === "required"; });
    var done = required.filter(function (i) { return session.checked[i.id]; }).length;
    var total = required.length;

    var fill = document.getElementById("progressFill");
    var label = document.getElementById("progressLabel");
    var btn = document.getElementById("completeBtn");
    var hint = document.getElementById("completeHint");
    if (!fill || !btn) return;

    fill.style.width = (total ? Math.round((done / total) * 100) : 0) + "%";
    fill.classList.toggle("full", done === total);
    label.textContent = t("progressLabel", { done: done, total: total });

    btn.textContent = t("completeBtn");
    btn.disabled = session.completed || done < total;
    hint.style.visibility = btn.disabled && !session.completed ? "visible" : "hidden";
  }

  function completeCheck(trade, items) {
    var checkedIds = items
      .filter(function (i) { return session.checked[i.id]; })
      .map(function (i) { return i.id; });

    var required = items.filter(function (i) { return i.level === "required"; });

    var record = {
      id: "chk_" + Date.now(),
      ts: new Date().toISOString(),
      tradeId: trade.id,
      trade: { ko: trade.name.ko, en: trade.name.en },
      worker: session.worker.trim(),
      checkedItems: checkedIds,
      /* 향후 AI 모델 학습·검증용 클래스 라벨 */
      checkedAiLabels: checkedIds.map(function (cid) { return D.ppeCatalog[cid].aiLabel; }),
      requiredDone: required.filter(function (i) { return session.checked[i.id]; }).length,
      requiredTotal: required.length,
      itemsTotal: items.length
    };

    var records = loadRecords();
    records.unshift(record);
    saveRecords(records);

    session.completed = true;
    renderTrade(trade.id);
  }

  /* ---------- 화면: 공종별 요약표 ---------- */

  function renderSummary() {
    /* tradeId → { itemId: level } */
    var mat = {};
    D.trades.forEach(function (tr) {
      mat[tr.id] = {};
      tr.ppe.forEach(function (p) { mat[tr.id][p.id] = p; });
    });

    var headCells = D.trades.map(function (tr) {
      return (
        '<th class="sum-trade" scope="col">' +
          '<a href="#/trade/' + tr.id + '"><span>' + esc(loc(tr.name)) + "</span></a>" +
        "</th>"
      );
    }).join("");

    var rows = Object.keys(D.ppeCatalog).map(function (iid) {
      var item = D.ppeCatalog[iid];
      var cells = D.trades.map(function (tr) {
        var p = mat[tr.id][iid];
        if (!p) return '<td class="sum-cell"></td>';
        var required = p.level === "required";
        var tip = loc(tr.name) + " — " + loc(item.name) + " (" +
          t(required ? "requiredBadge" : "conditionalBadge") +
          (p.note ? ": " + loc(p.note) : "") + ")";
        return '<td class="sum-cell ' + (required ? "req" : "cond") + '" title="' + esc(tip) + '">' +
          (required ? "●" : "○") + "</td>";
      }).join("");
      return (
        "<tr>" +
          '<th class="sum-item" scope="row">' +
            '<span class="item-cat cat-' + item.cat + '">' + esc(loc(D.categories[item.cat])) + "</span>" +
            "<span>" + esc(loc(item.name)) + "</span>" +
          "</th>" + cells +
        "</tr>"
      );
    }).join("");

    var totals = D.trades.map(function (tr) {
      var r = 0, c = 0;
      tr.ppe.forEach(function (p) { p.level === "required" ? r++ : c++; });
      return '<td class="sum-total">●' + r + " ○" + c + "</td>";
    }).join("");

    app.innerHTML =
      '<section class="summary">' +
        '<h1 class="section-title">' + t("summaryTitle") + "</h1>" +
        '<p class="section-sub">' + t("summarySub") + "</p>" +
        '<p class="summary-legend">' +
          '<span class="req">●</span> ' + t("requiredBadge") +
          '&nbsp;&nbsp;&nbsp;<span class="cond">○</span> ' + t("conditionalBadge") +
        "</p>" +
        '<div class="summary-wrap">' +
          '<table class="summary-table">' +
            "<thead><tr>" +
              '<th class="sum-item sum-corner" scope="col">' + t("colPpeItem") + "</th>" + headCells +
            "</tr></thead>" +
            "<tbody>" + rows + "</tbody>" +
            "<tfoot><tr>" +
              '<th class="sum-item">' + t("sumTotals") + "</th>" + totals +
            "</tr></tfoot>" +
          "</table>" +
        "</div>" +
      "</section>";
  }

  /* ---------- 화면: 점검 기록 ---------- */

  function renderRecords() {
    var records = loadRecords();

    var body;
    if (!records.length) {
      body = '<p class="empty">' + t("emptyRecords") + "</p>";
    } else {
      var rows = records.map(function (r) {
        var dt = new Date(r.ts);
        var pad = function (n) { return (n < 10 ? "0" : "") + n; };
        var when = dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()) +
          " " + pad(dt.getHours()) + ":" + pad(dt.getMinutes());
        return (
          "<tr>" +
            '<td class="mono">' + when + "</td>" +
            "<td>" + esc(r.trade ? r.trade[lang] : r.tradeId) + "</td>" +
            "<td>" + (r.worker ? esc(r.worker) : "—") + "</td>" +
            '<td class="mono">' + r.checkedItems.length + " / " + r.itemsTotal + "</td>" +
            '<td><span class="status-done">' + t("statusDone") + "</span></td>" +
          "</tr>"
        );
      }).join("");

      body =
        '<div class="table-wrap"><table class="records-table">' +
          "<thead><tr>" +
            "<th>" + t("colTime") + "</th>" +
            "<th>" + t("colTrade") + "</th>" +
            "<th>" + t("colWorker") + "</th>" +
            "<th>" + t("colItems") + "</th>" +
            "<th>" + t("colStatus") + "</th>" +
          "</tr></thead>" +
          "<tbody>" + rows + "</tbody>" +
        "</table></div>" +
        '<div class="records-actions">' +
          '<button type="button" class="btn btn-yellow" id="exportBtn">' + t("exportBtn") + "</button>" +
          '<button type="button" class="btn btn-ghost" id="clearBtn">' + t("clearBtn") + "</button>" +
        "</div>";
    }

    app.innerHTML =
      '<section class="records">' +
        '<h1 class="section-title">' + t("recordsTitle") + "</h1>" +
        '<p class="section-sub">' + t("recordsSub") + "</p>" +
        body +
      "</section>";

    var exportBtn = document.getElementById("exportBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", function () {
        var blob = new Blob([JSON.stringify(loadRecords(), null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ppe-records-" + todayStr() + ".json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      });
    }

    var clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (window.confirm(t("clearConfirm"))) {
          saveRecords([]);
          renderRecords();
        }
      });
    }
  }

  /* ---------- 시작 ---------- */
  applyLang();
  route();
})();
