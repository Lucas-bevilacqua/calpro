// Empréstimo Pessoal Calculator
// Calcula parcelas e juros de empréstimo

export interface EmprestimoInput {
    valorEmprestimo: number
    taxaJurosMensal: number
    numeroParcelas: number
}

export interface EmprestimoResult {
    valorParcela: number
    totalPago: number
    totalJuros: number
    custoEfetivo: number
    tabelaParcelas: ParcelaDetalhada[]
}

export interface ParcelaDetalhada {
    numero: number
    valorParcela: number
    juros: number
    amortizacao: number
    saldoDevedor: number
}

export function calcularEmprestimo(input: EmprestimoInput): EmprestimoResult {
    const { valorEmprestimo, taxaJurosMensal, numeroParcelas } = input

    const taxa = taxaJurosMensal / 100

    // Fórmula Price (Sistema Francês)
    const valorParcela =
        (valorEmprestimo * taxa * Math.pow(1 + taxa, numeroParcelas)) /
        (Math.pow(1 + taxa, numeroParcelas) - 1)

    const totalPago = valorParcela * numeroParcelas
    const totalJuros = totalPago - valorEmprestimo
    const custoEfetivo = (totalJuros / valorEmprestimo) * 100

    // Gerar tabela de parcelas
    const tabelaParcelas: ParcelaDetalhada[] = []
    let saldoDevedor = valorEmprestimo

    for (let i = 1; i <= numeroParcelas; i++) {
        const juros = saldoDevedor * taxa
        const amortizacao = valorParcela - juros
        saldoDevedor -= amortizacao

        tabelaParcelas.push({
            numero: i,
            valorParcela,
            juros,
            amortizacao,
            saldoDevedor: Math.max(0, saldoDevedor)
        })
    }

    return {
        valorParcela,
        totalPago,
        totalJuros,
        custoEfetivo,
        tabelaParcelas
    }
}
