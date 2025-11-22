export interface SeguroDesempregoInput {
  salariosMensais: number[]; // Últimos 3 meses
  mesesTrabalhados: number; // Total de meses trabalhados
  vezesRecebeu: number; // Quantas vezes já recebeu seguro-desemprego
}

export interface SeguroDesempregoOutput {
  temDireito: boolean;
  numeroParcelas: number;
  valorParcela: number;
  valorTotal: number;
  salarioMedio: number;
  motivoNegacao?: string;
  detalhes: {
    primeiraFaixa: number;
    segundaFaixa: number;
    terceiraFaixa: number;
  };
}

// Valores 2025
const SALARIO_MINIMO = 1412.00;
const TETO_SEGURO = 2313.74;

export function calcularSeguroDesemprego(input: SeguroDesempregoInput): SeguroDesempregoOutput {
  const { salariosMensais, mesesTrabalhados, vezesRecebeu } = input;

  // Validar se tem direito
  let temDireito = true;
  let motivoNegacao: string | undefined;

  // Regra 1: Mínimo de meses trabalhados
  const mesesMinimos = vezesRecebeu === 0 ? 12 : vezesRecebeu === 1 ? 9 : 6;
  if (mesesTrabalhados < mesesMinimos) {
    temDireito = false;
    motivoNegacao = `Necessário trabalhar pelo menos ${mesesMinimos} meses. Você trabalhou ${mesesTrabalhados} meses.`;
  }

  // Calcular salário médio dos últimos 3 meses
  const salarioMedio = salariosMensais.reduce((a, b) => a + b, 0) / salariosMensais.length;

  // Calcular número de parcelas
  let numeroParcelas = 0;
  if (mesesTrabalhados >= 6 && mesesTrabalhados < 12) {
    numeroParcelas = 3;
  } else if (mesesTrabalhados >= 12 && mesesTrabalhados < 24) {
    numeroParcelas = 4;
  } else if (mesesTrabalhados >= 24) {
    numeroParcelas = 5;
  }

  // Calcular valor da parcela (fórmula progressiva)
  let valorParcela = 0;
  let primeiraFaixa = 0;
  let segundaFaixa = 0;
  let terceiraFaixa = 0;

  if (salarioMedio <= 2313.74) {
    // Até o teto: 80% da primeira faixa
    primeiraFaixa = salarioMedio * 0.8;
    valorParcela = primeiraFaixa;
  } else if (salarioMedio <= 3856.23) {
    // Acima do teto até 1.66x: 80% do teto + 50% do excedente
    primeiraFaixa = 2313.74 * 0.8; // R$ 1.850,99
    segundaFaixa = (salarioMedio - 2313.74) * 0.5;
    valorParcela = primeiraFaixa + segundaFaixa;
  } else {
    // Acima de 1.66x: valor fixo máximo
    primeiraFaixa = 2313.74 * 0.8;
    segundaFaixa = (3856.23 - 2313.74) * 0.5;
    valorParcela = primeiraFaixa + segundaFaixa;
  }

  // Garantir valor mínimo (salário mínimo) e máximo
  if (valorParcela < SALARIO_MINIMO) {
    valorParcela = SALARIO_MINIMO;
  }
  if (valorParcela > TETO_SEGURO) {
    valorParcela = TETO_SEGURO;
  }

  const valorTotal = valorParcela * numeroParcelas;

  return {
    temDireito,
    numeroParcelas,
    valorParcela: Number(valorParcela.toFixed(2)),
    valorTotal: Number(valorTotal.toFixed(2)),
    salarioMedio: Number(salarioMedio.toFixed(2)),
    motivoNegacao,
    detalhes: {
      primeiraFaixa: Number(primeiraFaixa.toFixed(2)),
      segundaFaixa: Number(segundaFaixa.toFixed(2)),
      terceiraFaixa: Number(terceiraFaixa.toFixed(2))
    }
  };
}

export function getMesesMinimos(vezesRecebeu: number): number {
  if (vezesRecebeu === 0) return 12;
  if (vezesRecebeu === 1) return 9;
  return 6;
}
