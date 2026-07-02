import { useState } from "react";
import { registrar } from "../api/authApi";
import { isLight } from "../utils";

const TIPOS = [
  { value: "ADMIN",      label: "Administrador" },
  { value: "OPERADOR",   label: "Operador" },
  { value: "MOTORISTA",  label: "Motorista" },
];

export default function Cadastro({ onCadastroOk, onIrParaLogin }) {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmarSenha: "", telefone: "", tipo: "ADMIN" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const brand = "#22c55e";
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function validar() {
    if (!form.nome.trim())          return "Informe o nome completo.";
    if (!form.email.trim())         return "Informe o e-mail.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "E-mail inválido.";
    if (form.senha.length < 6)      return "A senha deve ter pelo menos 6 caracteres.";
    if (form.senha !== form.confirmarSenha) return "As senhas não coincidem.";
    if (!form.telefone.trim())      return "Informe o telefone.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const erro = validar();
    if (erro) { setError(erro); return; }

    setLoading(true);
    setError(null);
    try {
      await registrar({
        nome:     form.nome.trim(),
        email:    form.email.trim(),
        senha:    form.senha,
        telefone: form.telefone.trim(),
        tipo:     form.tipo,
      });
      setSucesso(true);
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
  const labelStyle = {
    display: "block", fontSize: 10, color: "#888",
    marginBottom: 6, fontWeight: 500,
    textTransform: "uppercase", letterSpacing: .4,
  };

  // ── Tela de sucesso ──────────────────────────────────────────────────────
  if (sucesso) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
        <div style={{ width: "100%", maxWidth: 380, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#f0f0f0", marginBottom: 8 }}>Cadastro realizado!</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
            Sua conta foi criada com sucesso. Faça login para acessar o painel.
          </div>
          <button
            onClick={onCadastroOk}
            style={{ background: brand, border: "none", borderRadius: 8, color: isLight(brand) ? "#000" : "#fff", fontSize: 13, fontWeight: 600, padding: "11px 28px", cursor: "pointer", fontFamily: "inherit" }}
          >
            Ir para o login
          </button>
        </div>
      </div>
    );
  }

  // ── Formulário ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ width: "100%", maxWidth: 420, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "36px 32px" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚚</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f0f0", letterSpacing: "-.3px" }}>Painel de Fretes</div>
            <div style={{ fontSize: 11, color: "#888" }}>LogTrans</div>
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, color: "#f0f0f0", marginBottom: 4 }}>Criar conta</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 24 }}>Preencha os dados para se cadastrar</div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Nome */}
          <div>
            <label style={labelStyle}>Nome completo</label>
            <input
              type="text" placeholder="João da Silva"
              value={form.nome} onChange={e => set("nome", e.target.value)}
              autoComplete="name" style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email" placeholder="seu@email.com"
              value={form.email} onChange={e => set("email", e.target.value)}
              autoComplete="email" style={inputStyle}
            />
          </div>

          {/* Telefone */}
          <div>
            <label style={labelStyle}>Telefone</label>
            <input
              type="tel" placeholder="(11) 99999-9999"
              value={form.telefone} onChange={e => set("telefone", e.target.value)}
              autoComplete="tel" style={inputStyle}
            />
          </div>

          {/* Tipo */}
          <div>
            <label style={labelStyle}>Tipo de usuário</label>
            <select value={form.tipo} onChange={e => set("tipo", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Senha */}
          <div>
            <label style={labelStyle}>Senha</label>
            <input
              type="password" placeholder="Mínimo 6 caracteres"
              value={form.senha} onChange={e => set("senha", e.target.value)}
              autoComplete="new-password" style={inputStyle}
            />
          </div>

          {/* Confirmar senha */}
          <div>
            <label style={labelStyle}>Confirmar senha</label>
            <input
              type="password" placeholder="Repita a senha"
              value={form.confirmarSenha} onChange={e => set("confirmarSenha", e.target.value)}
              autoComplete="new-password" style={inputStyle}
            />
            {/* Indicador de senhas coincidindo */}
            {form.confirmarSenha && (
              <div style={{ marginTop: 5, fontSize: 11, color: form.senha === form.confirmarSenha ? brand : "#ef4444" }}>
                {form.senha === form.confirmarSenha ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
              </div>
            )}
          </div>

          {/* Erro */}
          {error && (
            <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#ef4444", display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{ marginTop: 4, background: loading ? "#333" : brand, border: "none", borderRadius: 8, color: loading ? "#666" : (isLight(brand) ? "#000" : "#fff"), fontSize: 13, fontWeight: 600, padding: "11px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background .2s" }}
          >
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>
        </form>

        {/* Link para login */}
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "#888" }}>
          Já tem uma conta?{" "}
          <button onClick={onIrParaLogin} style={{ background: "none", border: "none", color: brand, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
