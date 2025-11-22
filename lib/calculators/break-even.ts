export interface BreakEvenInput {
  custosFixosMensais: number;
  custoVariavelUnitario: number;
  precoVendaUnitario: number;
  metaLucroMensal?: number;
}

export interface BreakEvenOutput {
  pontoEquilibrio: number; // Unidades
  receitaEquilibrio: number; // R$
  margemContribuicao: number; // R$ por unidade
  margemContribuicaoPercentual: number; // %
  unidadesParaMeta: number; // Unidades para atingir meta de lucro
  receitaParaMeta: number; // R$ para atingir meta
  diasParaEquilibrio: number; // Dias úteis (assumindo 22 dias/mês)
  analise: {
    custoFixoPorUnidade: number;
    custoTotalPorUnidade: number;
    lucroPorUnidade: number;
  };
}

export function calcularBreakEven(input: BreakEvenInput): BreakEvenOutput {
  const {
    custosFixosMensais,
    custoVariavelUnitario,
    precoVendaUnitario,
    metaLucroMensal = 0
  } = input;

  // Margem de contribuição (quanto cada venda contribui para cobrir custos fixos)
  const margemContribuicao = precoVendaUnitario - custoVariavelUnitario;
  const margemContribuicaoPercentual = (margemContribuicao / precoVendaUnitario) * 100;

  // Ponto de equilíbrio (break-even point)
  const pontoEquilibrio = Math.ceil(custosFixosMensais / margemContribuicao);
  const receitaEquilibrio = pontoEquilibrio * precoVendaUnitario;

  // Unidades necessárias para atingir meta de lucro
  const unidadesParaMeta = Math.ceil((custosFixosMensais + metaLucroMensal) / margemContribuicao);
  const receitaParaMeta = unidadesParaMeta * precoVendaUnitario;

  // Dias úteis para atingir break-even (assumindo 22 dias úteis/mês)
  const diasParaEquilibrio = Math.ceil((pontoEquilibrio / 22));

  // Análise detalhada
  const custoFixoPorUnidade = custosFixosMensais / pontoEquilibrio;
  const custoTotalPorUnidade = custoFixoPorUnidade + custoVariavelUnitario;
  const lucroPorUnidade = precoVendaUnitario - custoTotalPorUnidade;

  return {
    pontoEquilibrio,
    receitaEquilibrio: Number(receitaEquilibrio.toFixed(2)),
    margemContribuicao: Number(margemContribuicao.toFixed(2)),
    margemContribuicaoPercentual: Number(margemContribuicaoPercentual.toFixed(2)),
    unidadesParaMeta,
    receitaParaMeta: Number(receitaParaMeta.toFixed(2)),
    diasParaEquilibrio,
    analise: {
      custoFixoPorUnidade: Number(custoFixoPorUnidade.toFixed(2)),
      custoTotalPorUnidade: Number(custoTotalPorUnidade.toFixed(2)),
      lucroPorUnidade: Number(lucroPorUnidade.toFixed(2))
    }
  };
}

export function simularCenarios(input: BreakEvenInput, volumes: number[]): Array<{
  volume: number;
  receita: number;
  custoTotal: number;
  lucro: number;
  margemLucro: number;
}> {
  const { custosFixosMensais, custoVariavelUnitario, precoVendaUnitario } = input;

  return volumes.map(volume => {
    const receita = volume * precoVendaUnitario;
    const custoVariavelTotal = volume * custoVariavelUnitario;
    const custoTotal = custosFixosMensais + custoVariavelTotal;
    const lucro = receita - custoTotal;
    const margemLucro = receita > 0 ? (lucro / receita) * 100 : 0;

    return {
      volume,
      receita: Number(receita.toFixed(2)),
      custoTotal: Number(custoTotal.toFixed(2)),
      lucro: Number(lucro.toFixed(2)),
      margemLucro: Number(margemLucro.toFixed(2))
    };
  });
}
