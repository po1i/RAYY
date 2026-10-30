import { initHours } from './hours';
import { initTopic } from './topic';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

/* ── Header: solid once scrolled, tucks away on scroll down ── */
const initHeader = () => {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = scrollY;
  let ticking = false;
  const update = () => {
    const y = scrollY;
    header.toggleAttribute('data-scrolled', y > 8);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 480 && !header.contains(document.activeElement)) header.setAttribute('data-hidden', '');
    else if (goingUp || y < 480) header.removeAttribute('data-hidden');
    if (goingDown || goingUp) lastY = y;
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.removeAttribute('data-hidden'));
  update();
};

/* ── Mobile menu (native <dialog>: focus trap and Esc for free) ── */
const initMenu = () => {
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!dialog || !openBtn) return;
  openBtn.addEventListener('click', () => {
    dialog.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    document.dispatchEvent(new Event('scroll:lock'));
  });
  dialog.querySelector('[data-menu-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.dispatchEvent(new Event('scroll:unlock'));
  });
};

/* ── Scroll reveals ── */
const initReveals = () => {
  document.querySelectorAll<HTMLElement>('.lines').forEach((el) => {
    el.querySelectorAll<HTMLElement>('.line').forEach((line, i) => line.style.setProperty('--l', String(i)));
  });
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
};

/* ── Smooth scrolling: desktop mouse/trackpad only; touch keeps native ── */
const initSmooth = async () => {
  if (!finePointer.matches || reduced.matches) return;
  const { default: Lenis } = await import('lenis');
  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 || 68;
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -(header + 16) }, autoRaf: true });
  document.addEventListener('scroll:lock', () => lenis.stop());
  document.addEventListener('scroll:unlock', () => lenis.start());
  // Respect the setting if it changes mid-visit.
  reduced.addEventListener('change', () => reduced.matches && lenis.destroy());
};

(window as unknown as { __rv: boolean }).__rv = true;
initHeader();
initMenu();
initReveals();
initHours();
initTopic();
initSmooth();
