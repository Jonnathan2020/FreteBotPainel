import { apiClient } from "./apiClient";

/**
 * Lista todos os fretes da API.
 * @param {Object} params - Filtros opcionais (status, dataInicio, dataFim, etc.)
 */
export async function listarFretes(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== "" && v != null)
  ).toString();
  return apiClient.get(`/fretes${query ? `?${query}` : ""}`);
}

/**
 * Busca um frete por ID.
 * @param {number} id
 */
export async function buscarFretePorId(id) {
  return apiClient.get(`/fretes/${id}`);
}

/**
 * Confirma um frete e define o valor.
 * @param {number} id
 * @param {number} valor
 */
export async function confirmarFrete(id, valor) {
  return apiClient.patch(`/fretes/${id}/confirmar`, { valor });
}

/**
 * Atualiza campos gerais de um frete.
 * @param {number} id
 * @param {Object} dados
 */
export async function atualizarFrete(id, dados) {
  return apiClient.put(`/fretes/${id}`, dados);
}

/**
 * Atualiza apenas o status de um frete.
 * @param {number} id
 * @param {string} status
 */
export async function atualizarStatusFrete(id, status) {
  return apiClient.patch(`/fretes/${id}/status`, { status });
}
