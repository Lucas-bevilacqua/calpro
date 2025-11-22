export interface ValorHoraInput {
  rendaDesejadaMensal: number;
  horasPorDia: number;
  diasPorMes: number;
  custosFixosMensais: number;
  impostos: number; // Percentual (ex: 6 para 6%)
  margemLucro: number; // Percentual (ex: 20 para 20%)
  feriasFerias: number; // Dias de férias por ano (padrão 30)
}

export interface ValorHoraOutput {
  horasTrabalhadasMes: number;
  horasTrabalhadasAno: number;
  custoTotal: number;
  valorHoraBruto: number;
  valorHoraComImpostos: number;
  valorHoraComMargem: number;
  valorHoraFinal: number;
  valorDiaria: number;
  valorSemanal: number;
  valorMensal: number;
  valorAnual: number;
  memoriaCalculo: {
    diasUteisAno: number;
    horasUteisAno: number;
    custoHora: number;
    impostoHora: number;
    margemHora: number;
  };
}

export function calcularValorHora(input: ValorHoraInput): ValorHoraOutput {
  const {
    rendaDesejadaMensal,
    horasPorDia,
    diasPorMes,
    custosFixosMensais,
    impostos,
    margemLucro,
    feriasFerias = 30
  } = input;

  // Calcular dias úteis no ano (considerando férias)
  const diasUteisAno = (diasPorMes * 12) - feriasFerias;
  const horasUteisAno = diasUteisAno * horasPorDia;
  const horasTrabalhadasMes = diasPorMes * horasPorDia;

  // Custo total anual
  const rendaAnual = rendaDesejadaMensal * 12;
  const custosFixosAnuais = custosFixosMensais * 12;
  const custoTotalAnual = rendaAnual + custosFixosAnuais;

  // Valor hora bruto (sem impostos e margem)
  const valorHoraBruto = custoTotalAnual / horasUteisAno;

  // Adicionar impostos
  const valorImpostos = valorHoraBruto * (impostos / 100);
  const valorHoraComImpostos = valorHoraBruto + valorImpostos;

  // Adicionar margem de lucro
  const valorMargem = valorHoraComImpostos * (margemLucro / 100);
  const valorHoraFinal = valorHoraComImpostos + valorMargem;

  // Calcular valores derivados
  const valorDiaria = valorHoraFinal * horasPorDia;
  const valorSemanal = valorDiaria * 5; // Assumindo 5 dias úteis
  const valorMensal = valorHoraFinal * horasTrabalhadasMes;
  const valorAnual = valorHoraFinal * horasUteisAno;

  return {
    horasTrabalhadasMes,
    horasTrabalhadasAno: horasUteisAno,
    custoTotal: Number(custoTotalAnual.toFixed(2)),
    valorHoraBruto: Number(valorHoraBruto.toFixed(2)),
    valorHoraComImpostos: Number(valorHoraComImpostos.toFixed(2)),
    valorHoraComMargem: Number(valorHoraFinal.toFixed(2)),
    valorHoraFinal: Number(valorHoraFinal.toFixed(2)),
    valorDiaria: Number(valorDiaria.toFixed(2)),
    valorSemanal: Number(valorSemanal.toFixed(2)),
    valorMensal: Number(valorMensal.toFixed(2)),
    valorAnual: Number(valorAnual.toFixed(2)),
    memoriaCalculo: {
      diasUteisAno,
      horasUteisAno,
      custoHora: Number(valorHoraBruto.toFixed(2)),
      impostoHora: Number(valorImpostos.toFixed(2)),
      margemHora: Number(valorMargem.toFixed(2))
    }
  };
}
