/* Platform pages (/shopify/, /woocommerce/):
   1. the hero chat plays its conversation once (static under reduced motion);
   2. "How it works": the steps scroll normally; each one fades up in from the bottom of the viewport and fades up
      and away only as it leaves through the top (static under reduced motion). */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hero = document.querySelector(".phero");
  if (hero) {
    if (reduce) hero.classList.add("is-static");
    else requestAnimationFrame(() => setTimeout(() => hero.classList.add("is-playing"), 350));
  }

  const how = document.querySelector(".phow");
  if (!how || reduce) return;
  /* Steps scroll normally. Each one (text + shot) fades up in as it rises from the bottom of the viewport, stays
     solid in view, and only fades out — drifting up — as it leaves through the top, while the next one rises in. */
  const steps = [...how.querySelectorAll(".phow__step")].map((s) => [s, s.querySelector(".phow__text"), s.querySelector(".phow__shot")]);
  const note = how.querySelector(".phow__note");   // rides with the last shot
  if (note && steps.length) steps[steps.length - 1].push(note);
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  let raf = 0;
  const paint = () => {
    raf = 0;
    const vh = innerHeight;
    for (const [s, text, shot, extra] of steps) {
      const r = s.getBoundingClientRect(), rh = r.height;
      if (r.bottom < -vh || r.top > 2 * vh) continue;
      const enter = smooth(clamp01((vh - r.top) / (0.55 * rh)));                // 0 at the bottom edge → 1 once half is in
      const leave = smooth(clamp01((r.top + 0.5 * rh) / (0.1 * vh + 0.5 * rh))); // 1 until the top nears the top edge → 0
      const o = Math.min(enter, leave), y = (1 - enter) - (1 - leave);           // + below, − above
      text.style.opacity = shot.style.opacity = o.toFixed(3);
      text.style.transform = `translate3d(0, ${(y * 48).toFixed(1)}px, 0)`;
      shot.style.transform = `translate3d(0, ${(y * 90).toFixed(1)}px, 0)`;
      if (extra) { extra.style.opacity = shot.style.opacity; extra.style.transform = shot.style.transform; }
    }
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
  how.classList.add("is-live");
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  paint();
})();
