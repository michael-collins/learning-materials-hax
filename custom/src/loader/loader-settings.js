// The loading screen's timing (loader-core.js), dialled in with
// nu-hax/tools/loader-tuner.html or its claude.ai copy, which saves to the
// artifact's db as config/loader. After changing these, run
// `node scripts/make-building-figure.mjs` in nu-hax so the tuner starts from
// them, then rebuild. All times in ms.
export const LOADER_SETTINGS = {
  // the build: each layer drops in, layers in a group closer together
  firstMs: 220,
  gapMs: 336,
  groupGapMs: 500,
  dropMs: 392,
  distance: 14, // how far each layer drops, in figure units (the page is 112 wide)
  easing: [0.2, 0.7, 0.2, 1],
  // then the caret blinks once and stays: the page is built
  caretDelayMs: 60,
  blinkMs: 260,
  // still loading: the built page rests, fades, and the build starts again
  restMs: 330,
  fadeMs: 450,
  // the page is ready: "speed" plays the rest faster, up to maxSpeed, to be
  // built within finishMs; "skip" jumps ahead to finishMs before built;
  // "play" plays out at its own pace. Then a pause on the built page
  ready: "speed",
  finishMs: 700,
  maxSpeed: 6,
  holdMs: 150,
  // the dissolve: the figure fades, then the screen
  figureFadeMs: 350,
  dissolveDelayMs: 150,
  dissolveMs: 550,
};
