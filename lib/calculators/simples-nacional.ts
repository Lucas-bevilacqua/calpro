// Simples Nacional Calculator
// Calcula impostos do Simples Nacional

export interface SimplesNacionalInput {
    faturamentoMensal: number
    anexo: 1 | 2 | 3 | 4 | 5
}

export interface SimplesNacionalResult {
    aliquota: number
    valorImposto: number
    faturamentoLiquido: number
    faixa: string
}

// Tabelas simplificadas (Anexo I - Comércio)
const TABELA_SIMPLES = [
    { limite: 180000, aliquota: 4.0, faixa: 'Até R$ 180 mil' },
    { limite: 360000, aliquota: 7.3, faixa: 'De R$ 180 mil a R$ 360 mil' },
    { limite: 720000, aliquota: 9.5, faixa: 'De R$ 360 mil a R$ 720 mil' },
    { limite: 1800000, aliquota: 10.7, faixa: 'De R$ 720 mil a R$ 1,8 mi' },
    { limite: 3600000, aliquota: 14.3, faixa: 'De R$ 1,8 mi a R$ 3,6 mi' },
    { limite: 4800000, aliquota: 19.0, faixa: 'De R$ 3,6 mi a R$ 4,8 mi' }
]

export function calcularSimplesNacional(input: SimplesNacionalInput): SimplesNacionalResult {
    const { faturamentoMensal } = input

    const faturamentoAnual = faturamentoMensal * 12
    const faixa = TABELA_SIMPLES.find(f => faturamentoAnual <= f.limite) || TABELA_SIMPLES[TABELA_SIMPLES.length - 1]

    const aliquota = faixa.aliquota
    const valorImposto = (faturamentoMensal * aliquota) / 100
    const faturamentoLiquido = faturamentoMensal - valorImposto

    return {
        aliquota,
        valorImposto,
        faturamentoLiquido,
        faixa: faixa.faixa
    }
}
