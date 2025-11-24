// Margem de Lucro Calculator
// Calcula margem de lucro ideal

export interface MargemLucroInput {
    custoTotal: number
    margemDesejada: number
}

export interface MargemLucroResult {
    precoVenda: number
    lucro: number
    markup: number
}

export function calcularMargemLucro(input: MargemLucroInput): MargemLucroResult {
    const { custoTotal, margemDesejada } = input

    const precoVenda = custoTotal / (1 - margemDesejada / 100)
    const lucro = precoVenda - custoTotal
    const markup = (lucro / custoTotal) * 100

    return {
        precoVenda,
        lucro,
        markup
    }
}
