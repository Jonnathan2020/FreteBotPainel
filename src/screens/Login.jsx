import { useState } from "react";
import { login } from "../api/authApi";
import { isLight } from "../utils";

export default function Login({ onSuccess, onIrParaCadastro }) {
  const [email, setEmail]     = useState("");
  const [senha, setSenha]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const brand = "#22c55e";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) { setError("Preencha e-mail e senha."); return; }
    setLoading(true);
    setError(null);
    try {
      await login(email.trim(), senha);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", background: "#222",
    border: "1px solid rgba(255,255,255,0.13)", borderRadius: 8,
    color: "#f0f0f0", fontSize: 13, padding: "10px 12px",
    outline: "none", fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ width: "100%", maxWidth: 380, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "36px 32px" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚚</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f0f0", letterSpacing: "-.3px" }}>Painel de Fretes</div>
            <div style={{ fontSize: 11, color: "#888" }}>LogTrans</div>
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, color: "#f0f0f0", marginBottom: 4 }}>Entrar</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 24 }}>Acesse sua conta para continuar</div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 10, color: "#888", marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: .4 }}>E-mail</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 10, color: "#888", marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: .4 }}>Senha</label>
            <input type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} autoComplete="current-password" style={inputStyle} />
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#ef4444", display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠</span> {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ marginTop: 4, background: loading ? "#333" : brand, border: "none", borderRadius: 8, color: loading ? "#666" : (isLight(brand) ? "#000" : "#fff"), fontSize: 13, fontWeight: 600, padding: "11px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background .2s" }}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Link para cadastro */}
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "#888" }}>
          Não tem uma conta?{" "}
          <button onClick={onIrParaCadastro} style={{ background: "none", border: "none", color: brand, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}
