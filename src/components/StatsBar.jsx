/**
 * Three-card summary showing counts by status.
 */
export function StatsBar({ fretes, color }) {
  const pendentes   = fretes.filter((f) => f.status === "pendente").length;
  const confirmados = fretes.filter((f) => f.status === "confirmado").length;
  const transito    = fretes.filter((f) => f.status === "transito").length;

  const cards = [
    { label: "Pendentes",   value: pendentes,   color: "#f59e0b" },
    { label: "Confirmados", value: confirmados, color },
    { label: "Em Trânsito", value: transito,    color: "#3b82f6" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
      {cards.map(({ label, value, color: c }) => (
        <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 10, color: "var(--text2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -1, fontFamily: "monospace", color: c }}>{value}</div>
        </div>
      ))}
    </div>
  );
}
