import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Phone, Send, RefreshCw, LogOut, Trash2, Inbox } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;
const ax = axios.create({ baseURL: API, withCredentials: true });

const STATUS_STYLES = {
  new: "bg-taxi text-black",
  contacted: "bg-blue-500/20 text-blue-300 border border-blue-400/40",
  closed: "bg-white/10 text-white/50 border border-white/15",
};

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await ax.post("/api/auth/login", { email, password });
      if (data.token) ax.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      onLogin(data);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <form onSubmit={submit} data-testid="admin-login-form" className="w-full max-w-sm border border-white/10 bg-[#0b0b0b] p-8">
        <div className="font-display text-white text-3xl tracking-tighter">
          <span className="text-taxi">999</span> Admin
        </div>
        <p className="mt-2 text-white/50 text-sm">Leads dashboard</p>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          data-testid="admin-email-input"
          className="mt-6 w-full bg-[#0e0e0e] border border-white/15 text-white px-4 py-3.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-taxi"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          data-testid="admin-password-input"
          className="mt-3 w-full bg-[#0e0e0e] border border-white/15 text-white px-4 py-3.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-taxi"
        />
        {error && <p className="mt-3 text-red-400 text-xs" data-testid="admin-login-error">{error}</p>}
        <button type="submit" disabled={busy} data-testid="admin-login-submit" className="mt-5 w-full bg-taxi text-black font-extrabold px-6 py-3.5 hover:bg-[#ffe04d] disabled:opacity-50">
          {busy ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}

function LeadsTable({ user, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const { data } = await ax.get("/api/leads", { params: filter ? { status: filter } : {} });
      setLeads(data);
    } catch {
      /* session may have expired; table stays */
    } finally {
      setBusy(false);
    }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (id, status) => {
    await ax.patch(`/api/leads/${id}`, { status });
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await ax.delete(`/api/leads/${id}`);
    setLeads((ls) => ls.filter((l) => l.id !== id));
  };

  const logout = async () => {
    try { await ax.post("/api/auth/logout"); } catch { /* ignore */ }
    delete ax.defaults.headers.common["Authorization"];
    onLogout();
  };

  const counts = leads.reduce((a, l) => ({ ...a, [l.status]: (a[l.status] || 0) + 1 }), {});

  return (
    <div className="min-h-screen px-5 md:px-10 py-8 max-w-[1300px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-display text-white text-3xl tracking-tighter"><span className="text-taxi">999</span> Leads</div>
          <p className="text-white/40 text-xs mt-1">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} data-testid="admin-status-filter" className="bg-[#0e0e0e] border border-white/15 text-white text-sm px-3 py-2.5 focus:outline-none focus:border-taxi">
            <option value="">All ({leads.length})</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
          <button onClick={load} data-testid="admin-refresh" className="border border-white/15 text-white p-2.5 hover:border-taxi hover:text-taxi" title="Refresh">
            <RefreshCw size={16} className={busy ? "animate-spin" : ""} />
          </button>
          <button onClick={logout} data-testid="admin-logout" className="border border-white/15 text-white p-2.5 hover:border-red-400 hover:text-red-400" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-3 text-xs text-white/50">
        <span data-testid="admin-count-new">New: <b className="text-taxi">{counts.new || 0}</b></span>
        <span>Contacted: <b className="text-white/80">{counts.contacted || 0}</b></span>
        <span>Closed: <b className="text-white/80">{counts.closed || 0}</b></span>
      </div>

      {leads.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-white/40" data-testid="admin-empty">
          <Inbox size={40} className="mb-3" />
          No leads yet
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto border border-white/10">
          <table className="w-full text-sm" data-testid="admin-leads-table">
            <thead>
              <tr className="bg-white/[0.04] text-white/50 text-xs font-mono-accent">
                <th className="text-left px-4 py-3">DATE</th>
                <th className="text-left px-4 py-3">TYPE</th>
                <th className="text-left px-4 py-3">NAME</th>
                <th className="text-left px-4 py-3">PHONE</th>
                <th className="text-left px-4 py-3">TELEGRAM</th>
                <th className="text-left px-4 py-3">CAR/LIC</th>
                <th className="text-left px-4 py-3">SOURCE</th>
                <th className="text-left px-4 py-3">STATUS</th>
                <th className="px-2 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} data-testid={`admin-lead-row-${l.id}`} className="border-t border-white/5 text-white/80 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 whitespace-nowrap text-white/50 text-xs">{new Date(l.created_at).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 ${l.type === "callback" ? "bg-redb/20 text-red-300" : "bg-white/10"}`}>{l.type}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-white">{l.name || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 text-taxi hover:underline"><Phone size={12} />{l.phone}</a>
                  </td>
                  <td className="px-4 py-3">
                    {l.telegram ? (
                      <a href={`https://t.me/${l.telegram.replace("@", "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-taxi"><Send size={12} />{l.telegram}</a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/50">{l.car || "—"}/{l.license || "—"}</td>
                  <td className="px-4 py-3 text-xs text-white/50">{l.source || "—"}{l.note ? <div className="text-white/40 max-w-[160px] truncate" title={l.note}>{l.note}</div> : null}</td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      onChange={(e) => setStatus(l.id, e.target.value)}
                      data-testid={`admin-lead-status-${l.id}`}
                      className={`text-xs font-bold px-2 py-1.5 focus:outline-none cursor-pointer ${STATUS_STYLES[l.status]}`}
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                  </td>
                  <td className="px-2 py-3">
                    <button onClick={() => remove(l.id)} data-testid={`admin-lead-delete-${l.id}`} className="text-white/30 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    ax.get("/api/auth/me").then(({ data }) => setUser(data)).catch(() => setUser(false));
  }, []);

  if (user === null) {
    return <div className="min-h-screen flex items-center justify-center text-white/40 font-mono-accent text-xs">LOADING…</div>;
  }
  return (
    <div className="min-h-screen bg-[#050505] font-body">
      {user ? <LeadsTable user={user} onLogout={() => setUser(false)} /> : <LoginForm onLogin={setUser} />}
    </div>
  );
}
