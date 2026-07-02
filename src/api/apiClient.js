/**
 * Base API client.
 * Automatically attaches the JWT token stored in localStorage to every request.
 */
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  // Token expirado ou inválido → limpa sessão e recarrega para o login
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "Erro desconhecido");
    throw new Error(`Erro ${response.status}: ${errorBody}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const apiClient = {
  get:    (path, options)       => request(path, { method: "GET", ...options }),
  post:   (path, body, options) => request(path, { method: "POST",  body: JSON.stringify(body), ...options }),
  put:    (path, body, options) => request(path, { method: "PUT",   body: JSON.stringify(body), ...options }),
  patch:  (path, body, options) => request(path, { method: "PATCH", body: JSON.stringify(body), ...options }),
  delete: (path, options)       => request(path, { method: "DELETE", ...options }),
};
