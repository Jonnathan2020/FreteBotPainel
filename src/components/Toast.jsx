import { useEffect } from "react";

/**
 * Auto-dismissing toast notification.
 * @param {{ msg: string, color: string, onHide: () => void }} props
 */
export function Toast({ msg, color, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 2800);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <div
      style={{
        position: "fixed", bottom: 24, right: 24,
        background: "var(--surface)", border: `1px solid ${color}`,
        borderRadius: 10, padding: "11px 18px", fontSize: 12, zIndex: 300,
        display: "flex", alignItems: "center", gap: 8,
        color: "var(--text)", boxShadow: "0 4px 20px rgba(0,0,0,.3)",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {msg}
    </div>
  );
}
