const YM_ID = process.env.REACT_APP_YM_ID;
const GA_ID = process.env.REACT_APP_GA_ID;

export function initAnalytics() {
  if (YM_ID && !window.ym) {
    window.ym = function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(s);
    window.ym(Number(YM_ID), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true });
  }
  if (GA_ID && !window.gtag) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }
}

export function track(event, params = {}) {
  try {
    if (YM_ID && window.ym) window.ym(Number(YM_ID), "reachGoal", event, params);
    if (GA_ID && window.gtag) window.gtag("event", event, params);
    if (window.posthog?.capture) window.posthog.capture(event, params);
  } catch {
    /* analytics must never break the app */
  }
}
