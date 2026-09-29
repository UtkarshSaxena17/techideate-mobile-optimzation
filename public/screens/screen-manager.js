/*
 * TECHIDEATE screen manager
 * -------------------------
 * Fills the numbered screens in the 3D city:
 *   V01-V10 : video screens  -> "majorEvents" in screens.json
 *   P01-P26 : poster screens -> "clubEvents" in screens.json, rotating
 *
 * Poster order follows the event schedule:
 *   upcoming events (soonest first) go on the screens closest to the centre (P01, P02 ...),
 *   finished events move to the outer screens but stay up for marketing.
 *
 * You normally do NOT need to edit this file. Edit screens.json instead.
 */
(function () {
  'use strict';
  var BASE = '/screens/';
  var isPhone = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || matchMedia('(pointer: coarse)').matches;

  var cfg = null, slotInfo = {}, videos = {}, posterPlan = {}, images = {};

  function slots() { return window.__techiSlots || {}; }

  function now() {
    if (cfg && cfg.testNow) { var t = Date.parse(cfg.testNow); if (!isNaN(t)) return t; }
    return Date.now();
  }

  function eventTime(e) {
    // date "2026-10-14" + time "10:00", read as India time
    var t = Date.parse((e.date || '2000-01-01') + 'T' + (e.time || '00:00') + ':00+05:30');
    return isNaN(t) ? 0 : t;
  }

  /* ---------- drawing ---------- */
  function drawCover(slot, src, sw, sh, fitInside) {
    var c = slot.canvas, x = slot.ctx, cw = c.width, ch = c.height;
    x.fillStyle = '#06122a';
    x.fillRect(0, 0, cw, ch);
    if (src && sw && sh) {
      var s = fitInside ? Math.min(cw / sw, ch / sh) : Math.max(cw / sw, ch / sh), w = sw * s, h = sh * s;
      x.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
    }
    slot.texture.needsUpdate = true;
  }

  function drawText(slot, lines) {
    var c = slot.canvas, x = slot.ctx, cw = c.width, ch = c.height, m = Math.min(cw, ch);
    x.fillStyle = '#06122a'; x.fillRect(0, 0, cw, ch);
    x.strokeStyle = '#00a8ff'; x.lineWidth = Math.max(2, m * .02); x.strokeRect(m * .05, m * .05, cw - m * .1, ch - m * .1);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    var step = ch / (lines.length + 1);
    lines.forEach(function (l, i) {
      x.fillStyle = i === 0 ? '#eaf7ff' : '#00a8ff';
      x.font = (i === 0 ? '900 ' : '600 ') + Math.round(m * (i === 0 ? .16 : .09)) + 'px Arial';
      x.fillText(l, cw / 2, step * (i + 1), cw * .88);
    });
    slot.texture.needsUpdate = true;
  }

  function loadImage(src) {
    if (!images[src]) {
      images[src] = new Promise(function (ok) {
        var im = new Image();
        im.onload = function () { ok(im); };
        im.onerror = function () { ok(null); };
        im.src = BASE + src;
      });
    }
    return images[src];
  }

  /* ---------- posters ---------- */
  function orderedEvents() {
    var t = now(), len = (cfg.eventLengthHours || 3) * 3600e3;
    var list = (cfg.clubEvents || []).map(function (e) { return { e: e, start: eventTime(e) }; });
    var upcoming = list.filter(function (x) { return x.start + len >= t; }).sort(function (a, b) { return a.start - b.start; });
    var done = list.filter(function (x) { return x.start + len < t; }).sort(function (a, b) { return b.start - a.start; });
    return upcoming.concat(done).map(function (x) { return x.e; });
  }

  function planPosters() {
    var ids = Object.keys(slotInfo).filter(function (k) { return k[0] === 'P'; }).sort();
    var evs = orderedEvents(), plan = {}, n = evs.length, s = ids.length;
    ids.forEach(function (id) { plan[id] = []; });
    if (!s || !n) { posterPlan = plan; return; }
    if (n <= s) {
      // fewer events than screens: one each, then repeat the soonest ones on the leftover screens
      ids.forEach(function (id, i) { plan[id].push(evs[i % n]); });
    } else {
      // fill screens in order: P01 gets the soonest events, the last screens get finished ones.
      // outer screens take the extra events so the centre screens rotate less.
      var base = Math.floor(n / s), extra = n % s, k = 0;
      ids.forEach(function (id, i) {
        var size = base + (i >= s - extra ? 1 : 0);
        for (var j = 0; j < size; j++) plan[id].push(evs[k++]);
      });
    }
    posterPlan = plan;
  }

  function showPoster(id, tick) {
    var slot = slots()[id], list = posterPlan[id];
    if (!slot) return;
    if (!list || !list.length) { drawText(slot, ['TECHIDEATE', "’26"]); return; }
    var e = list[tick % list.length];
    var src = slot.aspect < 1 ? (e.posterTall || e.posterWide || e.poster) : (e.posterWide || e.posterTall || e.poster);
    var label = [e.club || '', e.event || '', (e.date || '') + '  ' + (e.time || '')];
    if (!src) { drawText(slot, label); return; }
    loadImage(src).then(function (im) {
      if (posterPlan[id] !== list) return;           // plan changed meanwhile
      im ? drawCover(slot, im, im.naturalWidth, im.naturalHeight) : drawText(slot, label);
    });
  }

  function posterLoop() {
    var ids = Object.keys(posterPlan), secs = Math.max(3, cfg.posterSwitchSeconds || 8);
    var tick = Math.floor(Date.now() / (secs * 1000));
    ids.forEach(function (id, i) {
      // stagger so the screens don't all flip at the same moment
      setTimeout(function () { showPoster(id, tick); }, (i % 8) * 250);
    });
  }

  /* ---------- videos ---------- */
  // very wide / tall screens show the whole video with dark bars instead of cropping it
  function needsFit(slot, v) {
    var va = (v.videoWidth || 16) / (v.videoHeight || 9), sa = slot.canvas.width / slot.canvas.height;
    return Math.max(va / sa, sa / va) > 1.5;
  }

  function setupVideos() {
    (cfg.majorEvents || []).forEach(function (m, i) {
      var id = m.screen || ('V' + String(i + 1).padStart(2, '0'));
      if (!m.video) return;
      var v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', '');
      v.preload = isPhone ? 'metadata' : 'auto'; v.crossOrigin = 'anonymous';
      v.src = BASE + m.video;
      v.addEventListener('loadeddata', function () { var s = slots()[id]; s && drawCover(s, v, v.videoWidth, v.videoHeight, needsFit(s, v)); });
      videos[id] = { el: v, meta: m, playing: false };
    });
  }

  function dist(id, p) {
    var s = slotInfo[id];
    if (!s || !p) return s ? s.distanceFromCentre : 1e9;
    var dx = s.x - p.x, dz = s.z - p.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  function chooseVideos() {
    var p = window.__techiPlayer && window.__techiPlayer();
    var max = (cfg.videosPlayingAtOnce || {})[isPhone ? 'phone' : 'desktop'] || (isPhone ? 2 : 4);
    var ids = Object.keys(videos).sort(function (a, b) { return dist(a, p) - dist(b, p); });
    ids.forEach(function (id, i) {
      var v = videos[id], want = i < max && !document.hidden;
      if (want && !v.playing) { v.playing = true; var pr = v.el.play(); pr && pr.catch(function () { v.playing = false; }); }
      if (!want && v.playing) { v.playing = false; v.el.pause(); }
    });
  }

  var lastFrame = 0;
  function frameLoop(t) {
    requestAnimationFrame(frameLoop);
    if (t - lastFrame < (isPhone ? 80 : 50)) return;      // ~12 fps phone, ~20 fps desktop
    lastFrame = t;
    Object.keys(videos).forEach(function (id) {
      var v = videos[id], s = slots()[id];
      if (v.playing && s && v.el.readyState >= 2) drawCover(s, v.el, v.el.videoWidth, v.el.videoHeight, needsFit(s, v.el));
    });
  }

  /* ---------- start ---------- */
  function waitForSlots(cb) {
    if (Object.keys(slots()).length >= 36) return cb();
    var done = false;
    var go = function () { if (!done && Object.keys(slots()).length >= 36) { done = true; cb(); } };
    window.addEventListener('techideate-slot', go);
    var iv = setInterval(function () { go(); if (done) clearInterval(iv); }, 1000);
  }

  Promise.all([
    fetch(BASE + 'screens.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }),
    fetch(BASE + 'slots.json', { cache: 'no-cache' }).then(function (r) { return r.json(); })
  ]).then(function (res) {
    cfg = res[0];
    res[1].forEach(function (s) { slotInfo[s.id] = s; });
    waitForSlots(function () {
      planPosters();
      posterLoop();
      setInterval(posterLoop, Math.max(3, cfg.posterSwitchSeconds || 8) * 1000);
      setInterval(planPosters, 60 * 1000);                  // re-sort as events finish
      setupVideos();
      chooseVideos();
      setInterval(chooseVideos, 1500);
      requestAnimationFrame(frameLoop);
      window.__techiScreens = { config: cfg, plan: function () { return posterPlan; }, videos: videos };
    });
  }).catch(function (err) { console.warn('[TECHIDEATE screens] could not start:', err); });
})();
