export type AtividadeMEI = 'comercio' | 'industria' | 'servicos' | 'comercio-servicos';

export interface ImpostosMEIInput {
  atividade: AtividadeMEI;
  faturamentoMensal: number;
  salarioMinimo?: number; // Opcional, usa valor atual se não informado
}

export interface ImpostosMEIOutput {
  dasValor: number;
  inss: number;
  issqn: number;
  icms: number;
  totalMensal: number;
  totalAnual: number;
  faturamentoAnual: number;
  limiteAnual: number;
  percentualUtilizado: number;
  alertaLimite: boolean;
  memoriaCalculo: {
    salarioMinimo: number;
    aliquotaINSS: number;
    aliquotaISSQN: number;
    aliquotaICMS: number;
  };
}

// Valores 2025 (atualizar anualmente)
const SALARIO_MINIMO_2025 = 1412.00;
const LIMITE_FATURAMENTO_ANUAL = 81000.00;

export function calcularImpostosMEI(input: ImpostosMEIInput): ImpostosMEIOutput {
  const { atividade, faturamentoMensal, salarioMinimo = SALARIO_MINIMO_2025 } = input;

  // Alíquotas fixas
  const aliquotaINSS = 0.05; // 5% do salário mínimo
  const aliquotaISSQN = 5.00; // R$ 5,00 fixo para serviços
  const aliquotaICMS = 1.00; // R$ 1,00 fixo para comércio/indústria

  // Calcular valores
  const inss = salarioMinimo * aliquotaINSS;
  
  let issqn = 0;
  let icms = 0;

  switch (atividade) {
    case 'comercio':
      icms = aliquotaICMS;
      break;
    case 'industria':
      icms = aliquotaICMS;
      break;
    case 'servicos':
      issqn = aliquotaISSQN;
      break;
    case 'comercio-servicos':
      icms = aliquotaICMS;
      issqn = aliquotaISSQN;
      break;
  }

  const dasValor = inss + issqn + icms;
  const totalMensal = dasValor;
  const totalAnual = totalMensal * 12;

  // Verificar limite de faturamento
  const faturamentoAnual = faturamentoMensal * 12;
  const percentualUtilizado = (faturamentoAnual / LIMITE_FATURAMENTO_ANUAL) * 100;
  const alertaLimite = percentualUtilizado > 80;

  return {
    dasValor: Number(dasValor.toFixed(2)),
    inss: Number(inss.toFixed(2)),
    issqn: Number(issqn.toFixed(2)),
    icms: Number(icms.toFixed(2)),
    totalMensal: Number(totalMensal.toFixed(2)),
    totalAnual: Number(totalAnual.toFixed(2)),
    faturamentoAnual: Number(faturamentoAnual.toFixed(2)),
    limiteAnual: LIMITE_FATURAMENTO_ANUAL,
    percentualUtilizado: Number(percentualUtilizado.toFixed(2)),
    alertaLimite,
    memoriaCalculo: {
      salarioMinimo,
      aliquotaINSS: aliquotaINSS * 100,
      aliquotaISSQN: aliquotaISSQN,
      aliquotaICMS: aliquotaICMS
    }
  };
}

export function getDescricaoAtividade(atividade: AtividadeMEI): string {
  const descricoes = {
    'comercio': 'Comércio',
    'industria': 'Indústria',
    'servicos': 'Serviços',
    'comercio-servicos': 'Comércio e Serviços'
  };
  return descricoes[atividade];
}

export function getComposicaoDAS(atividade: AtividadeMEI, salarioMinimo: number = SALARIO_MINIMO_2025): string[] {
  const inss = (salarioMinimo * 0.05).toFixed(2);
  const composicao: string[] = [`INSS: R$ ${inss}`];

  if (atividade === 'servicos' || atividade === 'comercio-servicos') {
    composicao.push('ISSQN: R$ 5,00');
  }

  if (atividade === 'comercio' || atividade === 'industria' || atividade === 'comercio-servicos') {
    composicao.push('ICMS: R$ 1,00');
  }

  return composicao;
}
