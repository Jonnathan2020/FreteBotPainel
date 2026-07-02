import { isLight } from "../utils";

/**
 * Search input, status dropdown and date range filters.
 */
export function FilterBar({
  search, onSearch,
  filterStatus, onFilterStatus,
  dateFrom, dateTo, onDateFrom, onDateTo,
  activeQuick, onQuick, onClearDates, onClearAll,
  color,
}) {
  const inputBase = {
    background: "var(--surface)", border: "1px solid var(--border2)",
    borderRadius: 6, color: "var(--text)", outline: "none", fontFamily: "inherit",
  };

  const qBtn = (q) => ({
    background: activeQuick === q ? color : "none",
    border: `1px solid ${activeQuick === q ? color : "var(--border2)"}`,
    color: activeQuick === q ? (isLight(color) ? "#000" : "#fff") : "var(--text2)",
    borderRadius: 6, padding: "4px 10px", fontSize: 11,
    cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
    fontWeight: activeQuick === q ? 600 : 400,
  });

  return (
    <>
      {/* Search + Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "var(--text3)", pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por ID, rota ou tipo..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            style={{ ...inputBase, width: "100%", fontSize: 12, padding: "7px 10px 7px 30px" }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => onFilterStatus(e.target.value)}
          style={{ ...inputBase, padding: "7px 10px", fontSize: 11, cursor: "pointer" }}
        >
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="transito">Em Trânsito</option>
        </select>
        <button
          onClick={onClearAll}
          style={{ background: "none", border: "1px solid var(--border)", color: "var(--text3)", borderRadius: 6, padding: "7px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
        >✕ Limpar tudo</button>
      </div>

      {/* Date range */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 500, whiteSpace: "nowrap" }}>📅 Período:</span>
        <input type="date" value={dateFrom} onChange={(e) => onDateFrom(e.target.value)} style={{ ...inputBase, padding: "5px 8px", fontSize: 12, fontFamily: "monospace", cursor: "pointer" }} />
        <span style={{ fontSize: 11, color: "var(--text3)" }}>até</span>
        <input type="date" value={dateTo} onChange={(e) => onDateTo(e.target.value)} style={{ ...inputBase, padding: "5px 8px", fontSize: 12, fontFamily: "monospace", cursor: "pointer" }} />
        <div style={{ display: "flex", gap: 6, marginLeft: "auto", flexWrap: "wrap" }}>
          {[["today","Hoje"],["7","7 dias"],["15","15 dias"],["30","30 dias"],["month","Este mês"]].map(([q, label]) => (
            <button key={q} onClick={() => onQuick(q)} style={qBtn(q)}>{label}</button>
          ))}
        </div>
        <button
          onClick={onClearDates}
          style={{ background: "none", border: "1px solid var(--border)", color: "var(--text3)", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
        >✕ Limpar datas</button>
      </div>
    </>
  );
}
