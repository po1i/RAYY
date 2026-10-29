import { setTopic } from './topic';

/**
 * Treatment finder. Filters the treatment list in place: matches are marked,
 * everything else dims, so the list never jumps and visitors still see the
 * full menu. The result carries straight into the call-back form.
 */
export const initFinder = () => {
  const root = document.querySelector<HTMLElement>('[data-finder]');
  if (!root) return;

  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-concern]')];
  const radios = [...root.querySelectorAll<HTMLInputElement>('input[name="downtime"]')];
  const rows = [...root.querySelectorAll<HTMLElement>('[data-row]')];
  const text = root.querySelector<HTMLElement>('[data-result-text]')!;
  const actions = root.querySelector<HTMLElement>('[data-result-actions]')!;
  const ask = root.querySelector<HTMLAnchorElement>('[data-ask]')!;
  const clear = root.querySelector<HTMLButtonElement>('[data-clear]')!;
  const defaultText = text.innerHTML;

  const selectedConcerns = () => chips.filter((c) => c.getAttribute('aria-pressed') === 'true');
  const downtime = () => radios.find((r) => r.checked)?.value ?? 'any';

  let topic = '';

  const update = () => {
    const concerns = selectedConcerns();
    const ids = concerns.map((c) => c.dataset.concern!);
    const dt = downtime();
    const filtering = ids.length > 0 || dt !== 'any';
    root.toggleAttribute('data-filtering', filtering);

    const matches = rows.filter((row) => {
      const rc = row.dataset.concerns!.split(' ');
      const okConcern = ids.length === 0 || ids.some((id) => rc.includes(id));
      const okDowntime = dt === 'any' || Number(row.dataset.downtime) <= Number(dt);
      const match = filtering && okConcern && okDowntime;
      row.toggleAttribute('data-match', match);
      return match;
    });

    actions.hidden = !filtering;
    if (!filtering) {
      text.innerHTML = defaultText;
      topic = '';
      return;
    }

    const labels = concerns.map((c) => c.querySelector('.chip__label')!.textContent!.toLowerCase());
    if (matches.length === 0) {
      text.textContent = 'Nothing fits all of that exactly. Call us and we’ll talk through the options.';
      topic = labels.join(' and ');
    } else {
      const links = matches
        .map((m) => `<a class="jump" href="#${m.id}">${m.dataset.name}</a>`)
        .join(', ');
      text.innerHTML = `<strong>${matches.length} ${matches.length === 1 ? 'match' : 'matches'}:</strong> ${links}`;
      topic = matches.length === 1 ? matches[0].dataset.name! : labels.join(' and ') || matches.map((m) => m.dataset.name).join(', ');
    }
    ask.firstChild!.textContent = matches.length === 1 ? 'Ask about this ' : 'Ask about these ';
  };

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
      update();
    }),
  );
  radios.forEach((r) => r.addEventListener('change', update));

  clear.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    radios[0].checked = true;
    update();
    chips[0]?.focus();
  });

  ask.addEventListener('click', () => topic && setTopic(topic));

  // Opening a treatment page from the list remembers the choice too.
  rows.forEach((row) =>
    row.querySelector('a')?.addEventListener('click', () => setTopic(row.dataset.name!)),
  );
};
