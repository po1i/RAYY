import { business } from './business';
import { formatTime } from './time';

export { formatTime };

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an absolute site path with the deploy base ("/RAYY" on github.io). */
export const href = (path: string) => `${base}${path}`;

export const telHref = `tel:${business.tel}`;

/** `sms:` with a pre-written message. "?&body=" works on both iOS and Android. */
export const smsHref = (body: string) => `sms:${business.tel}?&body=${encodeURIComponent(body)}`;

export const consultText = (topic?: string) =>
  topic
    ? `Hi! I'd like to book a free consultation about ${topic}.`
    : `Hi! I'd like to book a free consultation.`;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


/** Collapse identical consecutive days: "Mon–Sat 9:30am–6pm · Sun closed". */
export const hoursRows = () => {
  const rows: { days: string; time: string; from: number; to: number }[] = [];
  const order = [1, 2, 3, 4, 5, 6, 0];
  for (const d of order) {
    const h = business.hours[d];
    const time = h ? `${formatTime(h.open)}–${formatTime(h.close)}` : 'Closed';
    const last = rows.at(-1);
    if (last && last.time === time) {
      last.to = d;
      last.days = `${DAYS[last.from]}–${DAYS[d]}`;
    } else {
      rows.push({ days: DAYS[d], time, from: d, to: d });
    }
  }
  return rows;
};

export const hoursSummary = () =>
  hoursRows()
    .map((r) => `${r.days} ${r.time}`)
    .join(' · ');

export const address = `${business.street}, ${business.neighborhood}, ${business.region} ${business.zip}`;
