import { business } from '../data/business';
import { formatTime } from '../data/time';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Current weekday and minute-of-day in the clinic's time zone. */
export const clinicNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: business.timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return { day: DAYS.indexOf(get('weekday')), min: Number(get('hour')) * 60 + Number(get('minute')) };
};

export interface HoursState {
  open: boolean;
  /** Short label, e.g. "Open now · until 6pm". */
  label: string;
  /** When the phone will next be answered, e.g. "tomorrow at 9:30am". */
  next: string;
}

export const hoursState = (): HoursState => {
  const { day, min } = clinicNow();
  const today = business.hours[day];

  if (today && min >= toMin(today.open) && min < toMin(today.close)) {
    const left = toMin(today.close) - min;
    return {
      open: true,
      label: left <= 30 ? `Closing soon · ${formatTime(today.close)}` : `Open now · until ${formatTime(today.close)}`,
      next: 'now',
    };
  }

  if (today && min < toMin(today.open)) {
    const t = formatTime(today.open);
    return { open: false, label: `Opens today ${t}`, next: `today at ${t}` };
  }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = business.hours[d];
    if (!h) continue;
    const t = formatTime(h.open);
    const when = i === 1 ? 'tomorrow' : DAYS[d];
    return { open: false, label: `Closed · opens ${when} ${t}`, next: `${when} at ${t}` };
  }
  return { open: false, label: 'Closed', next: '' };
};

export const initHours = () => {
  const render = () => {
    const s = hoursState();
    document.querySelectorAll<HTMLElement>('[data-hours-status]').forEach((el) => {
      el.dataset.open = String(s.open);
      const text = el.querySelector('[data-hours-text]');
      if (text) text.textContent = s.label;
    });
    const { day } = clinicNow();
    document.querySelectorAll<HTMLElement>('[data-hours-table] [data-from]').forEach((row) => {
      const from = Number(row.dataset.from);
      const to = Number(row.dataset.to);
      // Rows run Mon→Sun, so Sunday (0) only ever appears as its own row or at the end of a range.
      const inRange = from <= to ? day >= from && day <= to : day >= from || day <= to;
      row.toggleAttribute('data-today', inRange);
    });
    document.querySelectorAll<HTMLElement>('[data-hours-hint]').forEach((el) => {
      el.textContent = s.open
        ? 'We’re open. Call now and you’ll usually reach us straight away.'
        : `We’re closed right now. Leave your number and we’ll call you back ${s.next}.`;
    });
  };
  render();
  setInterval(render, 60_000);
};
