/** Drag-to-compare. Pointer drag anywhere on the image, arrow keys on the knob. */
export const initCompare = () => {
  document.querySelectorAll<HTMLElement>('[data-compare]').forEach((el) => {
    const knob = el.querySelector<HTMLButtonElement>('[data-compare-knob]')!;
    let p = 50;
    let dragging = false;

    const set = (v: number) => {
      p = Math.min(100, Math.max(0, v));
      el.style.setProperty('--p', p.toFixed(2));
      const r = Math.round(p);
      knob.setAttribute('aria-valuenow', String(r));
      knob.setAttribute('aria-valuetext', `${r}% before`);
    };

    const fromEvent = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };

    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      el.removeAttribute('data-animating');
      dragging = true;
      el.setAttribute('data-dragging', '');
      el.setPointerCapture(e.pointerId);
      // On touch, wait for movement so a vertical scroll that starts here doesn't jump the slider.
      if (e.pointerType !== 'touch') fromEvent(e);
    });
    el.addEventListener('pointermove', (e) => dragging && fromEvent(e));
    const stop = () => {
      dragging = false;
      el.removeAttribute('data-dragging');
    };
    el.addEventListener('pointerup', stop);
    el.addEventListener('pointercancel', stop);

    knob.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 5;
      const keys: Record<string, number> = {
        ArrowLeft: p - step,
        ArrowDown: p - step,
        ArrowRight: p + step,
        ArrowUp: p + step,
        Home: 0,
        End: 100,
        PageDown: p - 20,
        PageUp: p + 20,
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      el.removeAttribute('data-animating');
      set(keys[e.key]);
    });

    // First time it scrolls into view, sweep once so people see it moves.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const seq = [72, 30, 50];
        let i = 0;
        el.setAttribute('data-animating', '');
        const next = () => {
          if (!el.hasAttribute('data-animating') || i >= seq.length) {
            el.removeAttribute('data-animating');
            return;
          }
          set(seq[i++]);
          setTimeout(next, 1100);
        };
        setTimeout(next, 500);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
  });
};
