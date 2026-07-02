import { STATUS_LABEL } from "../constants";

/**
 * Status badge pill shown in each frete row.
 * @param {{ status: string, brand: string }} props
 */
export function Badge({ status, brand }) {
  const colors = {
    pendente:   { bg: "rgba(245,158,11,.12)", color: "#f59e0b" },
    confirmado: { bg: "rgba(34,197,94,.1)",   color: brand },
    transito:   { bg: "rgba(59,130,246,.1)",  color: "#3b82f6" },
  };
  const c = colors[status] ?? colors.pendente;

  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        fontSize: 10, fontWeight: 600, padding: "3px 9px",
        borderRadius: 20, background: c.bg, color: c.color, whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: c.color }} />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
