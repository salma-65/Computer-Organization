(function () {
  "use strict";
  var PAGES = window.PAGES || {};
  var QB = window.QBANK || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pageEl = $("#page"), resultsEl = $("#searchResults"), sidebar = $("#sidebar");
  var pending = null; // term to highlight after navigation

  /* ---------- theme ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    $("#themeBtn").textContent = t === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("nb-theme", t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("nb-theme"); } catch (e) {}
  setTheme(saved || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("#themeBtn").onclick = function () {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  };
  $("#menuBtn").onclick = function () { sidebar.classList.toggle("open"); };

  /* ---------- helpers ---------- */
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  /* ---------- sub navigation (h2 of long pages) ---------- */
  function buildSubnav() {
    ["ch1", "ch2", "lab"].forEach(function (k) {
      var ul = $('ul.sub[data-for="' + k + '"]');
      var tmp = document.createElement("div");
      tmp.innerHTML = PAGES[k].html;
      ul.innerHTML = $$("h2", tmp).map(function (h) {
        var id = h.id || slug(h.textContent);
        return '<li><a href="#' + k + "/" + id + '">' + esc(h.textContent.replace(/^PART [A-Z] — /, "")) + "</a></li>";
      }).join("");
    });
  }

  /* ---------- question bank ---------- */
  var qState = { area: "", src: "", type: "", level: "" };
  function opts(field) {
    var seen = {}; QB.forEach(function (q) { seen[q[field]] = 1; });
    return Object.keys(seen);
  }
  function renderQBank() {
    var count = { original: 0, generated: 0 };
    QB.forEach(function (q) { count[q.src]++; });
    var html = "<h1>Question Bank</h1>" +
      '<p class="lead">' + QB.length + " questions: <b>" + count.original + " original</b> (taken from your uploaded material — wording condensed, with page references) and <b>" + count.generated + " AI-generated practice</b> questions (based strictly on the notes; they did <u>not</u> appear in the source). Click <i>Show answer</i> to reveal the model answer.</p>" +
      '<div class="note"><b>Coverage:</b> Chapter 1, Chapter 2 and MIPS Lab. The lab slides contain no exercises, so lab questions are all generated. Chapter 2 sections 2.8–2.9 are missing from the uploaded PDF, so there are no questions on procedures/stack/ASCII.</div>' +
      '<div class="qfilters">' + ["area", "src", "type", "level"].map(function (f) {
        var label = { area: "Section", src: "Source", type: "Type", level: "Level" }[f];
        return "<label>" + label + ' <select data-f="' + f + '"><option value="">All</option>' +
          opts(f).map(function (o) { return '<option value="' + o + '"' + (qState[f] === o ? " selected" : "") + ">" + o + "</option>"; }).join("") +
          "</select></label>";
      }).join("") + '<span id="qcount"></span></div><div id="qlist"></div>';
    pageEl.innerHTML = html;
    $$(".qfilters select").forEach(function (s) {
      s.onchange = function () { qState[s.dataset.f] = s.value; drawQ(); };
    });
    drawQ();
  }
  function drawQ() {
    var list = QB.filter(function (q) {
      return (!qState.area || q.area === qState.area) && (!qState.src || q.src === qState.src) &&
        (!qState.type || q.type === qState.type) && (!qState.level || q.level === qState.level);
    });
    $("#qcount").textContent = list.length + " shown";
    $("#qlist").innerHTML = list.map(function (q, i) {
      return '<div class="qcard" id="q-' + q.id + '"><div class="qmeta">' +
        '<span class="badge ' + q.src + '">' + (q.src === "original" ? "ORIGINAL — from your material" : "AI-GENERATED practice") + "</span>" +
        '<span class="badge">' + q.area + '</span><span class="badge">' + q.type + '</span><span class="badge">' + q.level + '</span><span class="badge">' + esc(q.ref) + "</span></div>" +
        "<div><b>Q" + (i + 1) + ".</b> " + q.q + "</div>" +
        '<details class="ans"><summary>Show answer</summary><div>' + q.a + '</div><p class="ar" dir="rtl"><b>بالعربي:</b> ' + q.ar + "</p></details></div>";
    }).join("");
  }

  /* ---------- router ---------- */
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#/, "")) || "ch1";
    var parts = h.split("/"), key = parts[0], sec = parts[1];
    if (key !== "qbank" && !PAGES[key]) key = "ch1";
    $$("#sidebar > a").forEach(function (a) { a.classList.toggle("active", a.dataset.page === key); });
    sidebar.classList.remove("open");
    resultsEl.hidden = true;
    if (key === "qbank") renderQBank();
    else pageEl.innerHTML = "<h1>" + PAGES[key].title + "</h1>" + PAGES[key].html;
    // back-to-top for each rendered page
    if (sec) {
      var t = document.getElementById(sec);
      if (t) t.scrollIntoView();
    } else if (!pending) window.scrollTo(0, 0);
    if (pending) { highlight(pending); pending = null; }
  }
  function highlight(term) {
    var low = term.toLowerCase();
    var els = $$("#page h2,#page h3,#page h4,#page p,#page li,#page td,#page pre,#page summary,#page figcaption,#page .qcard");
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent.toLowerCase().indexOf(low) > -1) {
        var d = els[i].closest("details"); if (d) d.open = true;
        els[i].style.outline = "3px solid #ffd54a"; els[i].style.outlineOffset = "3px";
        els[i].scrollIntoView({ block: "center" });
        (function (e) { setTimeout(function () { e.style.outline = ""; }, 3500); })(els[i]);
        return;
      }
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------- search ---------- */
  var index = [];
  function buildIndex() {
    Object.keys(PAGES).forEach(function (k) {
      var tmp = document.createElement("div"); tmp.innerHTML = PAGES[k].html;
      var heading = PAGES[k].title;
      $$("h2,h3,h4,p,li,td,pre,summary,figcaption", tmp).forEach(function (e) {
        var tx = e.textContent.replace(/\s+/g, " ").trim();
        if (/^H[2-4]$/.test(e.tagName)) heading = tx;
        if (tx.length > 2) index.push({ page: k, title: PAGES[k].title, head: heading, text: tx });
      });
    });
    QB.forEach(function (q) {
      var tmp = document.createElement("div"); tmp.innerHTML = q.q + " " + q.a + " " + q.ar;
      index.push({ page: "qbank", title: "Question Bank", head: (q.src === "original" ? "Original: " : "Generated: ") + q.ref, text: tmp.textContent.replace(/\s+/g, " ").trim() });
    });
  }
  function doSearch(term) {
    term = term.trim();
    if (term.length < 2) { resultsEl.hidden = true; return; }
    var low = term.toLowerCase(), out = [];
    for (var i = 0; i < index.length && out.length < 40; i++) {
      var p = index[i].text.toLowerCase().indexOf(low);
      if (p > -1) {
        var s = Math.max(0, p - 50), snip = index[i].text.slice(s, p + term.length + 90);
        out.push({ it: index[i], snip: (s > 0 ? "…" : "") + snip + "…", p: p - s + (s > 0 ? 1 : 0) });
      }
    }
    var html = "<b>" + out.length + (out.length >= 40 ? "+" : "") + ' result(s) for “' + esc(term) + "”</b>";
    if (!out.length) html += "<p>No matches. Try a shorter word or the English term (e.g. “CPI”, “syscall”).</p>";
    out.forEach(function (r, i) {
      var sn = esc(r.snip), re = new RegExp(esc(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
      sn = sn.replace(re, function (m) { return "<mark>" + m + "</mark>"; });
      html += '<a href="#' + r.it.page + '" data-i="' + i + '"><b>' + esc(r.it.title) + " › " + esc(r.it.head.slice(0, 70)) + "</b><br>" + sn + "</a>";
    });
    resultsEl.innerHTML = html; resultsEl.hidden = false;
    $$("a", resultsEl).forEach(function (a) {
      a.onclick = function (ev) {
        ev.preventDefault();
        var r = out[+a.dataset.i];
        pending = term;
        if (location.hash === "#" + r.it.page) route(); else location.hash = r.it.page;
        $("#search").value = "";
      };
    });
  }
  $("#search").addEventListener("input", function (e) { doSearch(e.target.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); $("#search").focus(); }
    if (e.key === "Escape") { resultsEl.hidden = true; $("#search").blur(); }
  });

  buildSubnav();
  buildIndex();
  route();
})();
