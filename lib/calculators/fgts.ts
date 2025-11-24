// FGTS Calculator
// Calcula saldo e rendimento do FGTS

export interface FGTSInput {
    salario: number
    mesesTrabalhados: number
    saldoAtual?: number
}

export interface FGTSResult {
    depositoMensal: number
    totalDepositado: number
    saldoAtual: number
    rendimento: number
    saldoTotal: number
    detalhes: string
}

export function calcularFGTS(input: FGTSInput): FGTSResult {
    const { salario, mesesTrabalhados, saldoAtual = 0 } = input

    // Depósito mensal: 8% do salário
    const depositoMensal = salario * 0.08

    // Total depositado pelo empregador
    const totalDepositado = depositoMensal * mesesTrabalhados

    // Rendimento: 3% ao ano + TR (aproximadamente 3.5% ao ano total)
    const taxaAnual = 0.035
    const anos = mesesTrabalhados / 12
    const rendimento = totalDepositado * taxaAnual * anos

    // Saldo total
    const saldoTotal = saldoAtual + totalDepositado + rendimento

    const detalhes = `Seu empregador deposita R$ ${depositoMensal.toFixed(2)} por mês. Em ${mesesTrabalhados} meses, você acumulou R$ ${saldoTotal.toFixed(2)}.`

    return {
        depositoMensal,
        totalDepositado,
        saldoAtual,
        rendimento,
        saldoTotal,
        detalhes
    }
}
