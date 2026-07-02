/**
 * Displays the company logo or a fallback truck emoji.
 * @param {{ url: string, color: string }} props
 */
export function LogoIcon({ url, color }) {
  if (url) {
    return (
      <div
        style={{
          width: 30, height: 30, borderRadius: 7, overflow: "hidden",
          flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <img
          src={url}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.parentElement.innerHTML = "🚚";
            e.target.parentElement.style.cssText =
              `width:30px;height:30px;border-radius:7px;background:${color};display:flex;align-items:center;justify-content:center;font-size:14px;`;
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: 30, height: 30, borderRadius: 7, background: color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, flexShrink: 0, transition: "background .3s",
      }}
    >
      🚚
    </div>
  );
}
