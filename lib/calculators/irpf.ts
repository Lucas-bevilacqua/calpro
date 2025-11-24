// IRPF Calculator (Imposto de Renda Pessoa Física)
// Calcula imposto de renda mensal

export interface IRPFInput {
    salarioBruto: number
    dependentes: number
    outrasDeducoes: number
    inss: number
}

export interface IRPFResult {
    baseCalculo: number
    aliquota: number
    impostoDevido: number
    parcelaDeducao: number
    impostoFinal: number
    salarioLiquido: number
    faixa: string
}

// Tabela IRPF 2024
const TABELA_IRPF = [
    { limite: 2259.20, aliquota: 0, deducao: 0, faixa: 'Isento' },
    { limite: 2826.65, aliquota: 7.5, deducao: 169.44, faixa: '7,5%' },
    { limite: 3751.05, aliquota: 15, deducao: 381.44, faixa: '15%' },
    { limite: 4664.68, aliquota: 22.5, deducao: 662.77, faixa: '22,5%' },
    { limite: Infinity, aliquota: 27.5, deducao: 896.00, faixa: '27,5%' }
]

const DEDUCAO_DEPENDENTE = 189.59

export function calcularIRPF(input: IRPFInput): IRPFResult {
    const { salarioBruto, dependentes, outrasDeducoes, inss } = input

    // Deduções
    const deducaoDependentes = dependentes * DEDUCAO_DEPENDENTE
    const totalDeducoes = inss + deducaoDependentes + outrasDeducoes

    // Base de cálculo
    const baseCalculo = Math.max(0, salarioBruto - totalDeducoes)

    // Encontrar faixa
    const faixa = TABELA_IRPF.find(f => baseCalculo <= f.limite) || TABELA_IRPF[TABELA_IRPF.length - 1]

    // Calcular imposto
    const impostoDevido = (baseCalculo * faixa.aliquota) / 100
    const impostoFinal = Math.max(0, impostoDevido - faixa.deducao)

    const salarioLiquido = salarioBruto - inss - impostoFinal

    return {
        baseCalculo,
        aliquota: faixa.aliquota,
        impostoDevido,
        parcelaDeducao: faixa.deducao,
        impostoFinal,
        salarioLiquido,
        faixa: faixa.faixa
    }
}
