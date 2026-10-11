/* ==================================================================
   SAZ — Sir Suhail Aziz · site logic
   Shared helpers, chemistry engine, and page modules
   (home, syllabus tracker, toolkit).
   ================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var CHEM = window.CHEM || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var PAGE = document.body.getAttribute("data-page");
  var STORE_KEY = "saz.chem9701.progress.v1";

  /* ---------------------------------------------------------------
     Icons
     --------------------------------------------------------------- */
  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.5-4h-4V8.8c0-.5.3-.8.5-.8Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2Z"/></svg>'
  };

  /* ---------------------------------------------------------------
     Small helpers
     --------------------------------------------------------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // ~x~ → subscript, ^x^ → superscript (after escaping)
  function fmt(s) {
    return esc(s).replace(/~([^~]+)~/g, "<sub>$1</sub>").replace(/\^([^^]+)\^/g, "<sup>$1</sup>");
  }
  function plain(s) { return String(s || "").replace(/[~^]/g, ""); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function waLink(text) {
    var num = SITE.contact && SITE.contact.whatsapp;
    if (!num) return "";
    return "https://wa.me/" + num + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  var GREET = "Assalam-o-Alaikum Sir Suhail, ";

  /* ---------------------------------------------------------------
     Theme
     --------------------------------------------------------------- */
  function initTheme() {
    var btn = $("[data-theme-toggle]");
    if (!btn) return;
    function current() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    function label() { btn.setAttribute("aria-label", current() === "dark" ? "Switch to light mode" : "Switch to dark mode"); }
    label();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("saz.theme", next); } catch (e) {}
      label();
    });
  }

  /* ---------------------------------------------------------------
     Menu
     --------------------------------------------------------------- */
  function initMenu() {
    var btn = $("[data-menu-btn]"), menu = $("#menu");
    if (!btn || !menu) return;
    function set(open) {
      menu.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.innerHTML = open ? ICON.close : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) { var f = $("a", menu); if (f) f.focus(); }
    }
    btn.addEventListener("click", function () { set(!menu.classList.contains("is-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { set(false); btn.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1080) set(false); });
  }

  /* ---------------------------------------------------------------
     Config-driven bits shared by every page
     --------------------------------------------------------------- */
  function initShared() {
    var c = SITE.contact || {};
    $$("[data-wa]").forEach(function (a) {
      var href = waLink(a.getAttribute("data-wa") || "");
      if (href) { a.href = href; a.target = "_blank"; a.rel = "noopener"; } else a.hidden = true;
    });
    $$("[data-tel]").forEach(function (a) {
      if (c.phone) { a.href = "tel:" + c.phone.replace(/[^\d+]/g, ""); if (!a.textContent.trim()) a.textContent = c.phone; } else a.hidden = true;
    });
    $$("[data-cfg]").forEach(function (n) {
      var path = n.getAttribute("data-cfg").split("."), v = SITE;
      path.forEach(function (p) { v = v == null ? v : v[p]; });
      if (v) n.textContent = v; else if (n.hasAttribute("data-cfg-hide")) n.hidden = true;
    });
    $$("[data-render='socials']").forEach(function (box) {
      var items = [];
      if (c.instagram) items.push(["Instagram", "https://www.instagram.com/" + c.instagram, ICON.instagram, "@" + c.instagram]);
      if (c.facebook) items.push(["Facebook", "https://www.facebook.com/" + c.facebook, ICON.facebook, "Facebook"]);
      if (c.youtube) items.push(["YouTube", c.youtube, ICON.youtube, "YouTube"]);
      if (c.whatsapp && box.hasAttribute("data-with-wa")) items.unshift(["WhatsApp", waLink(GREET), ICON.whatsapp, c.phone || "WhatsApp"]);
      box.innerHTML = items.map(function (it) {
        return '<a class="social" href="' + esc(it[1]) + '" target="_blank" rel="noopener" aria-label="' + esc(it[0]) + '">' + it[2] + "<span>" + esc(it[3]) + "</span></a>";
      }).join("");
    });
    var y = $("[data-year]"); if (y) y.textContent = String(new Date().getFullYear());
    $$("[data-ig]").forEach(function (a) {
      if (c.instagram) { a.href = "https://www.instagram.com/" + c.instagram; a.target = "_blank"; a.rel = "noopener"; } else a.hidden = true;
    });
    // floating WhatsApp
    if (c.whatsapp && !$(".wa-float")) {
      var f = el("a", { class: "wa-float", href: waLink(GREET + "I have a question about chemistry classes."), target: "_blank", rel: "noopener", "aria-label": "Message Sir Suhail on WhatsApp" }, ICON.whatsapp);
      document.body.appendChild(f);
    }
  }

  /* ---------------------------------------------------------------
     Progress store (syllabus tracker)
     --------------------------------------------------------------- */
  var Progress = {
    data: {},
    load: function () { try { this.data = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; } catch (e) { this.data = {}; } return this.data; },
    save: function () { try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch (e) {} },
    get: function (id) { return +this.data[id] || 0; },
    set: function (id, v) { if (v) this.data[id] = v; else delete this.data[id]; this.save(); }
  };
  Progress.load();
  function topicScore(t) {
    var sum = 0, ok = 0, mid = 0;
    t.subs.forEach(function (s) { var v = Progress.get(s.id); sum += v; if (v === 2) ok++; else if (v === 1) mid++; });
    return { pct: t.subs.length ? sum / (2 * t.subs.length) : 0, ok: ok, mid: mid, n: t.subs.length };
  }
  function groupScore(list) {
    var sum = 0, n = 0, ok = 0, mid = 0;
    list.forEach(function (t) { t.subs.forEach(function (s) { var v = Progress.get(s.id); sum += v; n++; if (v === 2) ok++; if (v === 1) mid++; }); });
    return { pct: n ? sum / (2 * n) : 0, ok: ok, mid: mid, n: n };
  }
  function topicByN(n) { return (CHEM.TOPICS || []).filter(function (t) { return t.n === n; })[0]; }

  /* ---------------------------------------------------------------
     Toast with optional action
     --------------------------------------------------------------- */
  var toastTimer;
  function toast(msg, actionLabel, onAction) {
    var t = $(".toast");
    if (!t) { t = el("div", { class: "toast", role: "status", "aria-live": "polite" }); document.body.appendChild(t); }
    t.innerHTML = "<span>" + esc(msg) + "</span>" + (actionLabel ? "<button type='button'>" + esc(actionLabel) + "</button>" : "");
    if (actionLabel) $("button", t).addEventListener("click", function () { onAction(); t.classList.remove("is-on"); });
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, actionLabel ? 6000 : 3000);
  }

  /* ---------------------------------------------------------------
     Video dialog
     --------------------------------------------------------------- */
  function openVideo(v) {
    var d = $("#vdialog");
    if (!d) {
      d = el("dialog", { id: "vdialog", class: "vdialog", "aria-label": "Video" });
      document.body.appendChild(d);
      d.addEventListener("close", function () { var vid = $("video", d); if (vid) vid.pause(); });
      d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    }
    d.innerHTML = '<div class="vdialog__head"><strong>' + esc(v.title) + '</strong><button class="icon-btn" type="button" aria-label="Close video">' + ICON.close + "</button></div>" +
      '<video src="' + esc(v.src) + '" poster="' + esc(v.poster || "") + '" controls playsinline autoplay></video>';
    $("button", d).addEventListener("click", function () { d.close(); });
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }
  function videoForTopic(id) { return (SITE.videos || []).filter(function (v) { return v.topic === id; })[0]; }

  /* =================================================================
     CHEMISTRY ENGINE
     ================================================================= */
  var EL = {};          // symbol → record
  var BYZ = {};         // Z → record
  (CHEM.ELEMENTS || []).forEach(function (r) {
    var o = { z: r[0], sym: r[1], name: r[2], ar: r[3], period: r[4], group: r[5], cat: r[6] };
    EL[o.sym] = o; BYZ[o.z] = o;
  });

  // ---- formula parser ------------------------------------------------
  var SUBS = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
  function parseFormula(input) {
    var raw = String(input || "").trim();
    if (!raw) throw new Error("Type a formula, e.g. CuSO4·5H2O");
    var s = raw.replace(/[₀-₉]/g, function (c) { return SUBS[c]; }).replace(/\s+/g, "");
    var note = "";
    // charges: "SO4^2-", "NH4+", "SO₄²⁻" — digits only count as charge after ^ or as superscripts
    var charge = s.match(/(\^\(?\d*[+\-−]?\)?[+\-−]?|[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]|[+\-−]+)$/);
    if (charge && charge[0]) { s = s.slice(0, s.length - charge[0].length); note = "Ion charge ignored — electrons have negligible mass."; }
    var parts = s.split(/[·.*•]/);
    var total = {}, order = [];
    parts.forEach(function (part, pi) {
      if (!part) throw new Error("There's an empty part around a dot.");
      var m = part.match(/^(\d+)(.*)$/), mult = 1;
      if (m) { mult = parseInt(m[1], 10); part = m[2]; if (!part) throw new Error("A number needs a formula after it."); }
      var i = 0;
      function group(closer) {
        var counts = {};
        while (i < part.length) {
          var ch = part[i];
          if (ch === "(" || ch === "[" || ch === "{") {
            var close = { "(": ")", "[": "]", "{": "}" }[ch];
            i++;
            var inner = group(close);
            if (part[i] !== close) throw new Error("A bracket “" + ch + "” isn’t closed.");
            i++;
            var n = num(); add(counts, inner, n);
          } else if (ch === ")" || ch === "]" || ch === "}") {
            if (closer === ch) return counts;
            throw new Error("There’s an extra “" + ch + "”.");
          } else if (/[A-Z]/.test(ch)) {
            var sym = ch; i++;
            if (i < part.length && /[a-z]/.test(part[i])) {
              if (EL[sym + part[i]]) { sym += part[i]; i++; }
              else if (!EL[sym]) { sym += part[i]; i++; }
            }
            if (!EL[sym]) throw new Error("“" + sym + "” isn’t an element symbol. Symbols start with a capital: Co is cobalt, CO is carbon monoxide.");
            var k = num(); counts[sym] = (counts[sym] || 0) + k;
          } else if (/[a-z]/.test(ch)) {
            throw new Error("“" + ch + "” should be a capital letter — element symbols start with one.");
          } else if (/\d/.test(ch)) {
            throw new Error("A number can only follow an element or a bracket.");
          } else {
            throw new Error("“" + ch + "” isn’t allowed in a formula.");
          }
        }
        if (closer) throw new Error("A bracket isn’t closed.");
        return counts;
      }
      function num() { var st = i; while (i < part.length && /\d/.test(part[i])) i++; return st === i ? 1 : parseInt(part.slice(st, i), 10); }
      function add(into, from, k) { Object.keys(from).forEach(function (e) { into[e] = (into[e] || 0) + from[e] * k; }); }
      var c = group(null);
      Object.keys(c).forEach(function (e) {
        if (!total[e]) order.push(e);
        total[e] = (total[e] || 0) + c[e] * mult;
      });
    });
    return { counts: total, order: order, note: note, display: raw };
  }
  function molarMass(parsed) {
    var rows = [], sum = 0;
    parsed.order.forEach(function (sym) {
      var e = EL[sym];
      if (e.ar == null) throw new Error(e.name + " has no standard relative atomic mass, so M~r~ can't be calculated.");
      var sub = e.ar * parsed.counts[sym];
      sum += sub;
      rows.push({ sym: sym, name: e.name, n: parsed.counts[sym], ar: e.ar, sub: sub });
    });
    rows.forEach(function (r) { r.pct = sum ? r.sub / sum * 100 : 0; });
    return { mr: sum, rows: rows };
  }
  function formulaHTML(s) {
    return esc(s).replace(/([A-Za-z)\]}])(\d+)/g, "$1<sub>$2</sub>").replace(/[.*•]/g, "·");
  }

  // ---- number formatting -----------------------------------------------
  var SUPD = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  function sf(x, n) {
    if (!isFinite(x)) return "—";
    if (x === 0) return "0";
    var e = Math.floor(Math.log10(Math.abs(x)));
    if (e < -3 || e >= 6) {
      var m = x / Math.pow(10, e);
      var ms = Number(m.toPrecision(n));
      if (Math.abs(ms) >= 10) { ms = ms / 10; e += 1; }
      return ms.toPrecision(n) + " × 10<sup>" + String(e).replace("-", "−") + "</sup>";
    }
    var p = Number(x.toPrecision(n));
    var str = x.toPrecision(n);
    if (/e/.test(str)) str = String(p);
    return str;
  }
  function dp1(x) { return (Math.round(x * 10) / 10).toFixed(1); }

  // ---- electronic configuration (H–Kr) -------------------------------------
  var AUFBAU = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2], ["3d", 10], ["4p", 6]];
  var SHELL_ORDER = ["1s", "2s", "2p", "3s", "3p", "3d", "4s", "4p"];
  var REMOVE_ORDER = ["4p", "4s", "3d", "3p", "3s", "2p", "2s", "1s"];
  var CORES = [[36, "Kr"], [18, "Ar"], [10, "Ne"], [2, "He"]];
  var CORE_SUBS = { 2: ["1s"], 10: ["1s", "2s", "2p"], 18: ["1s", "2s", "2p", "3s", "3p"] };
  function fill(n) {
    var cfg = {}; var left = n;
    AUFBAU.forEach(function (a) { var k = Math.min(a[1], left); if (k > 0) cfg[a[0]] = k; left -= k; });
    return cfg;
  }
  function atomConfig(z) {
    var cfg = fill(z);
    if (z === 24) { cfg["3d"] = 5; cfg["4s"] = 1; }
    if (z === 29) { cfg["3d"] = 10; cfg["4s"] = 1; }
    return cfg;
  }
  function ionConfig(z, charge) {
    var cfg = atomConfig(z), e = z - charge;
    if (e < 0) throw new Error("That leaves fewer than zero electrons.");
    if (e > 36) throw new Error("This tool covers species with up to 36 electrons (H to Kr, as in the syllabus).");
    if (charge > 0) {
      var rem = charge;
      REMOVE_ORDER.forEach(function (o) { while (rem > 0 && cfg[o]) { cfg[o]--; rem--; if (!cfg[o]) delete cfg[o]; } });
    } else if (charge < 0) {
      var add = -charge;
      AUFBAU.forEach(function (a) { var have = cfg[a[0]] || 0; var k = Math.min(a[1] - have, add); if (k > 0) { cfg[a[0]] = have + k; add -= k; } });
    }
    return { cfg: cfg, electrons: e };
  }
  function cfgString(cfg, html, from) {
    return SHELL_ORDER.filter(function (o) { return cfg[o] && (!from || from.indexOf(o) === -1); }).map(function (o) {
      return html ? o + "<sup>" + cfg[o] + "</sup>" : o + cfg[o];
    }).join(html ? " " : "");
  }
  function shorthand(cfg, electrons) {
    for (var i = 0; i < CORES.length; i++) {
      var ce = CORES[i][0];
      if (ce >= electrons || !CORE_SUBS[ce]) continue;
      var full = { "1s": 2, "2s": 2, "2p": 6, "3s": 2, "3p": 6 };
      var ok = CORE_SUBS[ce].every(function (o) { return cfg[o] === full[o]; });
      if (ok) {
        var rest = cfgString(cfg, true, CORE_SUBS[ce]);
        return "[" + CORES[i][1] + "]" + (rest ? " " + rest : "");
      }
    }
    return cfgString(cfg, true) || "no electrons";
  }
  function boxesHTML(cfg) {
    return SHELL_ORDER.filter(function (o) { return cfg[o]; }).map(function (o) {
      var size = { s: 1, p: 3, d: 5 }[o[1]], n = cfg[o], cells = [];
      for (var i = 0; i < size; i++) cells.push(0);
      for (var j = 0; j < n; j++) cells[j % size]++;
      return '<div class="orb"><div class="orb__cells">' + cells.map(function (c) {
        return '<span class="orb__cell">' + (c === 2 ? "↑↓" : c === 1 ? "↑" : "") + "</span>";
      }).join("") + '</div><span class="orb__lab">' + o + "</span></div>";
    }).join("");
  }
  function valence(e) {
    if (e.z === 1) return { cfg: "1s<sup>1</sup>", n: 1 };
    if (e.z === 2) return { cfg: "1s<sup>2</sup>", n: 2 };
    var n = e.period, g = e.group;
    if (g === 1) return { cfg: n + "s<sup>1</sup>", n: 1 };
    if (g === 2) return { cfg: n + "s<sup>2</sup>", n: 2 };
    var p = g - 12;
    return { cfg: n + "s<sup>2</sup> " + n + "p<sup>" + p + "</sup>", n: 2 + p };
  }
  function groupPattern(g) {
    if (g === 1) return "<i>n</i>s<sup>1</sup>";
    if (g === 2) return "<i>n</i>s<sup>2</sup>";
    return "<i>n</i>s<sup>2</sup> <i>n</i>p<sup>" + (g - 12) + "</sup>";
  }

  /* =================================================================
     HOME
     ================================================================= */
  function initHome() {
    // --- pattern demo ---
    var pg = $("#pattern-grid");
    if (pg) {
      var groups = [1, 2, 13, 14, 15, 16, 17, 18];
      var html = groups.map(function (g) { return '<div class="pattern__head">' + g + "</div>"; }).join("");
      for (var p = 1; p <= 6; p++) {
        groups.forEach(function (g) {
          var e = (CHEM.ELEMENTS || []).filter(function (r) { return r[4] === p && r[5] === g; })[0];
          if (!e) { html += '<span class="pel pel--gap" aria-hidden="true"></span>'; return; }
          html += '<button type="button" class="pel" data-z="' + e[0] + '" data-g="' + g + '" aria-pressed="false" aria-label="' + esc(e[2]) + '"><small>' + e[0] + "</small>" + esc(e[1]) + "</button>";
        });
      }
      pg.innerHTML = html;
      var read = $("#pattern-read");
      function pick(z) {
        var e = BYZ[z], g = e.group;
        $$(".pel", pg).forEach(function (b) {
          var bz = +b.dataset.z;
          b.setAttribute("aria-pressed", String(bz === z));
          b.classList.toggle("in-group", z !== 1 && bz !== 1 && +b.dataset.g === g);
        });
        var v = valence(e);
        var why;
        if (z === 1) why = "Hydrogen sits above Group 1 with one outer electron, but it’s a non-metal — the exception worth remembering.";
        else if (z === 2) why = "Helium has a full first shell (1s²), so it sits with the noble gases even though it has only 2 outer electrons.";
        else why = "Every Group " + g + " element ends in " + groupPattern(g) + ". Same group = same outer electron count. That’s why their properties are similar.";
        read.innerHTML = '<div class="pattern__name">' + esc(e.name) + " · Group " + g + " · Period " + e.period + "</div>" +
          '<div class="pattern__cfg">' + v.cfg + "</div>" +
          '<div class="pattern__why"><strong>' + v.n + " outer electron" + (v.n === 1 ? "" : "s") + ".</strong> " + why + "</div>";
      }
      pg.addEventListener("click", function (e) { var b = e.target.closest(".pel"); if (b) pick(+b.dataset.z); });
      pick(11);
    }

    // --- foundation tiles ---
    var fd = $("#found");
    if (fd) {
      var picks = [[1, "Atomic structure"], [3, "Chemical bonding"], [2, "Stoichiometry"], [13, "Organic chemistry"]];
      fd.innerHTML = picks.map(function (p) {
        var t = topicByN(p[0]); var sc = topicScore(t);
        return '<a class="tile tile--' + t.branch + '" href="syllabus.html#t-' + t.n + '"><span class="tile__n">' + t.n + '</span><span class="tile__t">' + esc(p[1]) + '</span><span class="tile__bar" aria-hidden="true"><i style="transform:scaleX(' + sc.pct.toFixed(3) + ')"></i></span></a>';
      }).join("");
    }

    // --- videos ---
    $$("[data-video]").forEach(function (box) {
      var key = box.getAttribute("data-video");
      var v = (SITE.videos || []).filter(function (x) { return key === "topic" ? x.topic : !x.topic; })[0];
      if (!v) { box.hidden = true; return; }
      var tall = /everywhere/.test(v.src);
      box.innerHTML = '<figure class="vcard' + (tall ? " vcard--tall" : "") + '"><div class="vcard__frame"><video src="' + esc(v.src) + '" poster="' + esc(v.poster) + '" controls preload="none" playsinline></video></div>' +
        "<figcaption><strong>" + esc(v.title) + "</strong><span>" + esc(v.length) + "</span>" + (v.note ? "<span>" + esc(v.note) + "</span>" : "") + "</figcaption></figure>";
    });

    // --- included ---
    var inc = $("#included-list");
    if (inc) inc.innerHTML = (SITE.included || []).map(function (s) { return "<li>" + esc(typeof s === "string" ? s : s.title) + "</li>"; }).join("");

    // --- bio ---
    var bio = $("#bio");
    if (bio) bio.innerHTML = ((SITE.teacher || {}).bio || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    // --- affiliations ---
    var aff = $("#aff");
    if (aff) aff.innerHTML = (SITE.affiliations || []).map(function (a, i) {
      var words = a.name.replace(/[^A-Za-z\s]/g, " ").trim().split(/\s+/);
      var sym = a.short ? a.short.charAt(0) + a.short.slice(1, 2).toLowerCase() : (words[0][0] + (words[1] ? words[1][0] : words[0][1] || "")).replace(/^(.)(.)$/, function (m, x, y) { return x.toUpperCase() + y.toLowerCase(); });
      return '<li><div class="aff__top"><span>' + String(i + 1).padStart(2, "0") + "</span><span>" + esc(a.note || "") + '</span></div><div class="aff__sym" aria-hidden="true">' + esc(sym) + '</div><div class="aff__name">' + esc(a.name) + "</div></li>";
    }).join("");

    // --- course map ---
    var map = $("#map");
    if (map) {
      var levels = [["AS", "AS Level", "Topics 1–22 · Papers 1, 2 and 3"], ["A", "A Level", "Topics 23–37, on top of AS · Papers 4 and 5"]];
      map.innerHTML = levels.map(function (L) {
        var ts = CHEM.TOPICS.filter(function (t) { return t.level === L[0]; });
        var branches = ["phys", "inorg", "org", "anal"];
        return '<div class="map__level"><div class="map__levelhead"><h3>' + L[1] + "</h3><span>" + L[2] + "</span></div>" +
          branches.map(function (b) {
            var bt = ts.filter(function (t) { return t.branch === b; });
            if (!bt.length) return "";
            return '<div class="map__branch"><h4 style="--b:var(--c-' + b + ')"><i></i>' + esc(CHEM.BRANCHES[b].name) + '</h4><div class="map__tiles">' +
              bt.map(function (t) {
                var sc = topicScore(t);
                return '<a class="tile tile--' + b + '" href="syllabus.html#t-' + t.n + '"><span class="tile__n">' + t.n + '</span><span class="tile__t">' + fmt(t.title) + '</span><span class="tile__bar" aria-hidden="true"><i style="transform:scaleX(' + sc.pct.toFixed(3) + ')"></i></span></a>';
              }).join("") + "</div></div>";
          }).join("") + "</div>";
      }).join("");
    }

    renderPapers($("#papers-body"));
    renderWeights($("#weights"));

    // --- classes ---
    var cl = $("#classes-body");
    if (cl) cl.innerHTML = (SITE.classes || []).map(function (r) {
      var timing = (r.days || r.time) ? esc([r.days, r.time].filter(Boolean).join(" · "))
        : '<a class="ask" href="' + esc(waLink(GREET + "could you share the timings for " + r.course + " (" + r.code + ")?")) + '" target="_blank" rel="noopener">Ask for timings →</a>';
      return '<tr><td data-label="Course"><strong>' + esc(r.course) + '</strong></td><td class="num" data-label="Code">' + esc(r.code) + '</td><td class="span" data-label="Covers">' + esc(r.covers) + '</td><td class="span" data-label="Timings">' + timing + "</td></tr>";
    }).join("");

    // --- posts ---
    var posts = $("#posts");
    if (posts) {
      var ig = SITE.contact && SITE.contact.instagram ? "https://www.instagram.com/" + SITE.contact.instagram : "#";
      posts.innerHTML = (SITE.posts || []).map(function (p) {
        return '<li><a href="' + esc(ig) + '" target="_blank" rel="noopener"><img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy" width="640" height="800"></a></li>';
      }).join("");
    }

    // --- tools panel progress ---
    var tp = $("#tools-progress");
    if (tp) {
      var as = groupScore(CHEM.TOPICS.filter(function (t) { return t.level === "AS"; }));
      var al = groupScore(CHEM.TOPICS.filter(function (t) { return t.level === "A"; }));
      tp.innerHTML = meterHTML("AS Level", as) + meterHTML("A Level", al);
    }

    initRegister();
  }

  function meterHTML(label, sc) {
    var okP = sc.n ? sc.ok / sc.n : 0, midP = sc.n ? sc.mid / sc.n : 0;
    return '<div class="meter"><div class="meter__row">' + esc(label) + "<span>" + sc.ok + " of " + sc.n + " confident" + (sc.mid ? " · " + sc.mid + " revising" : "") + '</span></div><div class="meter__track" role="img" aria-label="' + esc(label) + ": " + Math.round(sc.pct * 100) + '% done"><span class="meter__fill" style="transform:none;width:' + (okP * 100).toFixed(1) + '%"></span><span class="meter__fill meter__fill--mid" style="transform:none;width:' + (midP * 100).toFixed(1) + '%"></span></div></div>';
  }

  function renderPapers(body) {
    if (!body) return;
    body.innerHTML = CHEM.PAPERS.map(function (p) {
      return '<tr><td data-label="Paper"><span class="pno">' + p.n + '</span></td><td class="span" data-label="Name"><strong>' + esc(p.name) + "</strong><br><span class='fineprint'>" + esc(p.format) + " · " + esc(p.content) + '</span></td><td class="num" data-label="Time">' + esc(p.time) + '</td><td class="num" data-label="Marks">' + p.marks + '</td><td class="num" data-label="AS weight">' + (p.as == null ? "—" : p.as + "%") + '</td><td class="num" data-label="A Level weight">' + p.al + "%</td></tr>";
    }).join("");
  }
  function renderWeights(box) {
    if (!box) return;
    function bar(label, key, sub) {
      var ps = CHEM.PAPERS.filter(function (p) { return p[key] != null; });
      return '<div class="wbar"><div class="wbar__label">' + label + "<span>" + sub + '</span></div><div class="wbar__track" role="img" aria-label="' + esc(label + ": " + ps.map(function (p) { return "Paper " + p.n + " " + p[key] + "%"; }).join(", ")) + '">' +
        ps.map(function (p) { return '<span class="wbar__seg seg-' + p.n + '" style="flex:' + p[key] + ' 1 0" title="Paper ' + p.n + ": " + p[key] + '%">P' + p.n + (p[key] >= 15 ? '<span class="pc">&nbsp;·&nbsp;' + p[key] + "%</span>" : "") + "</span>"; }).join("") + "</div></div>";
    }
    box.innerHTML = bar("AS Level", "as", "Papers 1–3") + bar("A Level", "al", "Papers 1–5");
  }

  /* ---------------------------------------------------------------
     Register form → WhatsApp
     --------------------------------------------------------------- */
  function initRegister() {
    var form = $("#register-form");
    if (!form) return;
    var status = $("#register-status"), btn = $("button[type=submit]", form);
    function setErr(name, msg) {
      var f = form.elements[name], m = $("[data-err='" + name + "']", form);
      if (f) f.setAttribute("aria-invalid", msg ? "true" : "false");
      if (m) m.textContent = msg || "";
    }
    ["name", "course"].forEach(function (n) {
      form.elements[n].addEventListener("input", function () { setErr(n, ""); });
      form.elements[n].addEventListener("change", function () { setErr(n, ""); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, bad = false;
      if (!f.name.value.trim()) { setErr("name", "Please add your name."); bad = true; }
      if (!f.course.value) { setErr("course", "Choose a course."); bad = true; }
      if (bad) {
        btn.setAttribute("data-state", "error");
        status.dataset.tone = "error"; status.textContent = "Fill in the highlighted fields.";
        setTimeout(function () { btn.removeAttribute("data-state"); }, 1600);
        (f.name.value.trim() ? f.course : f.name).focus();
        return;
      }
      if (!SITE.contact || !SITE.contact.whatsapp) { status.dataset.tone = "error"; status.textContent = "WhatsApp number isn’t set in config.js."; return; }
      var batch = SITE.batch && SITE.batch.label ? "the " + SITE.batch.label : "the next batch";
      var lines = [GREET.trim(), "I’d like to register for " + batch + ".", "", "Name: " + f.name.value.trim(), "Course: " + f.course.value, "Class type: " + (f.mode.value || "Not sure yet")];
      if (f.school.value.trim()) lines.push("School: " + f.school.value.trim());
      if (f.message.value.trim()) lines.push("", f.message.value.trim());
      lines.push("", "(Sent from the SAZ website)");
      btn.setAttribute("data-state", "loading");
      btn.querySelector("span").textContent = "Opening WhatsApp…";
      var url = waLink(lines.join("\n"));
      // "noopener" in the features string makes window.open return null, so null the opener by hand
      var w = window.open(url, "_blank");
      if (w) { try { w.opener = null; } catch (err) {} } else { window.location.href = url; }
      setTimeout(function () {
        btn.setAttribute("data-state", "success");
        btn.querySelector("span").textContent = "Opened in WhatsApp";
        status.dataset.tone = "ok";
        status.textContent = "Your message is ready in WhatsApp — just press send.";
        setTimeout(function () { btn.removeAttribute("data-state"); btn.querySelector("span").textContent = "Send on WhatsApp"; }, 3500);
      }, 500);
    });
  }

  /* =================================================================
     SYLLABUS TRACKER
     ================================================================= */
  function initSyllabus() {
    var list = $("#topics");
    if (!list) return;
    var all = CHEM.TOPICS.concat(CHEM.PRACTICAL);
    var state = { level: "all", branch: "all", q: "", hideDone: false };

    function subHTML(s) {
      var v = Progress.get(s.id), vid = videoForTopic(s.id);
      var name = "s-" + s.id.replace(/\./g, "-");
      var opts = [["0", "Not yet"], ["1", "Revising"], ["2", "Confident"]].map(function (o) {
        return '<label><input type="radio" name="' + name + '" value="' + o[0] + '"' + (String(v) === o[0] ? " checked" : "") + "><span>" + o[1] + "</span></label>";
      }).join("");
      return '<li class="sub" id="' + name + '" data-id="' + esc(s.id) + '" data-status="' + v + '"><div><div><span class="sub__id">' + esc(s.id) + '</span><span class="sub__title">' + fmt(s.title) + '</span></div><div class="sub__keys">' + fmt(s.keys) + "</div>" +
        (vid ? '<div class="sub__extra"><button type="button" class="vbtn" data-play="' + esc(s.id) + '">' + ICON.play + "Watch Sir Suhail explain it · " + esc(vid.length) + "</button></div>" : "") +
        '</div><div class="rag" role="radiogroup" aria-label="Status for ' + esc(s.id) + '">' + opts + "</div></li>";
    }
    function topicHTML(t) {
      var b = t.branch, sc = topicScore(t);
      return '<details class="topic" id="t-' + t.n + '" data-n="' + t.n + '" style="--b:var(--c-' + b + ')"><summary><span class="topic__n">' + esc(t.n) + '</span><span class="topic__t">' + fmt(t.title) + '</span><span class="topic__meta"><span class="topic__count">' + sc.ok + "/" + sc.n + "</span>" + ICON.chev + '</span><span class="topic__mini" aria-hidden="true"><i class="ok" style="width:' + (sc.ok / sc.n * 100) + '%"></i><i class="mid" style="width:' + (sc.mid / sc.n * 100) + '%"></i></span></summary><ul class="subs">' + t.subs.map(subHTML).join("") + "</ul></details>";
    }
    function build() {
      var html = "";
      [["AS", "AS Level", "Topics 1–22. Assessed in Papers 1 and 2; practical skills in Paper 3."], ["A", "A Level", "Topics 23–37. Assessed in Paper 4, which also assumes all AS content."]].forEach(function (L) {
        html += '<section class="level-block" data-level="' + L[0] + '"><h2>' + L[1] + "</h2><p>" + L[2] + "</p>";
        ["phys", "inorg", "org", "anal"].forEach(function (b) {
          var ts = CHEM.TOPICS.filter(function (t) { return t.level === L[0] && t.branch === b; });
          if (!ts.length) return;
          html += '<div class="branch-label" data-branch-label="' + b + '" style="--b:var(--c-' + b + ')"><i></i>' + esc(CHEM.BRANCHES[b].name) + "</div>" + ts.map(topicHTML).join("");
        });
        html += "</section>";
      });
      html += '<section class="level-block" data-level="P"><h2>Practical skills</h2><p>Paper 3 (AS and A Level) and Paper 5 (A Level only).</p>' + CHEM.PRACTICAL.map(topicHTML).join("") + "</section>";
      html += '<div class="empty" id="empty" hidden>No sub-topics match. Try a different word, or clear the filters.</div>';
      list.innerHTML = html;
    }
    build();

    // sidebar
    var side = $("#side-grid");
    function renderSide() {
      if (!side) return;
      side.innerHTML = all.map(function (t) {
        var sc = topicScore(t), cls = sc.pct >= 0.999 ? " is-done" : sc.pct > 0 ? " is-part" : "";
        return '<a href="#t-' + t.n + '" class="' + cls.trim() + '" style="--b:var(--c-' + t.branch + ')" title="' + esc(plain(t.title)) + '">' + esc(t.n) + "</a>";
      }).join("");
    }
    // progress card
    function renderSummary() {
      var as = groupScore(CHEM.TOPICS.filter(function (t) { return t.level === "AS"; }));
      var al = groupScore(CHEM.TOPICS.filter(function (t) { return t.level === "A"; }));
      var pr = groupScore(CHEM.PRACTICAL);
      var tot = groupScore(all);
      var pct = $("#pc-pct"); if (pct) pct.textContent = Math.round(tot.pct * 100) + "%";
      var m = $("#pc-meters"); if (m) m.innerHTML = meterHTML("AS Level", as) + meterHTML("A Level", al) + meterHTML("Practical skills", pr);
      renderSide();
    }
    function refreshTopic(det) {
      var t = all.filter(function (x) { return String(x.n) === det.dataset.n; })[0];
      var sc = topicScore(t);
      $(".topic__count", det).textContent = sc.ok + "/" + sc.n;
      var mini = $$(".topic__mini i", det);
      mini[0].style.width = (sc.ok / sc.n * 100) + "%";
      mini[1].style.width = (sc.mid / sc.n * 100) + "%";
    }
    renderSummary();

    list.addEventListener("change", function (e) {
      var r = e.target;
      if (r.type !== "radio") return;
      var li = r.closest(".sub");
      Progress.set(li.dataset.id, +r.value);
      li.dataset.status = r.value;
      refreshTopic(li.closest(".topic"));
      renderSummary();
      if (state.hideDone) applyFilter();
    });
    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-play]");
      if (b) { var v = videoForTopic(b.getAttribute("data-play")); if (v) openVideo(v); }
    });

    // filters
    function applyFilter() {
      var q = state.q.toLowerCase().trim(), anyShown = false;
      $$(".level-block", list).forEach(function (block) {
        var lvl = block.dataset.level, blockShown = false;
        var levelOk = state.level === "all" || state.level === lvl || (state.level === "P" && lvl === "P");
        $$(".topic", block).forEach(function (det) {
          var t = all.filter(function (x) { return String(x.n) === det.dataset.n; })[0];
          var branchOk = state.branch === "all" || t.branch === state.branch;
          var topicHit = q && (plain(t.title).toLowerCase().indexOf(q) > -1 || String(t.n) === q);
          var subsShown = 0;
          $$(".sub", det).forEach(function (li) {
            var s = t.subs.filter(function (x) { return x.id === li.dataset.id; })[0];
            var text = (s.id + " " + plain(s.title) + " " + plain(s.keys)).toLowerCase();
            var qOk = !q || topicHit || text.indexOf(q) > -1;
            var doneOk = !state.hideDone || Progress.get(s.id) !== 2;
            var show = levelOk && branchOk && qOk && doneOk;
            li.hidden = !show;
            if (show) subsShown++;
            highlight(li, s, q && !topicHit ? q : "");
          });
          det.hidden = subsShown === 0;
          if (q && subsShown) det.open = true;
          if (subsShown) blockShown = true;
        });
        $$(".branch-label", block).forEach(function (lab) {
          var b = lab.dataset.branchLabel;
          lab.hidden = !$$(".topic", block).some(function (d) { return !d.hidden && all.filter(function (x) { return String(x.n) === d.dataset.n; })[0].branch === b; });
        });
        block.hidden = !blockShown;
        if (blockShown) anyShown = true;
      });
      $("#empty").hidden = anyShown;
    }
    function highlight(li, s, q) {
      var tEl = $(".sub__title", li), kEl = $(".sub__keys", li);
      if (!q) { tEl.innerHTML = fmt(s.title); kEl.innerHTML = fmt(s.keys); return; }
      var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      tEl.innerHTML = esc(plain(s.title)).replace(re, "<mark>$1</mark>");
      kEl.innerHTML = esc(plain(s.keys)).replace(re, "<mark>$1</mark>");
    }
    var search = $("#q");
    if (search) search.addEventListener("input", function () { state.q = search.value; applyFilter(); });
    $$("[data-level-btn]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.level = b.getAttribute("data-level-btn");
        $$("[data-level-btn]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        applyFilter();
      });
    });
    var bsel = $("#branch");
    if (bsel) bsel.addEventListener("change", function () { state.branch = bsel.value; applyFilter(); });
    var hd = $("#hide-done");
    if (hd) hd.addEventListener("change", function () { state.hideDone = hd.checked; applyFilter(); });
    var ex = $("#expand"), co = $("#collapse");
    if (ex) ex.addEventListener("click", function () { $$(".topic", list).forEach(function (d) { if (!d.hidden) d.open = true; }); });
    if (co) co.addEventListener("click", function () { $$(".topic", list).forEach(function (d) { d.open = false; }); });
    var pr = $("#print");
    if (pr) pr.addEventListener("click", function () { $$(".topic", list).forEach(function (d) { d.open = true; }); window.print(); });
    var rs = $("#reset");
    if (rs) rs.addEventListener("click", function () {
      var backup = JSON.parse(JSON.stringify(Progress.data));
      if (!Object.keys(backup).length) { toast("Nothing to clear yet."); return; }
      Progress.data = {}; Progress.save(); build(); renderSummary(); applyFilter();
      toast("Progress cleared.", "Undo", function () { Progress.data = backup; Progress.save(); build(); renderSummary(); applyFilter(); });
    });

    // deep links: #t-8 or #s-8-3
    function openHash() {
      var h = decodeURIComponent(location.hash || "");
      if (!h) return;
      var target = $(h);
      if (!target) return;
      var det = target.matches(".topic") ? target : target.closest(".topic");
      if (det) det.open = true;
      setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 30);
    }
    window.addEventListener("hashchange", openHash);
    openHash();

    // papers + command words
    renderPapers($("#papers-body"));
    var cw = $("#cw");
    if (cw) cw.innerHTML = CHEM.COMMAND_WORDS.map(function (c) { return "<div><dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd></div>"; }).join("");
  }

  /* =================================================================
     TOOLKIT
     ================================================================= */
  function initToolkit() {
    var SF = 3;

    // ---- periodic table ----
    var pt = $("#ptable");
    if (pt) {
      var cells = [];
      for (var g = 1; g <= 18; g++) cells.push('<div class="pt-head" style="grid-column:' + g + ';grid-row:1">' + g + "</div>");
      CHEM.ELEMENTS.forEach(function (r) {
        var z = r[0], p = r[4], gr = r[5], col, row;
        if (gr == null) { // f-block
          row = p === 6 ? 10 : 11;
          col = (z - (p === 6 ? 57 : 89)) + 3;
        } else { row = p + 1; col = gr; }
        cells.push('<button type="button" class="el cat-' + r[6] + '" style="grid-column:' + col + ";grid-row:" + row + '" data-z="' + z + '" aria-pressed="false" aria-label="' + esc(r[2]) + ", atomic number " + z + '"><span class="el__z">' + z + '</span><span class="el__s">' + esc(r[1]) + '</span><span class="el__m">' + (r[3] == null ? "–" : r[3].toFixed(1)) + "</span></button>");
      });
      cells.push('<div class="el--ref" style="grid-column:3;grid-row:7">57–71</div>');
      cells.push('<div class="el--ref" style="grid-column:3;grid-row:8">89–103</div>');
      cells.push('<div class="pt-gap" style="grid-row:9"></div>');
      pt.innerHTML = cells.join("");

      var leg = $("#pt-legend");
      leg.innerHTML = Object.keys(CHEM.CATEGORIES).map(function (k) {
        return '<button type="button" data-cat="' + k + '" aria-pressed="false" style="--b:var(--el-' + k + ')"><i></i>' + esc(CHEM.CATEGORIES[k]) + "</button>";
      }).join("");
      var activeCat = null, ptq = $("#pt-q");
      function filterPT() {
        var q = (ptq.value || "").trim().toLowerCase();
        var on = !!(q || activeCat);
        pt.classList.toggle("is-filtering", on);
        $$(".el", pt).forEach(function (b) {
          var e = BYZ[+b.dataset.z];
          var m = (!activeCat || e.cat === activeCat) && (!q || e.sym.toLowerCase() === q || e.name.toLowerCase().indexOf(q) === 0 || String(e.z) === q);
          b.classList.toggle("is-match", m);
        });
      }
      leg.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        activeCat = activeCat === b.dataset.cat ? null : b.dataset.cat;
        $$("button", leg).forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.cat === activeCat)); });
        filterPT();
      });
      ptq.addEventListener("input", filterPT);
      ptq.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { var m = $(".el.is-match", pt); if (m) { showEl(+m.dataset.z); m.focus(); } }
      });
      var card = $("#el-card");
      function showEl(z) {
        var e = BYZ[z];
        $$(".el", pt).forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.z === z)); });
        var block = e.cat === "ln" || e.cat === "an" ? "f" : (e.group <= 2 || e.z === 2) ? "s" : e.group >= 13 ? "p" : "d";
        var rows = [["Atomic number", e.z], ["Relative atomic mass", e.ar == null ? "No standard value" : e.ar.toFixed(1)], ["Group", e.group == null ? "f-block (lanthanoids/actinoids)" : e.group], ["Period", e.period], ["Block", block + "-block"], ["Type", CHEM.CATEGORIES[e.cat]]];
        if (e.z <= 36) {
          var c = atomConfig(e.z);
          rows.push(["Electronic configuration", shorthand(c, e.z)]);
        }
        card.style.setProperty("--b", "var(--el-" + e.cat + ")");
        card.innerHTML = '<div class="el-card__big"><div class="el-card__tile"><span>' + e.z + "</span><b>" + esc(e.sym) + "</b><span>" + (e.ar == null ? "–" : e.ar.toFixed(1)) + '</span></div><div class="el-card__name">' + esc(e.name) + "</div></div><dl>" +
          rows.map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>"; }).join("") + '</dl><div class="el-card__actions">' +
          (e.ar != null ? '<button type="button" class="btn btn--sm" data-add="' + esc(e.sym) + '"><span>Add ' + esc(e.sym) + " to M<sub>r</sub> calculator</span></button>" : "") +
          (e.z <= 36 ? '<button type="button" class="btn btn--sm" data-cfg-of="' + e.z + '">Show orbitals</button>' : "") + "</div>";
      }
      pt.addEventListener("click", function (e) { var b = e.target.closest(".el"); if (b) showEl(+b.dataset.z); });
      card.addEventListener("click", function (e) {
        var a = e.target.closest("[data-add]"), c = e.target.closest("[data-cfg-of]");
        if (a) { var inp = $("#mr-in"); inp.value = (inp.dataset.preset ? "" : inp.value || "") + a.dataset.add; delete inp.dataset.preset; inp.dispatchEvent(new Event("input")); $("#mr").scrollIntoView({ block: "start" }); inp.focus(); }
        if (c) { $("#ec-el").value = c.dataset.cfgOf; $("#ec-charge").value = 0; renderEC(); $("#econfig").scrollIntoView({ block: "start" }); }
      });
      showEl(6);
    }

    // ---- electronic configuration ----
    var ecSel = $("#ec-el");
    function renderEC() {
      var out = $("#ec-out"), z = +ecSel.value, q = parseInt($("#ec-charge").value, 10) || 0;
      try {
        var r = ionConfig(z, q), e = BYZ[z];
        var symHTML = esc(e.sym) + (q ? "<sup>" + (Math.abs(q) === 1 ? "" : Math.abs(q)) + (q > 0 ? "+" : "−") + "</sup>" : "");
        var notes = [];
        if (q === 0 && (z === 24 || z === 29)) notes.push((z === 24 ? "Chromium" : "Copper") + " is one of the two exceptions from H to Kr: one 4s electron sits in 3d instead.");
        if (q > 0 && z >= 21 && z <= 30) notes.push("Transition elements lose their 4s electrons before 3d when they form ions.");
        if (r.electrons === 0) notes.push("No electrons left — this is a bare nucleus (a proton, for H⁺).");
        out.innerHTML = '<div class="econf-line"><small>Species</small>' + symHTML + " · " + esc(e.name) + (q ? " ion" : " atom") + " · " + r.electrons + " electron" + (r.electrons === 1 ? "" : "s") + "</div>" +
          (r.electrons ? '<div class="econf-line"><small>Full</small>' + cfgString(r.cfg, true) + '</div><div class="econf-line"><small>Shorthand</small>' + shorthand(r.cfg, r.electrons) + '</div><div><div class="econf-line"><small>Electrons in boxes</small></div><div class="boxes">' + boxesHTML(r.cfg) + "</div></div>" : "") +
          (notes.length ? '<p class="fineprint">' + notes.map(esc).join(" ") + "</p>" : "");
        out.removeAttribute("data-tone");
      } catch (err) {
        out.innerHTML = '<div class="result" data-tone="error"><span class="result__msg">' + esc(err.message) + "</span></div>";
      }
    }
    if (ecSel) {
      ecSel.innerHTML = CHEM.ELEMENTS.slice(0, 36).map(function (r) { return '<option value="' + r[0] + '">' + r[0] + " · " + esc(r[1]) + " — " + esc(r[2]) + "</option>"; }).join("");
      ecSel.value = "26";
      ecSel.addEventListener("change", renderEC);
      $("#ec-charge").addEventListener("input", renderEC);
      $$("[data-ec]").forEach(function (b) {
        b.addEventListener("click", function () { var p = b.getAttribute("data-ec").split(","); ecSel.value = p[0]; $("#ec-charge").value = p[1]; renderEC(); });
      });
      renderEC();
    }

    // ---- Mr calculator ----
    var mrIn = $("#mr-in");
    function renderMr() {
      var out = $("#mr-out");
      if (!mrIn.value.trim()) { out.innerHTML = '<div class="result"><span class="result__label">M<sub>r</sub></span><span class="result__msg">Type a formula — for example CuSO4·5H2O or Ca(OH)2.</span></div>'; return; }
      try {
        var p = parseFormula(mrIn.value), m = molarMass(p);
        mrIn.setAttribute("aria-invalid", "false");
        out.innerHTML = '<div class="result"><span class="result__label">M<sub>r</sub> of ' + formulaHTML(p.display) + '</span><span class="result__value">' + dp1(m.mr) + ' <small>g mol<sup>−1</sup></small></span>' +
          '<span class="result__work">' + m.rows.map(function (r) { return (r.n > 1 ? r.n + " × " : "") + r.ar.toFixed(1) + " (" + r.sym + ")"; }).join(" + ") + "</span>" + (p.note ? '<span class="result__work">' + esc(p.note) + "</span>" : "") + "</div>" +
          '<div class="breakdown-wrap"><table class="breakdown"><thead><tr><th>Element</th><th>Atoms</th><th>A<sub>r</sub></th><th>Mass</th><th>% by mass</th></tr></thead><tbody>' +
          m.rows.map(function (r) { return "<tr><td><strong>" + r.sym + "</strong> " + esc(r.name) + "</td><td>" + r.n + "</td><td>" + r.ar.toFixed(1) + "</td><td>" + dp1(r.sub) + "</td><td>" + r.pct.toFixed(1) + '%<span class="pct-bar"><i style="width:' + r.pct.toFixed(1) + '%"></i></span></td></tr>'; }).join("") +
          "</tbody><tfoot><tr><td>Total</td><td></td><td></td><td>" + dp1(m.mr) + "</td><td>100%</td></tr></tfoot></table></div>";
        var mi = $("#mm-mr"); if (mi && !mi.dataset.touched) mi.value = dp1(m.mr);
      } catch (err) {
        mrIn.setAttribute("aria-invalid", "true");
        out.innerHTML = '<div class="result" data-tone="error"><span class="result__label">Check the formula</span><span class="result__msg">' + fmt(err.message) + "</span></div>";
      }
    }
    if (mrIn) {
      mrIn.addEventListener("input", function (e) { if (e.isTrusted) delete mrIn.dataset.preset; renderMr(); });
      $$("[data-mr]").forEach(function (b) { b.addEventListener("click", function () { mrIn.value = b.getAttribute("data-mr"); mrIn.dataset.preset = "1"; renderMr(); mrIn.focus(); }); });
      mrIn.value = "CuSO4·5H2O"; mrIn.dataset.preset = "1";
      renderMr();
    }

    // ---- s.f. selector ----
    $$("[data-sf]").forEach(function (b) {
      b.addEventListener("click", function () {
        SF = +b.getAttribute("data-sf");
        $$("[data-sf]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        runCalcs();
      });
    });

    // ---- tabs ----
    var tabs = $$("[role=tab]");
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { selectTab(t); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, j = k === "ArrowRight" ? i + 1 : k === "ArrowLeft" ? i - 1 : -1;
        if (j < 0 && k !== "ArrowLeft") return;
        e.preventDefault(); var n = tabs[(j + tabs.length) % tabs.length]; selectTab(n); n.focus();
      });
    });
    function selectTab(t) {
      tabs.forEach(function (x) { var on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; $("#" + x.getAttribute("aria-controls")).hidden = !on; });
    }

    // ---- calculators: leave exactly one box empty ----
    function val(id) { var v = $(id).value.trim(); return v === "" ? null : Number(v.replace(/[×x]\s*10\^?/i, "e").replace(/\s/g, "")); }
    function rv(id) { return esc($(id).value.trim()); }
    function unit(id) { return $(id).value; }
    function out(id, html, tone) { var o = $(id); o.innerHTML = html; if (tone) o.dataset.tone = tone; else o.removeAttribute("data-tone"); }
    function need(msg) { return '<span class="result__label">Answer</span><span class="result__msg">' + msg + "</span>"; }
    function res(label, value, unitHTML, work) {
      return '<span class="result__label">' + label + '</span><span class="result__value">' + value + ' <small>' + unitHTML + '</small></span><span class="result__work">' + work + "</span>";
    }
    function bad(nums) { return nums.some(function (x) { return x != null && (!isFinite(x) || x < 0); }); }

    function calcMoles() {
      var m = val("#mm-m"), n = val("#mm-n"), M = val("#mm-mr");
      var empties = [m, n, M].filter(function (x) { return x == null; }).length;
      if (bad([m, n, M])) return out("#mm-out", need("Use positive numbers only."), "error");
      if (empties !== 1) return out("#mm-out", need("Fill in two boxes and leave the one you want blank."));
      if (n == null) { if (!M) return out("#mm-out", need("M<sub>r</sub> can’t be zero."), "error"); n = m / M; return out("#mm-out", res("Amount, n", sf(n, SF), "mol", "n = m ÷ M<sub>r</sub> = " + rv("#mm-m") + " ÷ " + rv("#mm-mr") + " = " + sf(n, SF) + " mol")); }
      if (m == null) { m = n * M; return out("#mm-out", res("Mass, m", sf(m, SF), "g", "m = n × M<sub>r</sub> = " + rv("#mm-n") + " × " + rv("#mm-mr") + " = " + sf(m, SF) + " g")); }
      if (!n) return out("#mm-out", need("n can’t be zero."), "error");
      M = m / n; out("#mm-out", res("M<sub>r</sub>", sf(M, SF), "g mol<sup>−1</sup>", "M<sub>r</sub> = m ÷ n = " + rv("#mm-m") + " ÷ " + rv("#mm-n") + " = " + sf(M, SF)));
    }
    function calcSol() {
      var c = val("#so-c"), n = val("#so-n"), V = val("#so-v"), vu = unit("#so-vu");
      var empties = [c, n, V].filter(function (x) { return x == null; }).length;
      if (bad([c, n, V])) return out("#so-out", need("Use positive numbers only."), "error");
      if (empties !== 1) return out("#so-out", need("Fill in two boxes and leave the one you want blank."));
      var Vd = V == null ? null : (vu === "cm3" ? V / 1000 : V);
      var vtxt = V == null ? "" : (vu === "cm3" ? "(" + rv("#so-v") + " ÷ 1000)" : rv("#so-v"));
      if (c == null) { if (!Vd) return out("#so-out", need("Volume can’t be zero."), "error"); c = n / Vd; return out("#so-out", res("Concentration, c", sf(c, SF), "mol dm<sup>−3</sup>", "c = n ÷ V = " + rv("#so-n") + " ÷ " + vtxt + " dm<sup>3</sup> = " + sf(c, SF) + " mol dm<sup>−3</sup>")); }
      if (n == null) { n = c * Vd; return out("#so-out", res("Amount, n", sf(n, SF), "mol", "n = c × V = " + rv("#so-c") + " × " + vtxt + " dm<sup>3</sup> = " + sf(n, SF) + " mol")); }
      if (!c) return out("#so-out", need("Concentration can’t be zero."), "error");
      Vd = n / c;
      var vOut = vu === "cm3" ? Vd * 1000 : Vd;
      out("#so-out", res("Volume, V", sf(vOut, SF), vu === "cm3" ? "cm<sup>3</sup>" : "dm<sup>3</sup>", "V = n ÷ c = " + rv("#so-n") + " ÷ " + rv("#so-c") + " = " + sf(Vd, SF) + " dm<sup>3</sup>" + (vu === "cm3" ? " = " + sf(vOut, SF) + " cm<sup>3</sup>" : "")));
    }
    var R = 8.31;
    function calcGas() {
      var p = val("#ga-p"), V = val("#ga-v"), n = val("#ga-n"), T = val("#ga-t");
      var pu = unit("#ga-pu"), vu = unit("#ga-vu"), tu = unit("#ga-tu");
      var empties = [p, V, n, T].filter(function (x) { return x == null; }).length;
      if (bad([p, V, n]) || (T != null && !isFinite(T))) return out("#ga-out", need("Check the numbers — p, V and n must be positive."), "error");
      if (empties !== 1) return out("#ga-out", need("Fill in three boxes and leave the one you want blank."));
      var pPa = p == null ? null : (pu === "kPa" ? p * 1000 : p);
      var Vm3 = V == null ? null : (vu === "m3" ? V : vu === "dm3" ? V / 1e3 : V / 1e6);
      var TK = T == null ? null : (tu === "C" ? T + 273 : T);
      if (TK != null && TK <= 0) return out("#ga-out", need("Temperature must be above 0 K."), "error");
      var conv = [];
      if (pu === "kPa" && p != null) conv.push("p = " + rv("#ga-p") + " kPa = " + sf(pPa, 4) + " Pa");
      if (vu !== "m3" && V != null) conv.push("V = " + rv("#ga-v") + (vu === "dm3" ? " dm<sup>3</sup>" : " cm<sup>3</sup>") + " = " + sf(Vm3, 4) + " m<sup>3</sup>");
      if (tu === "C" && T != null) conv.push("T = " + rv("#ga-t") + " + 273 = " + TK + " K");
      var pre = conv.length ? conv.join(" · ") + "<br>" : "";
      if (p == null) { pPa = n * R * TK / Vm3; var pv = pu === "kPa" ? pPa / 1000 : pPa; return out("#ga-out", res("Pressure, p", sf(pv, SF), pu, pre + "p = nRT ÷ V = " + rv("#ga-n") + " × 8.31 × " + TK + " ÷ " + sf(Vm3, 4) + " = " + sf(pPa, SF) + " Pa")); }
      if (V == null) { Vm3 = n * R * TK / pPa; var vv = vu === "m3" ? Vm3 : vu === "dm3" ? Vm3 * 1e3 : Vm3 * 1e6; return out("#ga-out", res("Volume, V", sf(vv, SF), vu === "m3" ? "m<sup>3</sup>" : vu === "dm3" ? "dm<sup>3</sup>" : "cm<sup>3</sup>", pre + "V = nRT ÷ p = " + rv("#ga-n") + " × 8.31 × " + TK + " ÷ " + sf(pPa, 4) + " = " + sf(Vm3, SF) + " m<sup>3</sup>")); }
      if (n == null) { n = pPa * Vm3 / (R * TK); return out("#ga-out", res("Amount, n", sf(n, SF), "mol", pre + "n = pV ÷ RT = " + sf(pPa, 4) + " × " + sf(Vm3, 4) + " ÷ (8.31 × " + TK + ") = " + sf(n, SF) + " mol")); }
      TK = pPa * Vm3 / (n * R);
      var tv = tu === "C" ? TK - 273 : TK;
      out("#ga-out", res("Temperature, T", sf(tv, SF), tu === "C" ? "°C" : "K", pre + "T = pV ÷ nR = " + sf(pPa, 4) + " × " + sf(Vm3, 4) + " ÷ (" + rv("#ga-n") + " × 8.31) = " + sf(TK, SF) + " K"));
    }
    function calcPH() {
      var mode = unit("#ph-mode"), c = val("#ph-c"), k = val("#ph-k"), b = +unit("#ph-b");
      $("#ph-k-field").hidden = mode !== "weak";
      $("#ph-b-field").hidden = mode === "weak" || mode === "fromph";
      $("#ph-c-label").innerHTML = mode === "fromph" ? "pH" : "Concentration, c <small>(mol dm<sup>−3</sup>)</small>";
      if (c == null) return out("#ph-out", need(mode === "fromph" ? "Enter a pH." : "Enter the concentration."));
      if (!isFinite(c) || (mode !== "fromph" && c <= 0)) return out("#ph-out", need("Use a positive number."), "error");
      var H, pH, work;
      if (mode === "strongacid") { H = c * b; pH = -Math.log10(H); work = "[H<sup>+</sup>] = " + (b > 1 ? b + " × " + rv("#ph-c") + " = " : "") + sf(H, SF) + " mol dm<sup>−3</sup><br>pH = −log[H<sup>+</sup>] = " + pH.toFixed(2); }
      else if (mode === "strongbase") { var OH = c * b; H = 1e-14 / OH; pH = -Math.log10(H); work = "[OH<sup>−</sup>] = " + (b > 1 ? b + " × " + rv("#ph-c") + " = " : "") + sf(OH, SF) + " mol dm<sup>−3</sup><br>[H<sup>+</sup>] = K<sub>w</sub> ÷ [OH<sup>−</sup>] = 1.00 × 10<sup>−14</sup> ÷ " + sf(OH, SF) + " = " + sf(H, SF) + "<br>pH = " + pH.toFixed(2); }
      else if (mode === "weak") {
        if (k == null || !(k > 0)) return out("#ph-out", need("Enter K<sub>a</sub> (e.g. 1.74e-5)."));
        H = Math.sqrt(k * c); pH = -Math.log10(H);
        work = "[H<sup>+</sup>] = √(K<sub>a</sub> × c) = √(" + sf(k, 3) + " × " + rv("#ph-c") + ") = " + sf(H, SF) + "<br>pH = " + pH.toFixed(2) + " · assumes dissociation is small, so [HA] ≈ c";
      } else {
        H = Math.pow(10, -c);
        return out("#ph-out", res("[H<sup>+</sup>]", sf(H, SF), "mol dm<sup>−3</sup>", "[H<sup>+</sup>] = 10<sup>−pH</sup> = 10<sup>−" + c + "</sup>"));
      }
      out("#ph-out", res("pH", pH.toFixed(2), "", work));
    }
    var Fc = 96500, Vm = 24.0;
    function calcElec() {
      var I = val("#el-i"), t = val("#el-t"), tu = unit("#el-tu"), z = val("#el-z"), sym = $("#el-sym").value.trim();
      if (I == null || t == null) return out("#el-out", need("Enter the current and the time."));
      if (bad([I, t, z])) return out("#el-out", need("Use positive numbers only."), "error");
      var ts = tu === "min" ? t * 60 : tu === "h" ? t * 3600 : t;
      var Q = I * ts, ne = Q / Fc;
      var work = (tu !== "s" ? "t = " + t + " " + tu + " = " + ts + " s<br>" : "") + "Q = It = " + rv("#el-i") + " × " + ts + " = " + sf(Q, SF) + " C<br>n(e<sup>−</sup>) = Q ÷ F = " + sf(Q, SF) + " ÷ 96 500 = " + sf(ne, SF) + " mol";
      var html = res("Charge passed, Q", sf(Q, SF), "C", work);
      if (z) {
        var np = ne / z;
        html += '<span class="result__work"><strong>Product:</strong> n = n(e<sup>−</sup>) ÷ ' + z + " = " + sf(np, SF) + " mol</span>";
        if (sym) {
          try {
            var M = molarMass(parseFormula(sym)).mr, mass = np * M;
            html += '<span class="result__work">mass = n × M<sub>r</sub> = ' + sf(np, SF) + " × " + dp1(M) + " = <strong>" + sf(mass, SF) + " g</strong>";
            if ($("#el-gas").checked) html += " · volume at room conditions = n × 24.0 = <strong>" + sf(np * Vm, SF) + " dm<sup>3</sup></strong>";
            html += "</span>";
          } catch (err) { html += '<span class="result__work">' + fmt(err.message) + "</span>"; }
        }
      }
      out("#el-out", html);
    }
    function runCalcs() {
      if ($("#mm-out")) calcMoles();
      if ($("#so-out")) calcSol();
      if ($("#ga-out")) calcGas();
      if ($("#ph-out")) calcPH();
      if ($("#el-out")) calcElec();
    }
    var mmMr = $("#mm-mr");
    if (mmMr) mmMr.addEventListener("input", function () { mmMr.dataset.touched = mmMr.value ? "1" : ""; });
    $$(".calc-input").forEach(function (i) { i.addEventListener("input", runCalcs); i.addEventListener("change", runCalcs); });
    $$("[data-fill]").forEach(function (b) {
      b.addEventListener("click", function () {
        var spec = JSON.parse(b.getAttribute("data-fill"));
        Object.keys(spec).forEach(function (k) { var f = $("#" + k); if (f.type === "checkbox") f.checked = !!spec[k]; else f.value = spec[k]; });
        runCalcs();
      });
    });
    runCalcs();

    // ---- constants ----
    var ct = $("#consts-body");
    if (ct) ct.innerHTML = CHEM.CONSTANTS.map(function (c) { return "<tr><td>" + esc(c.name) + "</td><td>" + fmt(c.sym) + "</td><td>" + fmt(c.val) + "</td><td>" + fmt(c.unit) + "</td></tr>"; }).join("");

    // ---- tool nav highlight ----
    var links = $$(".toolnav a");
    if ("IntersectionObserver" in window && links.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$(".tool").forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */
  initTheme();
  initMenu();
  initShared();
  if (PAGE === "home") initHome();
  if (PAGE === "syllabus") initSyllabus();
  if (PAGE === "toolkit") initToolkit();

  // expose engine for testing
  window.SAZ = { parseFormula: parseFormula, molarMass: molarMass, atomConfig: atomConfig, ionConfig: ionConfig, shorthand: shorthand, cfgString: cfgString, valence: valence, sf: sf };
})();
