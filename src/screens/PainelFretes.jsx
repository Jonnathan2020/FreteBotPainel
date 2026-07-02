import { useState, useRef, useEffect } from "react";
import { ConfigModal, FilterBar, FreteTable, StatsBar, Toast, LogoIcon } from "../components";
import { useClock } from "../hooks/useClock";
import { useFretes } from "../hooks/useFretes";
import { DEFAULT_CONFIG } from "../constants";
import { fmtCurrency, isLight, todayISO, daysAgoISO, firstOfMonthISO } from "../utils";
import { confirmarFrete } from "../api/freteApi";
import { logout } from "../api/authApi";

export default function PainelFretes({ onLogout }) {
  const { fretes, setFretes, loading, error, reload } = useFretes();

  const [config, setConfig]           = useState(DEFAULT_CONFIG);
  const [darkMode, setDarkMode]       = useState(true);
  const [showConfig, setShowConfig]   = useState(false);
  const [toast, setToast]             = useState(null);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dateFrom, setDateFrom]       = useState("");
  const [dateTo, setDateTo]           = useState("");
  const [activeQuick, setActiveQuick] = useState(null);
  const refreshRef = useRef(null);
  const now = useClock();

  // ─── CSS variables ────────────────────────────────────────────────────────
  const vars = darkMode
    ? { "--brand": config.color, "--bg": "#0f0f0f", "--surface": "#1a1a1a", "--surface2": "#222", "--border": "rgba(255,255,255,0.07)", "--border2": "rgba(255,255,255,0.13)", "--text": "#f0f0f0", "--text2": "#888", "--text3": "#555" }
    : { "--brand": config.color, "--bg": "#f5f5f5", "--surface": "#ffffff", "--surface2": "#efefef", "--border": "rgba(0,0,0,0.08)", "--border2": "rgba(0,0,0,0.15)", "--text": "#111", "--text2": "#666", "--text3": "#aaa" };

  // ─── Quick date shortcuts ─────────────────────────────────────────────────
  function handleQuick(q) {
    setActiveQuick(q);
    const today = todayISO();
    if (q === "today")      { setDateFrom(today); setDateTo(today); }
    else if (q === "month") { setDateFrom(firstOfMonthISO()); setDateTo(today); }
    else                    { setDateFrom(daysAgoISO(parseInt(q))); setDateTo(today); }
  }

  function clearDates() { setDateFrom(""); setDateTo(""); setActiveQuick(null); }
  function clearAll()   { setSearch(""); setFilterStatus(""); clearDates(); }

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filtered = fretes.filter((f) => {
    const q = search.toLowerCase();
    const matchQ = !q || f.id.toLowerCase().includes(q) || f.rota.toLowerCase().includes(q) || f.tipo.toLowerCase().includes(q);
    const matchS = !filterStatus || f.status === filterStatus;
    let matchD = true;
    if (dateFrom && dateTo)  matchD = f.date >= dateFrom && f.date <= dateTo;
    else if (dateFrom)       matchD = f.date >= dateFrom;
    else if (dateTo)         matchD = f.date <= dateTo;
    return matchQ && matchS && matchD;
  });

  // ─── Confirmar frete ─────────────────────────────────────────────────────
  function setInput(id, val) {
    setFretes((fs) => fs.map((f) => f.id === id ? { ...f, input: val } : f));
  }

  async function handleConfirmar(id) {
    const frete = fretes.find((f) => f.id === id);
    const num   = parseFloat(frete.input.replace(",", "."));
    if (!frete.input.trim() || isNaN(num) || num <= 0) {
      setToast("Informe um valor válido.");
      return;
    }

    // Atualização otimista
    setFretes((fs) => fs.map((f) => f.id === id ? { ...f, status: "confirmado", valor: num, input: "" } : f));
    setToast(`Frete ${id} confirmado com ${fmtCurrency(num)}`);

    if (frete._raw?.idFrete) {
      try {
        await confirmarFrete(frete._raw.idFrete, num);
      } catch (err) {
        setToast(`Erro ao salvar no servidor: ${err.message}`);
      }
    }
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  function handleLogout() {
    logout();
    onLogout();
  }

  // ─── Config + auto-refresh ────────────────────────────────────────────────
  function saveConfig(form) {
    setConfig(form);
    setShowConfig(false);
    setToast("Configurações salvas!");
    clearInterval(refreshRef.current);
    const secs = parseInt(form.refresh);
    if (secs > 0) {
      refreshRef.current = setInterval(() => reload(), secs * 1000);
    }
  }

  useEffect(() => () => clearInterval(refreshRef.current), []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ ...vars, fontFamily: "'DM Sans', sans-serif", background: "var(--bg)", color: "var(--text)", minHeight: "100vh", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes spin   { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
      `}</style>

      {/* ── Header ── */}
      <header style={{ height: 54, borderBottom: "1px solid var(--border)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--bg)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoIcon url={config.logoUrl} color={config.color} />
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-.3px" }}>{config.empresa}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: config.color, animation: "pulse 2s infinite" }} />
            Ao vivo
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 10px" }}>
            <span style={{ fontSize: 11, color: "var(--text2)", fontFamily: "monospace" }}>{now.toLocaleDateString("pt-BR")}</span>
            <span style={{ fontSize: 10, color: "var(--text3)" }}>|</span>
            <span style={{ fontSize: 11, color: config.color, fontFamily: "monospace", fontWeight: 500 }}>{now.toLocaleTimeString("pt-BR")}</span>
          </div>
          <button onClick={() => setDarkMode((d) => !d)} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, borderRadius: 6, border: "1px solid var(--border2)", background: "none", cursor: "pointer" }}>
            {darkMode ? "🌙" : "☀️"}
          </button>
          <button onClick={() => setShowConfig(true)} style={{ background: "none", border: "1px solid var(--border2)", color: "var(--text2)", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
            ⚙ Configurar
          </button>
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
            Sair
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px 48px" }}>
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-.4px" }}>{config.nome}</div>
        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 3, marginBottom: 18 }}>
          Gerencie e confirme os fretes pendentes em tempo real.
        </div>

        <StatsBar fretes={fretes} color={config.color} />

        <FilterBar
          search={search}             onSearch={setSearch}
          filterStatus={filterStatus} onFilterStatus={setFilterStatus}
          dateFrom={dateFrom}         onDateFrom={(v) => { setDateFrom(v); setActiveQuick(null); }}
          dateTo={dateTo}             onDateTo={(v) => { setDateTo(v); setActiveQuick(null); }}
          activeQuick={activeQuick}   onQuick={handleQuick}
          onClearDates={clearDates}   onClearAll={clearAll}
          color={config.color}
        />

        {/* Section bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.6 }}>
            Fretes Ativos{" "}
            <span style={{ fontFamily: "monospace", marginLeft: 6, fontSize: 10 }}>
              {loading ? "carregando..." : `${filtered.length} de ${fretes.length}`}
            </span>
          </span>
          <button
            onClick={reload}
            disabled={loading}
            style={{ background: "none", border: "1px solid var(--border)", color: "var(--text2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
          >
            {loading ? "↻ Carregando..." : "↻ Atualizar"}
          </button>
        </div>

        {/* Estado de carregamento */}
        {loading && fretes.length === 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60, gap: 12, color: "var(--text2)", fontSize: 13 }}>
            <span style={{ display: "inline-block", width: 18, height: 18, border: `2px solid ${config.color}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            Buscando fretes...
          </div>
        )}

        {/* Estado de erro */}
        {error && !loading && (
          <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 10, padding: "16px 20px", marginBottom: 16, fontSize: 13, color: "#ef4444", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⚠</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Erro ao carregar fretes</div>
              <div style={{ fontSize: 12, opacity: .8 }}>{error}</div>
            </div>
            <button onClick={reload} style={{ marginLeft: "auto", background: "none", border: "1px solid rgba(239,68,68,.4)", color: "#ef4444", borderRadius: 6, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
              Tentar novamente
            </button>
          </div>
        )}

        {/* Tabela */}
        {!loading || fretes.length > 0 ? (
          <FreteTable
            fretes={filtered}
            config={config}
            onSetInput={setInput}
            onConfirmar={handleConfirmar}
          />
        ) : null}
      </main>

      {showConfig && <ConfigModal config={config} onClose={() => setShowConfig(false)} onSave={saveConfig} />}
      {toast && <Toast msg={toast} color={config.color} onHide={() => setToast(null)} />}
    </div>
  );
}
