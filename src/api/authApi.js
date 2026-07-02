const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

/**
 * Autentica o usuário e armazena o JWT no localStorage.
 * @param {string} email
 * @param {string} senha
 */
export async function login(email, senha) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || body.error || "Credenciais inválidas.");
  }

  const data = await response.json();
  const token = data.token || data.accessToken;
  if (!token) throw new Error("Token não encontrado na resposta da API.");

  localStorage.setItem("token", token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

/**
 * Cadastra um novo usuário.
 * @param {{ nome: string, email: string, senha: string, telefone: string, tipo: string }} dados
 */
export async function registrar({ nome, email, senha, telefone, tipo }) {
  const response = await fetch(`${BASE_URL}/usuario/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha, telefone, tipo }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || body.error || "Erro ao realizar cadastro.");
  }

  // Alguns backends retornam 201 sem body
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}
