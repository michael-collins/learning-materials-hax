/**
 * The loading figure's timing and behaviour, shared by the site
 * (site-loader.js) and nu-hax/tools/loader-tuner.html, which carries a copy
 * of this file (scripts/make-building-figure.mjs puts it there). No imports,
 * so it can be copied as it is. Settings: loader-settings.js; all times ms.
 */

// the layers in the order they drop, in groups: the header; three lines of
// text; the image; a column of three lines; two closing lines
export const LAYER_GROUPS = [["header"], ["line1", "line2", "line3"], ["image"], ["col1", "col2", "col3"], ["line4", "line5"]];

/** When each part of one loop happens. */
export function timeline(s) {
  const starts = {};
  let t = s.firstMs;
  LAYER_GROUPS.forEach((group, g) =>
    group.forEach((name, i) => {
      if (g || i) t += i ? s.gapMs : s.groupGapMs;
      starts[name] = t;
    }),
  );
  const landed = t + s.dropMs;
  const caretOn = landed + s.caretDelayMs;
  // after one blink the caret stays: the page is built
  const built = caretOn + 2 * s.blinkMs;
  const fadeAt = built + s.restMs;
  return { starts, landed, caretOn, built, fadeAt, cycle: fadeAt + s.fadeMs };
}

/**
 * The figure's animations as CSS: each layer drops in, everything rests once
 * built, then fades and the loop starts again. Only opacity and transform
 * move, so the browser animates them off the main thread. `pieces` holds
 * each layer's height (figure units), so the drop can be a share of it.
 */
export function figureCss(s, pieces) {
  const T = timeline(s);
  const at = (ms) => `${Math.min(100, (ms / T.cycle) * 100).toFixed(3)}%`;
  const ease = `cubic-bezier(${s.easing.join(",")})`;
  const tick = 0.5; // ms: a step, for the caret's blink
  const layers = LAYER_GROUPS.flat().map((name) => {
    const up = `translateY(${((-s.distance / (pieces[name] || 10)) * 100).toFixed(2)}%)`;
    const start = T.starts[name];
    return `@keyframes ${name}{0%{opacity:0;transform:${up}}${at(start)}{opacity:0;transform:${up};animation-timing-function:${ease}}${at(start + s.dropMs)}{opacity:1;transform:translateY(0)}${at(T.fadeAt)}{opacity:1;transform:translateY(0);animation-timing-function:ease-in}100%{opacity:0;transform:translateY(0)}}
.${name}{animation:${name} ${T.cycle}ms linear infinite}`;
  });
  const blink = s.blinkMs
    ? `${at(T.caretOn + tick)},${at(T.caretOn + s.blinkMs)}{opacity:1}${at(T.caretOn + s.blinkMs + tick)},${at(T.caretOn + 2 * s.blinkMs)}{opacity:0}${at(T.caretOn + 2 * s.blinkMs + tick)}{opacity:1}`
    : `${at(T.caretOn + tick)}{opacity:1}`;
  const caret = `@keyframes caret{0%,${at(T.caretOn)}{opacity:0}${blink}${at(T.fadeAt)}{opacity:1;animation-timing-function:ease-in}100%{opacity:0}}
svg.caret{animation:caret ${T.cycle}ms linear infinite}`;
  return [...layers, caret].join("\n");
}

/**
 * Once the page is ready, at figure time t: how the figure gets to its
 * built page. "speed" plays the rest faster (up to maxSpeed) so it's built
 * within finishMs; "skip" jumps ahead to finishMs before built; "play"
 * plays out at its own pace. Already built (resting or fading): now.
 */
export function readyPlan(t, s) {
  const T = timeline(s);
  const phase = t % T.cycle;
  if (phase >= T.built) return { rate: 1, waitMs: 0, skipTo: null, freezeAt: null };
  const loop = t - phase;
  const left = T.built - phase;
  const plan = { rate: 1, waitMs: left, skipTo: null, freezeAt: loop + T.built };
  if (s.ready === "skip" && left > s.finishMs) Object.assign(plan, { skipTo: loop + T.built - s.finishMs, waitMs: s.finishMs });
  if (s.ready === "speed") {
    plan.rate = Math.min(Math.max(left / Math.max(s.finishMs, 1), 1), Math.max(s.maxSpeed, 1));
    plan.waitMs = left / plan.rate;
  }
  return plan;
}

/** How long after the page is ready, at figure time t, the screen starts to fade and is gone. */
export function revealTimes(t, s) {
  const plan = readyPlan(t, s);
  const start = plan.waitMs + s.holdMs;
  return { fading: start + s.dissolveDelayMs, gone: start + s.dissolveDelayMs + s.dissolveMs };
}

/**
 * Draw the figure in `host` (in a shadow root, so its styles stay its own)
 * and start it. `figure` is { css, html, pieces } from
 * building-figure.generated.js. Returns its controls.
 */
export function drawFigure(host, figure, s) {
  const shadow = host.shadowRoot || host.attachShadow({ mode: "open" });
  shadow.innerHTML = `<style>${figure.css}\n${figureCss(s, figure.pieces)}</style>${figure.html}`;
  const anims = () => shadow.getAnimations();
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  return {
    time: () => Number(anims()[0]?.currentTime) || 0,
    stop() {
      timers.forEach(clearTimeout);
      for (const a of anims()) a.pause();
    },
    // the page is ready: on to the built page, a moment's pause, then done()
    finish(done) {
      const list = anims();
      if (!list.length) return done();
      const plan = readyPlan(Number(list[0].currentTime) || 0, s);
      for (const a of list) {
        if (plan.skipTo != null) a.currentTime = plan.skipTo;
        if (plan.rate !== 1) a.updatePlaybackRate ? a.updatePlaybackRate(plan.rate) : (a.playbackRate = plan.rate);
      }
      later(() => {
        for (const a of anims()) {
          if (plan.freezeAt != null) a.currentTime = plan.freezeAt;
          a.pause();
        }
        later(done, s.holdMs);
      }, plan.waitMs);
    },
  };
}

/**
 * Dissolve the loading screen: the figure and its words fade, then the
 * screen (styles: theme/theme.css, keyed on .oer-dissolve). done() once
 * it's gone.
 */
export function dissolve(screen, s, done) {
  screen.style.setProperty("--oer-figure-fade", `${s.figureFadeMs}ms`);
  screen.style.setProperty("--oer-dissolve-delay", `${s.dissolveDelayMs}ms`);
  screen.style.setProperty("--oer-dissolve", `${s.dissolveMs}ms`);
  screen.classList.add("oer-dissolve");
  setTimeout(done, s.dissolveDelayMs + s.dissolveMs + 50);
}
