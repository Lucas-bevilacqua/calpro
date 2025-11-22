export interface PrecificacaoProjetoInput {
  horasEstimadas: number;
  valorHora: number;
  complexidade: 'baixa' | 'media' | 'alta';
  urgencia: 'normal' | 'urgente' | 'muito-urgente';
  custosMateriais?: number;
  custosExtras?: number;
  margemLucro: number; // Percentual
  descontoVolume?: number; // Percentual (opcional)
}

export interface PrecificacaoProjetoOutput {
  valorBase: number;
  ajusteComplexidade: number;
  ajusteUrgencia: number;
  subtotal: number;
  custosMateriais: number;
  custosExtras: number;
  totalCustos: number;
  margemLucro: number;
  valorBruto: number;
  descontoVolume: number;
  valorFinal: number;
  valorPorHora: number;
  memoriaCalculo: {
    fatorComplexidade: number;
    fatorUrgencia: number;
    percentualMargemReal: number;
  };
}

const FATORES_COMPLEXIDADE = {
  'baixa': 1.0,
  'media': 1.3,
  'alta': 1.6
};

const FATORES_URGENCIA = {
  'normal': 1.0,
  'urgente': 1.3,
  'muito-urgente': 1.6
};

export function calcularPrecificacaoProjeto(input: PrecificacaoProjetoInput): PrecificacaoProjetoOutput {
  const {
    horasEstimadas,
    valorHora,
    complexidade,
    urgencia,
    custosMateriais = 0,
    custosExtras = 0,
    margemLucro,
    descontoVolume = 0
  } = input;

  // Valor base (horas × valor/hora)
  const valorBase = horasEstimadas * valorHora;

  // Ajustes por complexidade e urgência
  const fatorComplexidade = FATORES_COMPLEXIDADE[complexidade];
  const fatorUrgencia = FATORES_URGENCIA[urgencia];

  const ajusteComplexidade = valorBase * (fatorComplexidade - 1);
  const ajusteUrgencia = valorBase * (fatorUrgencia - 1);

  // Subtotal com ajustes
  const subtotal = valorBase + ajusteComplexidade + ajusteUrgencia;

  // Total de custos
  const totalCustos = subtotal + custosMateriais + custosExtras;

  // Margem de lucro
  const valorMargemLucro = totalCustos * (margemLucro / 100);

  // Valor bruto
  const valorBruto = totalCustos + valorMargemLucro;

  // Desconto por volume
  const valorDesconto = valorBruto * (descontoVolume / 100);

  // Valor final
  const valorFinal = valorBruto - valorDesconto;

  // Valor por hora efetivo
  const valorPorHoraEfetivo = valorFinal / horasEstimadas;

  // Margem real (após desconto)
  const percentualMargemReal = ((valorFinal - totalCustos) / totalCustos) * 100;

  return {
    valorBase: Number(valorBase.toFixed(2)),
    ajusteComplexidade: Number(ajusteComplexidade.toFixed(2)),
    ajusteUrgencia: Number(ajusteUrgencia.toFixed(2)),
    subtotal: Number(subtotal.toFixed(2)),
    custosMateriais: Number(custosMateriais.toFixed(2)),
    custosExtras: Number(custosExtras.toFixed(2)),
    totalCustos: Number(totalCustos.toFixed(2)),
    margemLucro: Number(valorMargemLucro.toFixed(2)),
    valorBruto: Number(valorBruto.toFixed(2)),
    descontoVolume: Number(valorDesconto.toFixed(2)),
    valorFinal: Number(valorFinal.toFixed(2)),
    valorPorHora: Number(valorPorHoraEfetivo.toFixed(2)),
    memoriaCalculo: {
      fatorComplexidade,
      fatorUrgencia,
      percentualMargemReal: Number(percentualMargemReal.toFixed(2))
    }
  };
}

export function getDescricaoComplexidade(complexidade: string): string {
  const descricoes = {
    'baixa': 'Projeto simples, tecnologias conhecidas',
    'media': 'Projeto padrão, algumas integrações',
    'alta': 'Projeto complexo, múltiplas integrações, tecnologias novas'
  };
  return descricoes[complexidade as keyof typeof descricoes] || '';
}

export function getDescricaoUrgencia(urgencia: string): string {
  const descricoes = {
    'normal': 'Prazo normal, sem pressa',
    'urgente': 'Prazo apertado, prioridade alta',
    'muito-urgente': 'Prazo crítico, trabalho extra necessário'
  };
  return descricoes[urgencia as keyof typeof descricoes] || '';
}
