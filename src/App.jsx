import { useState } from "react";
import { isAuthenticated } from "./api/authApi";
import Login    from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import PainelFretes from "./screens/PainelFretes";

// Telas possíveis: "login" | "cadastro" | "painel"
function telaInicial() {
  return isAuthenticated() ? "painel" : "login";
}

export default function App() {
  const [tela, setTela] = useState(telaInicial);

  if (tela === "login") {
    return (
      <Login
        onSuccess={() => setTela("painel")}
        onIrParaCadastro={() => setTela("cadastro")}
      />
    );
  }

  if (tela === "cadastro") {
    return (
      <Cadastro
        onCadastroOk={() => setTela("login")}
        onIrParaLogin={() => setTela("login")}
      />
    );
  }

  return (
    <PainelFretes
      onLogout={() => setTela("login")}
    />
  );
}
