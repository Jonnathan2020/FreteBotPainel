import { useState } from "react";
import { PRESETS } from "../constants";
import { isLight } from "../utils";

/**
 * Modal for customising panel appearance and behaviour.
 * @param {{ config: Object, onClose: () => void, onSave: (form: Object) => void }} props
 */
export function ConfigModal({ config, onClose, onSave }) {
  const [form, setForm] = useState({ ...config });
  const [pendingColor, setPendingColor] = useState(config.color);
  const [logoPreview, setLogoPreview] = useState(config.logoUrl);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", background: "var(--surface2)",
    border: "1px solid var(--border2)", borderRadius: 6,
    color: "var(--text)", fontSize: 13, padding: "7px 9px",
    outline: "none", fontFamily: "inherit",
  };
  const labelStyle = {
    display: "block", fontSize: 10, color: "var(--text2)",
    marginBottom: 5, fontWeight: 500,
    textTransform: "uppercase", letterSpacing: 0.4,
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--surface)", border: "1px solid var(--border2)",
          borderRadius: 14, width: "100%", maxWidth: 440, padding: 24,
          position: "relative", maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "var(--text2)", fontSize: 16, cursor: "pointer" }}
        >✕</button>

        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3, color: "var(--text)" }}>Configurações</div>
        <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 18 }}>Personalize o painel de fretes</div>

        {/* Nome do Painel */}
        <div style={{ marginBottom: 13 }}>
          <label style={labelStyle}>Nome do Painel</label>
          <input value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Ex: Painel de Fretes" style={inputStyle} />
        </div>

        {/* Empresa */}
        <div style={{ marginBottom: 13 }}>
          <label style={labelStyle}>Empresa</label>
          <input value={form.empresa} onChange={(e) => set("empresa", e.target.value)} placeholder="Nome da empresa" style={inputStyle} />
        </div>

        {/* Logo URL */}
        <div style={{ marginBottom: 13 }}>
          <label style={labelStyle}>URL da Logo</label>
          <input
            value={form.logoUrl}
            onChange={(e) => { set("logoUrl", e.target.value); setLogoPreview(e.target.value); }}
            placeholder="https://exemplo.com/logo.png"
            style={inputStyle}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: 8, background: pendingColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, overflow: "hidden", flexShrink: 0, border: "1px solid var(--border2)",
              }}
            >
              {logoPreview
                ? <img src={logoPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => (e.target.style.display = "none")} />
                : "🚚"}
            </div>
            <span style={{ fontSize: 11, color: "var(--text2)" }}>Prévia da logo</span>
          </div>
        </div>

        {/* Cor de Destaque */}
        <div style={{ marginBottom: 13 }}>
          <label style={labelStyle}>Cor de Destaque</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
            {PRESETS.map((c) => (
              <div
                key={c}
                onClick={() => setPendingColor(c)}
                style={{
                  width: 26, height: 26, borderRadius: "50%", background: c, cursor: "pointer",
                  flexShrink: 0, transition: "transform .15s",
                  border: c === pendingColor ? "2px solid var(--text)" : c === "#e2e8f0" ? "2px solid #555" : "2px solid transparent",
                  transform: c === pendingColor ? "scale(1.1)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="color" value={pendingColor}
              onChange={(e) => setPendingColor(e.target.value)}
              style={{ width: 32, height: 32, border: "1px solid var(--border2)", borderRadius: 6, padding: 2, background: "var(--surface2)", cursor: "pointer" }}
            />
            <span style={{ fontSize: 11, color: "var(--text2)" }}>Personalizada</span>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text2)" }}>{pendingColor}</span>
          </div>
        </div>

        {/* Atualização Automática */}
        <div style={{ marginBottom: 13 }}>
          <label style={labelStyle}>Atualização Automática</label>
          <select value={form.refresh} onChange={(e) => set("refresh", e.target.value)} style={inputStyle}>
            <option value="0">Desativado</option>
            <option value="30">A cada 30 segundos</option>
            <option value="60">A cada 1 minuto</option>
            <option value="300">A cada 5 minutos</option>
          </select>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 18, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ background: "none", border: "1px solid var(--border2)", color: "var(--text2)", borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
          >Cancelar</button>
          <button
            onClick={() => onSave({ ...form, color: pendingColor })}
            style={{ background: pendingColor, border: "none", color: isLight(pendingColor) ? "#000" : "#fff", borderRadius: 6, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >Salvar</button>
        </div>
      </div>
    </div>
  );
}
