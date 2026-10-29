import { business } from '../data/business';
import { getTopic } from './topic';
import { hoursState } from './hours';

const digits = (v: string) => v.replace(/\D/g, '');

const normalisePhone = (v: string) => {
  let d = digits(v);
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  return d;
};

const formatPhone = (v: string) => {
  const d = normalisePhone(v);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : v.trim();
};

export const initCallback = () => {
  const form = document.querySelector<HTMLFormElement>('[data-callback]');
  const done = document.querySelector<HTMLElement>('[data-callback-done]');
  if (!form || !done) return;

  const name = form.elements.namedItem('name') as HTMLInputElement;
  const phone = form.elements.namedItem('phone') as HTMLInputElement;
  const select = form.querySelector<HTMLSelectElement>('[data-topic-select]')!;
  const other = select.querySelector<HTMLOptionElement>('[data-other]')!;
  const status = form.querySelector<HTMLElement>('[data-cb-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  /* Pre-select whatever the visitor picked in the finder or on a treatment page. */
  const applyTopic = (topic: string) => {
    if (!topic) return;
    const match = [...select.options].find((o) => o.value === topic);
    if (match) {
      select.value = topic;
      other.hidden = true;
    } else {
      other.value = topic;
      other.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
      other.hidden = false;
      select.value = topic;
    }
  };
  applyTopic(getTopic());
  document.addEventListener('topic:change', (e) => applyTopic((e as CustomEvent<string>).detail));

  /* Validation: quiet until a field has been left once, then live. */
  const rules: [HTMLInputElement, () => string][] = [
    [name, () => (name.value.trim().length < 2 ? 'Please add your name so we know who to ask for.' : '')],
    [
      phone,
      () => (normalisePhone(phone.value).length !== 10 ? 'Please enter a 10-digit US phone number.' : ''),
    ],
  ];

  const check = (input: HTMLInputElement, rule: () => string) => {
    const msg = rule();
    const err = document.getElementById(input.getAttribute('aria-describedby')!)!;
    err.textContent = msg;
    input.setAttribute('aria-invalid', String(Boolean(msg)));
    return !msg;
  };

  rules.forEach(([input, rule]) => {
    input.addEventListener('blur', () => {
      if (input === phone) phone.value = formatPhone(phone.value);
      if (input.value || input.dataset.touched) check(input, rule);
      input.dataset.touched = '1';
    });
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') check(input, rule);
    });
  });

  const setState = (state: 'idle' | 'loading' | 'error', message = '') => {
    form.dataset.state = state;
    submit.disabled = state === 'loading';
    submit.querySelector('.cb__label')!.textContent = state === 'loading' ? 'Sending…' : 'Call me back';
    status.innerHTML = message;
  };

  const showDone = (body: string) => {
    const first = name.value.trim().split(/\s+/)[0];
    done.querySelector('[data-done-title]')!.textContent = `Thanks, ${first}. We’ll be in touch.`;
    done.querySelector('[data-done-body]')!.textContent = body;
    form.hidden = true;
    done.hidden = false;
    done.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const results = rules.map(([input, rule]) => check(input, rule));
    if (results.includes(false)) {
      const firstBad = rules.find(([input]) => input.getAttribute('aria-invalid') === 'true');
      firstBad?.[0].focus();
      return;
    }

    const data = new FormData(form);
    const s = hoursState();
    const when = s.open ? 'shortly' : s.next;
    const callBody = `We’ll call ${formatPhone(phone.value)} ${when}. If you miss us, we’ll leave a voicemail and try once more.`;

    // Bots fill the hidden field; humans never see it.
    if (data.get('company')) {
      showDone(callBody);
      return;
    }

    const endpoint = form.dataset.endpoint;
    const summary = [
      `Name: ${data.get('name')}`,
      `Phone: ${formatPhone(String(data.get('phone')))}`,
      `Interested in: ${data.get('interest') || 'Not sure yet'}`,
      `Best time: ${data.get('time') || 'Anytime'}`,
    ].join('\n');

    if (!endpoint) {
      // No form service configured yet: hand off to the visitor's email app.
      const subject = `Call-back request: ${data.get('name')}`;
      location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
      showDone('Your email app should have opened with the request ready. Press send and we’ll call you back.');
      return;
    }

    setState('loading');
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12_000);
    try {
      data.delete('company');
      data.set('_subject', `Call-back request: ${data.get('name')}`);
      data.set('summary', summary);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('idle');
      showDone(callBody);
    } catch {
      setState(
        'error',
        `That didn’t go through. Please call <a href="tel:${business.tel}">${business.phone}</a> or email <a href="mailto:${business.email}">${business.email}</a>.`,
      );
    } finally {
      clearTimeout(timer);
    }
  });
};
