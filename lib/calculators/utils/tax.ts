export const INSS_2025_TABLE = [
    { limit: 1518.00, rate: 0.075 },
    { limit: 2793.88, rate: 0.09 },
    { limit: 4190.83, rate: 0.12 },
    { limit: 8157.41, rate: 0.14 },
];

export const IRRF_2025_TABLE = [
    { limit: 2259.20, rate: 0, deduction: 0 },
    { limit: 2826.65, rate: 0.075, deduction: 169.44 },
    { limit: 3751.05, rate: 0.15, deduction: 381.44 },
    { limit: 4664.68, rate: 0.225, deduction: 662.77 },
    { limit: Infinity, rate: 0.275, deduction: 896.00 },
];

export const DEDUCAO_POR_DEPENDENTE = 189.59;

export function calcularINSS(salarioBruto: number): number {
    let desconto = 0;
    let salarioRestante = salarioBruto;
    let faixaAnterior = 0;

    for (const faixa of INSS_2025_TABLE) {
        if (salarioRestante <= 0) break;

        const baseFaixa = Math.min(salarioBruto, faixa.limit) - faixaAnterior;

        if (baseFaixa > 0) {
            desconto += baseFaixa * faixa.rate;
            salarioRestante -= baseFaixa;
            faixaAnterior = faixa.limit;
        }
    }

    // Teto do INSS
    const tetoINSS = 8157.41;
    if (salarioBruto > tetoINSS) {
        // Recalculate max discount manually to be precise or just cap it? 
        // The progressive calc above handles it correctly up to the limit if we cap the input?
        // Actually, the loop handles it correctly because baseFaixa becomes 0 or negative if we passed the limit?
        // No, the loop logic above is slightly flawed for the cap. 
        // Let's use the standard method: calculate on the cap if salary > cap.

        // Correct approach for progressive:
        // If salary > last limit, we just sum the max contribution of each band.
        // But simpler: just run the logic with the capped salary.
        return calcularINSS(tetoINSS);
    }

    return Number(desconto.toFixed(2));
}

export function calcularIRRF(baseCalculo: number, dependentes: number = 0): number {
    const baseComDeducoes = baseCalculo - (dependentes * DEDUCAO_POR_DEPENDENTE);

    let faixaEncontrada = IRRF_2025_TABLE.find(f => baseComDeducoes <= f.limit);
    if (!faixaEncontrada) {
        faixaEncontrada = IRRF_2025_TABLE[IRRF_2025_TABLE.length - 1];
    }

    const imposto = (baseComDeducoes * faixaEncontrada.rate) - faixaEncontrada.deduction;
    return Math.max(0, Number(imposto.toFixed(2)));
}
