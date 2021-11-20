// Vetor que contém um lista com os processos de cada pedido
const getOrderProcessArray = (): string[] => {
  return [
    'Iniciando',
    'Visita Inicial',
    'Modelagem 3D',
    'Elaboração do Contrato',
    'Conferência do Projeto no Ambiente',
    'Pedido na Fábrica',
    'Em Instalação',
    'Averiguar a Instalação',
    'Reunião com o(s) Montador(es)',
    'Projeto Finalizado',
  ];
}

export default getOrderProcessArray;
