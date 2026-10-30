/**
 * The hero print opens to full-bleed as you scroll.
 *
 * The print is a window (overflow: hidden) onto a viewport-sized image. Each
 * frame the window is scaled from its framed size up to the full stage, and
 * the image inside is counter-scaled by the inverse, so the picture is never
 * stretched: the window simply reveals more of it. Transforms only.
 */
const pinned = matchMedia('(min-width: 60rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)');

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const initHero = () => {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const print = hero.querySelector<HTMLElement>('[data-hero-print]')!;
  const inner = hero.querySelector<HTMLElement>('[data-hero-inner]')!;
  const cap = hero.querySelector<HTMLElement>('[data-hero-cap]')!;
  const light = hero.querySelector<HTMLElement>('.art__light');
  const fades = [...hero.querySelectorAll<HTMLElement>('[data-hero-fade]')];

  // Framed geometry, measured untransformed and relative to the sticky stage.
  let box = { x: 0, y: 0, w: 1, h: 1 };
  let stage = { w: 1, h: 1 };
  let raf = 0;
  let active = false;

  const reset = () => {
    print.style.transform = '';
    inner.style.transform = '';
    cap.style.opacity = '';
    if (light) light.style.transform = '';
    fades.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  };

  const measure = () => {
    print.style.transform = '';
    const parent = (print.offsetParent as HTMLElement | null) ?? document.body;
    const r = print.getBoundingClientRect();
    const s = parent.getBoundingClientRect();
    box = { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    stage = { w: parent.clientWidth, h: parent.clientHeight };
  };

  const frame = () => {
    raf = 0;
    const travel = hero.offsetHeight - innerHeight;
    const raw = clamp01(-hero.getBoundingClientRect().top / Math.max(travel, 1));
    const p = ease(raw);
    const W = stage.w;
    const H = stage.h;

    const sx = lerp(1, W / box.w, p);
    const sy = lerp(1, H / box.h, p);
    const tx = lerp(0, -box.x, p);
    const ty = lerp(0, -box.y, p);
    print.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${sx}, ${sy})`;
    inner.style.transform = `translate(-50%, -50%) scale(${1 / sx}, ${1 / sy})`;

    const out = clamp01(raw / 0.45);
    fades.forEach((el) => {
      el.style.opacity = String(1 - out);
      el.style.transform = `translate3d(0, ${-out * 40}px, 0)`;
    });
    cap.style.opacity = String(clamp01((raw - 0.7) / 0.3));
    if (light) light.style.transform = `translate3d(${lerp(-35, 40, raw)}%, 0, 0)`;
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  const onResize = () => {
    if (!active) return;
    measure();
    frame();
  };

  const setup = () => {
    if (pinned.matches === active) return;
    active = pinned.matches;
    if (active) {
      measure();
      frame();
      addEventListener('scroll', onScroll, { passive: true });
    } else {
      removeEventListener('scroll', onScroll);
      reset();
    }
  };

  setup();
  pinned.addEventListener('change', setup);
  addEventListener('resize', onResize);
  // Web font swap can change the copy's height and so the print's position.
  document.fonts?.ready.then(onResize);
};
