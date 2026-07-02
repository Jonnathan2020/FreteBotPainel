import { Badge } from "./Badge";
import { fmtDate, fmtCurrency, isLight } from "../utils";

/**
 * Table listing all fretes with inline confirm action for pending ones.
 */
export function FreteTable({ fretes, config, onSetInput, onConfirmar }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflowX: "auto", width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 750 }}>
        <thead>
          <tr>
            {["ID", "Rota / Detalhes", "Data", "Status", "Valor", "Ação"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left", padding: "10px 14px", fontSize: 10,
                  fontWeight: 600, color: "var(--text3)", textTransform: "uppercase",
                  letterSpacing: 0.6, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap",
                }}
              >{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fretes.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 36, color: "var(--text3)", fontSize: 12 }}>
                Nenhum frete encontrado para este filtro.
              </td>
            </tr>
          ) : fretes.map((f, i) => (
            <tr key={f.id} style={{ borderBottom: i < fretes.length - 1 ? "1px solid var(--border)" : "none" }}>
              <td style={{ padding: "11px 14px" }}>
                <span style={{ fontFamily: "monospace", color: "var(--text2)", fontSize: 11, whiteSpace: "nowrap" }}>{f.id}</span>
              </td>
              <td style={{ padding: "11px 14px" }}>
                <div style={{ fontWeight: 500 }}>{f.rota}</div>
                <div style={{ fontSize: 10, color: "var(--text2)", marginTop: 2 }}>{f.tipo} · {f.volume}</div>
              </td>
              <td style={{ padding: "11px 14px" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text2)", whiteSpace: "nowrap" }}>{fmtDate(f.date)}</span>
              </td>
              <td style={{ padding: "11px 14px" }}>
                <Badge status={f.status} brand={config.color} />
              </td>
              <td style={{ padding: "11px 14px" }}>
                {f.valor != null
                  ? <span style={{ fontFamily: "monospace", fontWeight: 500, whiteSpace: "nowrap" }}>{fmtCurrency(f.valor)}</span>
                  : <span style={{ color: "var(--text3)", fontStyle: "italic" }}>— aguardando</span>}
              </td>
              <td style={{ padding: "11px 14px" }}>
                {f.status === "pendente" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <input
                      type="text"
                      placeholder="0,00"
                      value={f.input}
                      onChange={(e) => onSetInput(f.id, e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && onConfirmar(f.id)}
                      style={{
                        width: 75, background: "var(--surface2)", border: "1px solid var(--border2)",
                        borderRadius: 6, color: "var(--text)", fontFamily: "monospace",
                        fontSize: 11, padding: "4px 7px", outline: "none",
                      }}
                    />
                    <button
                      onClick={() => onConfirmar(f.id)}
                      style={{
                        background: config.color, border: "none", borderRadius: 6,
                        color: isLight(config.color) ? "#000" : "#fff",
                        fontSize: 11, fontWeight: 600, padding: "5px 12px",
                        cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
                      }}
                    >Confirmar</button>
                  </div>
                ) : (
                  <span style={{ fontSize: 11, color: "var(--text3)" }}>
                    {f.status === "transito" ? "Em rota" : "Concluído"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
