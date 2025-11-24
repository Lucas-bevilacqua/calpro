// Investimento Calculator
// Simula rentabilidade de investimentos

export interface InvestimentoInput {
    valorInicial: number
    aporteMensal: number
    taxaJurosAnual: number
    periodoMeses: number
}

export interface InvestimentoResult {
    valorFinal: number
    totalInvestido: number
    totalJuros: number
    rentabilidade: number
}

export function calcularInvestimento(input: InvestimentoInput): InvestimentoResult {
    const { valorInicial, aporteMensal, taxaJurosAnual, periodoMeses } = input

    const taxaMensal = taxaJurosAnual / 12 / 100
    let saldo = valorInicial
    let totalInvestido = valorInicial

    for (let mes = 1; mes <= periodoMeses; mes++) {
        saldo = saldo * (1 + taxaMensal) + aporteMensal
        totalInvestido += aporteMensal
    }

    const valorFinal = saldo
    const totalJuros = valorFinal - totalInvestido
    const rentabilidade = (totalJuros / totalInvestido) * 100

    return {
        valorFinal,
        totalInvestido,
        totalJuros,
        rentabilidade
    }
}
