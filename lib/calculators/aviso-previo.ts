// Aviso Prévio Calculator
// Calcula o valor e dias de aviso prévio

export interface AvisoPrevioInput {
    salario: number
    tempoServico: number // em anos
    quemPediu: 'empregador' | 'empregado'
}

export interface AvisoPrevioResult {
    diasAviso: number
    valorAviso: number
    diasAdicionais: number
    indenizacao: number
    trabalhado: boolean
    detalhes: string
}

export function calcularAvisoPrevio(input: AvisoPrevioInput): AvisoPrevioResult {
    const { salario, tempoServico, quemPediu } = input

    // Dias base: 30 dias
    const diasBase = 30

    // Dias adicionais: 3 dias por ano trabalhado (máximo 60 dias adicionais)
    const diasAdicionais = Math.min(Math.floor(tempoServico) * 3, 60)

    // Total de dias de aviso
    const diasAviso = diasBase + diasAdicionais

    // Valor do aviso (proporcional ao salário)
    const valorAviso = (salario / 30) * diasAviso

    // Se empregador demitiu, pode ser trabalhado ou indenizado
    // Se empregado pediu, deve trabalhar
    const trabalhado = quemPediu === 'empregado'
    const indenizacao = trabalhado ? 0 : valorAviso

    const detalhes = trabalhado
        ? `Você deve trabalhar ${diasAviso} dias de aviso prévio.`
        : `Você receberá R$ ${valorAviso.toFixed(2)} de indenização (aviso prévio indenizado).`

    return {
        diasAviso,
        valorAviso,
        diasAdicionais,
        indenizacao,
        trabalhado,
        detalhes
    }
}
