// ─── Currency ─────────────────────────────────────────────────────────────
export function fmtCurrency(value) {
  return "R$ " + Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

// ─── Date ─────────────────────────────────────────────────────────────────
export function fmtDate(s) {
  if (!s) return "--";
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y}`;
}
export function todayISO() {
  return new Date().toISOString().split("T")[0];
}
export function daysAgoISO(n) {
  const d = new Date();
  d.setDate(d.getDate() - (n - 1));
  return d.toISOString().split("T")[0];
}
export function firstOfMonthISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

// ─── Color ─────────────────────────────────────────────────────────────────
export function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ─── API adapter ──────────────────────────────────────────────────────────
export function normalizeStatus(apiStatus) {
  const map = { PENDENTE: "pendente", CONFIRMADO: "confirmado", EM_TRANSITO: "transito" };
  return map[apiStatus] ?? apiStatus.toLowerCase();
}

export function mapApiFreteToUi(raw) {
  return {
    id: `FRT-${String(raw.idFrete).padStart(3, "0")}`,
    rota: `${raw.cidadeOrigem} → ${raw.cidadeDestino}`,
    tipo: raw.tipoCarga ?? "Carga Geral",
    volume: raw.pesoTotal != null ? `${raw.pesoTotal.toLocaleString("pt-BR")} kg` : "--",
    status: normalizeStatus(raw.status),
    valor: null,
    input: "",
    date: raw.dataCriacao ? raw.dataCriacao.split("T")[0] : todayISO(),
    _raw: raw,
  };
}
