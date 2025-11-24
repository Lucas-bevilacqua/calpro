// Inflação Calculator
// Calcula impacto da inflação no poder de compra

export interface InflacaoInput {
    valorAtual: number
    taxaInflacaoAnual: number
    periodoAnos: number
}

export interface InflacaoResult {
    valorFuturo: number
  perdaPoder Compra: number
percentualPerda: number
}

export function calcularInflacao(input: InflacaoInput): InflacaoResult {
    const { valorAtual, taxaInflacaoAnual, periodoAnos } = input

    const taxa = taxaInflacaoAnual / 100
    const valorFuturo = valorAtual / Math.pow(1 + taxa, periodoAnos)
    const perdaPoderCompra = valorAtual - valorFuturo
    const percentualPerda = (perdaPoderCompra / valorAtual) * 100

    return {
        valorFuturo,
        perdaPoderCompra,
        percentualPerda
    }
}
