// Aposentadoria Calculator
// Planeja quanto guardar para aposentadoria

export interface AposentadoriaInput {
    idadeAtual: number
    idadeAposentadoria: number
    gastoMensalDesejado: number
    expectativaVida: number
    taxaRendimento: number
}

export interface AposentadoriaResult {
    anosAteAposentadoria: number
    anosAposentado: number
    valorNecessario: number
    aporteMensal: number
}

export function calcularAposentadoria(input: AposentadoriaInput): AposentadoriaResult {
    const { idadeAtual, idadeAposentadoria, gastoMensalDesejado, expectativaVida, taxaRendimento } = input

    const anosAteAposentadoria = idadeAposentadoria - idadeAtual
    const anosAposentado = expectativaVida - idadeAposentadoria
    const mesesAposentado = anosAposentado * 12

    // Valor necessário para sustentar gastos mensais
    const valorNecessario = gastoMensalDesejado * mesesAposentado

    // Aporte mensal necessário
    const taxaMensal = taxaRendimento / 12 / 100
    const mesesAteAposentadoria = anosAteAposentadoria * 12

    const aporteMensal =
        (valorNecessario * taxaMensal) /
        (Math.pow(1 + taxaMensal, mesesAteAposentadoria) - 1)

    return {
        anosAteAposentadoria,
        anosAposentado,
        valorNecessario,
        aporteMensal
    }
}
