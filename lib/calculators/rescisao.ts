import { calcularINSS, calcularIRRF } from './utils/tax';

export type TipoRescisao = 'sem-justa-causa' | 'pedido-demissao' | 'justa-causa' | 'acordo';

export interface RescisaoInput {
    salarioBruto: number;
    dataAdmissao: Date;
    dataDemissao: Date;
    tipoRescisao: TipoRescisao;
    saldoFGTS: number;
    dependentes?: number;
    avisoPrevioIndenizado?: boolean; // Se o aviso foi trabalhado ou indenizado
}

export interface RescisaoOutput {
    avisoPrevio: number;
    saldoSalario: number;
    decimoTerceiro: number;
    feriasProporcionais: number;
    umTercoFerias: number;
    feriasVencidas: number;
    umTercoFeriasVencidas: number;
    multaFGTS: number;
    totalBruto: number;
    descontoINSS: number;
    descontoIRRF: number;
    totalLiquido: number;
    memoriaCalculo: {
        anosTrabalhados: number;
        mesesTrabalhados: number; // Total months for calculation
        diasAviso: number;
        avos13: number;
        avosFerias: number;
    };
}

function diffMonths(d1: Date, d2: Date): number {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

export function calcularRescisao(input: RescisaoInput): RescisaoOutput {
    const { salarioBruto, dataAdmissao, dataDemissao, tipoRescisao, saldoFGTS, dependentes = 0, avisoPrevioIndenizado = true } = input;

    // 1. Tempo de Serviço
    const tempoServicoMs = dataDemissao.getTime() - dataAdmissao.getTime();
    const anosTrabalhados = Math.floor(tempoServicoMs / (1000 * 60 * 60 * 24 * 365.25));

    // 2. Aviso Prévio
    let diasAviso = 0;
    let valorAviso = 0;

    if (tipoRescisao === 'sem-justa-causa') {
        diasAviso = 30 + (anosTrabalhados * 3);
        if (diasAviso > 90) diasAviso = 90;

        if (avisoPrevioIndenizado) {
            valorAviso = (salarioBruto / 30) * diasAviso;
        }
    } else if (tipoRescisao === 'acordo') {
        diasAviso = (30 + (anosTrabalhados * 3)) / 2; // Pela metade no acordo
        if (avisoPrevioIndenizado) {
            valorAviso = (salarioBruto / 30) * diasAviso;
        }
    }

    // Data projetada com aviso prévio para contagem de avos
    const dataProjetada = new Date(dataDemissao);
    if (avisoPrevioIndenizado && tipoRescisao === 'sem-justa-causa') {
        dataProjetada.setDate(dataProjetada.getDate() + diasAviso);
    }

    // 3. Saldo de Salário
    const diasTrabalhadosMes = dataDemissao.getDate();
    // Se trabalhou 30 dias ou é dia 31, considera mês cheio (30 dias para cálculo)
    const diasSaldo = diasTrabalhadosMes > 30 ? 30 : diasTrabalhadosMes;
    const saldoSalario = (salarioBruto / 30) * diasSaldo;

    // 4. 13º Salário Proporcional
    // Conta meses a partir de Janeiro do ano da demissão (ou admissão se for no mesmo ano)
    const inicioAno = new Date(dataDemissao.getFullYear(), 0, 1);
    const dataInicio13 = dataAdmissao > inicioAno ? dataAdmissao : inicioAno;

    // Lógica de avos: fração >= 15 dias conta como mês inteiro
    let avos13 = 0;
    let current = new Date(dataInicio13);
    // Iterar mês a mês até a data projetada
    while (current <= dataProjetada) {
        // Se for o mês da admissão
        if (current.getMonth() === dataInicio13.getMonth() && current.getFullYear() === dataInicio13.getFullYear()) {
            const diasNoMes = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
            const diasTrabalhados = diasNoMes - current.getDate() + 1;
            if (diasTrabalhados >= 15) avos13++;
        }
        // Se for o mês da projeção (último)
        else if (current.getMonth() === dataProjetada.getMonth() && current.getFullYear() === dataProjetada.getFullYear()) {
            if (dataProjetada.getDate() >= 15) avos13++;
        }
        // Meses cheios no meio
        else {
            avos13++;
        }
        current.setMonth(current.getMonth() + 1);
        current.setDate(1); // Reset para dia 1 para não pular meses curtos
    }
    // Cap at 12
    if (avos13 > 12) avos13 = 12; // Should reset every year, logic above assumes same year calc mostly.
    // Correction: 13th is always per calendar year.
    // If admission was previous year, we count from Jan 1st.
    // If admission was this year, count from admission.
    // The loop above handles "dataInicio13" correctly.

    if (tipoRescisao === 'justa-causa') avos13 = 0;

    const decimoTerceiro = (salarioBruto / 12) * avos13;

    // 5. Férias Proporcionais
    // Ciclo aquisitivo: data admissão até data projetada
    // Calcular meses completos + fração > 14 dias desde o último aniversário da admissão

    // Encontrar último aniversário de admissão antes da demissão
    let inicioPeriodoAquisitivo = new Date(dataAdmissao);
    while (new Date(inicioPeriodoAquisitivo.getFullYear() + 1, inicioPeriodoAquisitivo.getMonth(), inicioPeriodoAquisitivo.getDate()) <= dataProjetada) {
        inicioPeriodoAquisitivo.setFullYear(inicioPeriodoAquisitivo.getFullYear() + 1);
    }

    let avosFerias = 0;
    // Diferença em meses entre inicioPeriodoAquisitivo e dataProjetada
    // Usar lógica de dias >= 15
    let tempDate = new Date(inicioPeriodoAquisitivo);
    while (tempDate < dataProjetada) {
        // Avança um mês
        let nextMonth = new Date(tempDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if (nextMonth <= dataProjetada) {
            avosFerias++;
            tempDate = nextMonth;
        } else {
            // Fração final
            const diffTime = Math.abs(dataProjetada.getTime() - tempDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= 14) avosFerias++; // Regra de férias é > 14 dias
            break;
        }
    }
    if (avosFerias > 12) avosFerias = 12;

    if (tipoRescisao === 'justa-causa') avosFerias = 0;

    const feriasProporcionais = (salarioBruto / 12) * avosFerias;
    const umTercoFerias = feriasProporcionais / 3;

    // Férias Vencidas (Simplificação: assumindo que se tem mais de 1 ano, pode ter vencidas se o usuário indicar. 
    // Por enquanto, vamos deixar zerado ou adicionar input depois. No MVP, assumimos tudo pago em dia, exceto proporcionais.
    // TODO: Adicionar campo "Férias Vencidas" no input)
    const feriasVencidas = 0;
    const umTercoFeriasVencidas = 0;

    // 6. Multa FGTS
    let multaFGTS = 0;
    if (tipoRescisao === 'sem-justa-causa') {
        multaFGTS = saldoFGTS * 0.4;
    } else if (tipoRescisao === 'acordo') {
        multaFGTS = saldoFGTS * 0.2;
    }

    // 7. Totais
    const totalBruto =
        valorAviso +
        saldoSalario +
        decimoTerceiro +
        feriasProporcionais +
        umTercoFerias +
        feriasVencidas +
        umTercoFeriasVencidas +
        multaFGTS;

    // 8. Descontos
    // INSS incide sobre: Saldo Salário, 13º Proporcional. (Aviso Prévio Indenizado não incide INSS para desconto do funcionário, apenas patronal, mas há controvérsias. Padrão seguro: não descontar do indenizado).
    // Férias indenizadas não incide INSS.
    const baseINSS = saldoSalario + decimoTerceiro;
    const descontoINSS = calcularINSS(baseINSS);

    // IRRF
    // Base: Total Tributável - INSS - Dependentes - Isenção 65 anos (não tratado)
    // Tributáveis: Saldo Salário, 13º, Aviso Prévio (Discutível, mas Receita cobra), Férias (Não incide IRRF sobre férias indenizadas na rescisão? Súmula 386 STJ diz que não. Solução segura: Não tributar férias indenizadas).
    // Aviso Prévio Indenizado: Isento de IRRF? Sim, regra geral isento.

    // Então Base IRRF = Saldo Salário + 13º Proporcional (Tributação Exclusiva na Fonte para 13º)
    // O 13º é tributado separadamente.
    // O Salário é tributado na tabela progressiva mensal.

    // IRRF sobre Salários (Saldo)
    const baseIRRFSalario = saldoSalario - calcularINSS(saldoSalario); // INSS proporcional ao saldo? Simplificação: usar INSS total calculado acima se for a única verba salarial.
    // Melhor: Calcular INSS separado para cada base se necessário, mas o INSS é unificado.
    // Vamos usar a dedução do INSS total proporcional à base.
    // Simplificação MVP: Desconto INSS total abatendo da base do Saldo Salário (pode gerar base negativa, tratar).
    const baseIRRF = Math.max(0, saldoSalario - descontoINSS);
    const descontoIRRFSalario = calcularIRRF(baseIRRF, dependentes);

    // IRRF sobre 13º (Tributação Exclusiva)
    const inss13 = calcularINSS(decimoTerceiro); // INSS teórico sobre 13º para dedução
    const baseIRRF13 = Math.max(0, decimoTerceiro - inss13);
    const descontoIRRF13 = calcularIRRF(baseIRRF13, dependentes);

    const descontoIRRF = descontoIRRFSalario + descontoIRRF13;

    const totalLiquido = totalBruto - descontoINSS - descontoIRRF;

    return {
        avisoPrevio: Number(valorAviso.toFixed(2)),
        saldoSalario: Number(saldoSalario.toFixed(2)),
        decimoTerceiro: Number(decimoTerceiro.toFixed(2)),
        feriasProporcionais: Number(feriasProporcionais.toFixed(2)),
        umTercoFerias: Number(umTercoFerias.toFixed(2)),
        feriasVencidas: Number(feriasVencidas.toFixed(2)),
        umTercoFeriasVencidas: Number(umTercoFeriasVencidas.toFixed(2)),
        multaFGTS: Number(multaFGTS.toFixed(2)),
        totalBruto: Number(totalBruto.toFixed(2)),
        descontoINSS: Number(descontoINSS.toFixed(2)),
        descontoIRRF: Number(descontoIRRF.toFixed(2)),
        totalLiquido: Number(totalLiquido.toFixed(2)),
        memoriaCalculo: {
            anosTrabalhados,
            mesesTrabalhados: Math.floor(tempoServicoMs / (1000 * 60 * 60 * 24 * 30)),
            diasAviso,
            avos13,
            avosFerias
        }
    };
}
