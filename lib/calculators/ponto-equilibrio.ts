// Ponto de Equilíbrio Calculator
// Calcula ponto de equilíbrio (break-even)

export interface PontoEquilibrioInput {
    custosFixos: number
    precoVenda: number
    custoVariavelUnitario: number
}

export interface PontoEquilibrioResult {
    quantidadeEquilibrio: number
    faturamentoEquilibrio: number
    margemContribuicao: number
    margemContribuicaoPercentual: number
}

export function calcularPontoEquilibrio(input: PontoEquilibrioInput): PontoEquilibrioResult {
    const { custosFixos, precoVenda, custoVariavelUnitario } = input

    // Margem de contribuição
    const margemContribuicao = precoVenda - custoVariavelUnitario
    const margemContribuicaoPercentual = (margemContribuicao / precoVenda) * 100

    // Ponto de equilíbrio em unidades
    const quantidadeEquilibrio = custosFixos / margemContribuicao

    // Ponto de equilíbrio em faturamento
    const faturamentoEquilibrio = quantidadeEquilibrio * precoVenda

    return {
        quantidadeEquilibrio: Math.ceil(quantidadeEquilibrio),
        faturamentoEquilibrio,
        margemContribuicao,
        margemContribuicaoPercentual
    }
}
