export interface JurosCompostosInput {
    valorInicial: number;
    valorMensal: number;
    taxaJuros: number;
    periodo: number;
    periodoUnidade: 'meses' | 'anos';
    taxaUnidade: 'mensal' | 'anual';
}

export interface JurosCompostosOutput {
    totalInvestido: number;
    totalJuros: number;
    totalFinal: number;
    evolucao: Array<{
        mes: number;
        investido: number;
        juros: number;
        total: number;
    }>;
}

export function calcularJurosCompostos(input: JurosCompostosInput): JurosCompostosOutput {
    const { valorInicial, valorMensal, taxaJuros, periodo, periodoUnidade, taxaUnidade } = input;

    // Normalize period to months
    const meses = periodoUnidade === 'anos' ? periodo * 12 : periodo;

    // Normalize rate to monthly
    let taxaMensal = 0;
    if (taxaUnidade === 'mensal') {
        taxaMensal = taxaJuros / 100;
    } else {
        // Annual to monthly: (1 + i_a)^(1/12) - 1
        taxaMensal = Math.pow(1 + taxaJuros / 100, 1 / 12) - 1;
    }

    let totalInvestido = valorInicial;
    let totalFinal = valorInicial;
    const evolucao = [];

    // Initial state (Month 0)
    evolucao.push({
        mes: 0,
        investido: totalInvestido,
        juros: 0,
        total: totalFinal
    });

    for (let i = 1; i <= meses; i++) {
        // Apply interest on the current amount
        const jurosMes = totalFinal * taxaMensal;

        // Add monthly contribution
        totalFinal += jurosMes + valorMensal;
        totalInvestido += valorMensal;

        evolucao.push({
            mes: i,
            investido: Number(totalInvestido.toFixed(2)),
            juros: Number((totalFinal - totalInvestido).toFixed(2)),
            total: Number(totalFinal.toFixed(2))
        });
    }

    return {
        totalInvestido: Number(totalInvestido.toFixed(2)),
        totalJuros: Number((totalFinal - totalInvestido).toFixed(2)),
        totalFinal: Number(totalFinal.toFixed(2)),
        evolucao
    };
}
