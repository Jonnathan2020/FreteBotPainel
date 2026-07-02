import { useState, useEffect, useCallback } from "react";
import { listarFretes } from "../api/freteApi";
import { mapApiFreteToUi } from "../utils";

/**
 * Busca fretes reais da API.
 * Não usa dados mock — se a API falhar, expõe o erro para a UI tratar.
 *
 * @returns {{ fretes, setFretes, loading, error, reload }}
 */
export function useFretes() {
  const [fretes, setFretes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarFretes();
      // A API pode retornar array direto ou { content: [] } (paginado)
      const lista = Array.isArray(data) ? data : (data.content ?? []);
      setFretes(lista.map(mapApiFreteToUi));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { fretes, setFretes, loading, error, reload: load };
}
