// Pró-Labore Calculator
// Calcula pró-labore e impostos

export interface ProLaboreInput {
    valorProLabore: number
    temINSS: boolean
}

export interface ProLaboreResult {
    valorBruto: number
    inss: number
    irrf: number
    valorLiquido: number
    custoEmpresa: number
}

export function calcularProLabore(input: ProLaboreInput): ProLaboreResult {
    const { valorProLabore, temINSS } = input

    // INSS: 11% (contribuinte individual)
    const inss = temINSS ? valorProLabore * 0.11 : 0

    // IRRF simplificado (usando faixa média de 7.5%)
    const baseIRRF = valorProLabore - inss
    let irrf = 0
    if (baseIRRF > 2259.20) {
        irrf = baseIRRF * 0.075 - 169.44
        irrf = Math.max(0, irrf)
    }

    const valorLiquido = valorProLabore - inss - irrf

    // Custo para empresa: pró-labore + INSS patronal (20%)
    const inssPatronal = valorProLabore * 0.20
    const custoEmpresa = valorProLabore + inssPatronal

    return {
        valorBruto: valorProLabore,
        inss,
        irrf,
        valorLiquido,
        custoEmpresa
    }
}
