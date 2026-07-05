export function submitLead(payload) {
  try {
    const lang = localStorage.getItem("lang999") || "uz";
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, ...payload }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* lead saving must never block the Telegram flow */
  }
}
