// Lucro Presumido Calculator
// Calcula impostos no Lucro Presumido

export interface LucroPresumidoInput {
    faturamentoMensal: number
    atividadePrestacaoServicos: boolean
}

export interface LucroPresumidoResult {
    baseCalculo: number
    irpj: number
    csll: number
    pis: number
    cofins: number
    totalImpostos: number
    aliquotaEfetiva: number
    lucroLiquido: number
}

export function calcularLucroPresumido(input: LucroPresumidoInput): LucroPresumidoResult {
    const { faturamentoMensal, atividadePrestacaoServicos } = input

    // Presunção de lucro
    const percentualPresuncao = atividadePrestacaoServicos ? 0.32 : 0.08
    const baseCalculo = faturamentoMensal * percentualPresuncao

    // IRPJ: 15% sobre base de cálculo
    const irpj = baseCalculo * 0.15

    // CSLL: 9% sobre base de cálculo
    const csll = baseCalculo * 0.09

    // PIS: 0.65% sobre faturamento
    const pis = faturamentoMensal * 0.0065

    // COFINS: 3% sobre faturamento
    const cofins = faturamentoMensal * 0.03

    const totalImpostos = irpj + csll + pis + cofins
    const aliquotaEfetiva = (totalImpostos / faturamentoMensal) * 100
    const lucroLiquido = faturamentoMensal - totalImpostos

    return {
        baseCalculo,
        irpj,
        csll,
        pis,
        cofins,
        totalImpostos,
        aliquotaEfetiva,
        lucroLiquido
    }
}
