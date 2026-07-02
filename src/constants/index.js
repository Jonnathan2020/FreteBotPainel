export const PRESETS = [
  "#22c55e","#3b82f6","#f59e0b","#ef4444","#a855f7",
  "#ec4899","#14b8a6","#f97316","#6366f1","#e2e8f0",
];

export const STATUS_LABEL = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  transito: "Em Trânsito",
  PENDENTE: "Pendente",
  CONFIRMADO: "Confirmado",
  EM_TRANSITO: "Em Trânsito",
};

export const DEFAULT_CONFIG = {
  nome: "Painel de Fretes",
  empresa: "LogTrans",
  logoUrl: "",
  color: "#22c55e",
  refresh: "0",
};

function rndDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

export const INITIAL_FRETES = [
  { id:"FRT-001", rota:"São Paulo → Rio de Janeiro", tipo:"Carga Geral", volume:"1.200 kg", status:"pendente", valor:null, input:"", date:rndDate(0) },
  { id:"FRT-002", rota:"Curitiba → Porto Alegre", tipo:"Refrigerado", volume:"800 kg", status:"confirmado", valor:2850, input:"", date:rndDate(1) },
  { id:"FRT-003", rota:"Belo Horizonte → Salvador", tipo:"Carga Geral", volume:"2.100 kg", status:"transito", valor:4200, input:"", date:rndDate(3) },
  { id:"FRT-004", rota:"Fortaleza → Recife", tipo:"Fracionado", volume:"340 kg", status:"pendente", valor:null, input:"", date:rndDate(5) },
  { id:"FRT-005", rota:"Manaus → Belém", tipo:"Carga Geral", volume:"950 kg", status:"confirmado", valor:5600, input:"", date:rndDate(8) },
  { id:"FRT-006", rota:"Goiânia → Brasília", tipo:"Fracionado", volume:"210 kg", status:"pendente", valor:null, input:"", date:rndDate(12) },
  { id:"FRT-007", rota:"Recife → Salvador", tipo:"Carga Geral", volume:"1.800 kg", status:"confirmado", valor:3100, input:"", date:rndDate(15) },
  { id:"FRT-008", rota:"Porto Alegre → Florianópolis", tipo:"Refrigerado", volume:"600 kg", status:"transito", valor:1800, input:"", date:rndDate(20) },
];
