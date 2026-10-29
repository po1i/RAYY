import { smsHref, consultText } from '../data/helpers';

/**
 * The visitor's chosen treatment follows them: once picked in the finder or
 * on a treatment page, every "Text us" link and the call-back form are
 * pre-filled with it, so nobody has to explain themselves twice.
 */
const KEY = 'rayy:topic';

export const getTopic = (): string => {
  try {
    return sessionStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
};

const apply = (topic: string) => {
  document.querySelectorAll<HTMLAnchorElement>('a[data-sms]').forEach((a) => {
    const t = topic || a.dataset.smsBase || '';
    a.href = smsHref(consultText(t));
  });
  document.dispatchEvent(new CustomEvent('topic:change', { detail: topic }));
};

export const setTopic = (topic: string) => {
  try {
    sessionStorage.setItem(KEY, topic);
  } catch {
    /* storage blocked: the in-page update below still works */
  }
  apply(topic);
};

export const initTopic = () => {
  const t = getTopic();
  if (t) apply(t);
};
