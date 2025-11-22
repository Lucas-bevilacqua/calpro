export interface FinanciamentoInput {
    valorFinanciado: number;
    taxaJurosAnual: number;
    prazoMeses: number;
    sistema: 'sac' | 'price';
}

export interface Parcela {
    numero: number;
    valor: number;
    amortizacao: number;
    juros: number;
    saldoDevedor: number;
}

export interface FinanciamentoOutput {
    valorFinanciado: number;
    totalPago: number;
    totalJuros: number;
    primeiraParcela: number;
    ultimaParcela: number;
    tabela: Parcela[];
}

export function calcularFinanciamento(input: FinanciamentoInput): FinanciamentoOutput {
    const { valorFinanciado, taxaJurosAnual, prazoMeses, sistema } = input;

    // Monthly interest rate
    // i_m = (1 + i_a)^(1/12) - 1
    const taxaMensal = Math.pow(1 + taxaJurosAnual / 100, 1 / 12) - 1;

    const tabela: Parcela[] = [];
    let saldoDevedor = valorFinanciado;
    let totalPago = 0;
    let totalJuros = 0;

    if (sistema === 'sac') {
        // SAC: Constant Amortization
        const amortizacaoConstante = valorFinanciado / prazoMeses;

        for (let i = 1; i <= prazoMeses; i++) {
            const juros = saldoDevedor * taxaMensal;
            const parcela = amortizacaoConstante + juros;

            saldoDevedor -= amortizacaoConstante;
            // Fix rounding issues for zero
            if (saldoDevedor < 0.01) saldoDevedor = 0;

            totalPago += parcela;
            totalJuros += juros;

            tabela.push({
                numero: i,
                valor: parcela,
                amortizacao: amortizacaoConstante,
                juros: juros,
                saldoDevedor: saldoDevedor
            });
        }
    } else {
        // Price: Constant Installment (PMT)
        // PMT = PV * [ i * (1+i)^n ] / [ (1+i)^n - 1 ]
        const pmt = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, prazoMeses)) / (Math.pow(1 + taxaMensal, prazoMeses) - 1);

        for (let i = 1; i <= prazoMeses; i++) {
            const juros = saldoDevedor * taxaMensal;
            const amortizacao = pmt - juros;

            saldoDevedor -= amortizacao;
            if (saldoDevedor < 0.01) saldoDevedor = 0;

            totalPago += pmt;
            totalJuros += juros;

            tabela.push({
                numero: i,
                valor: pmt,
                amortizacao: amortizacao,
                juros: juros,
                saldoDevedor: saldoDevedor
            });
        }
    }

    return {
        valorFinanciado,
        totalPago,
        totalJuros,
        primeiraParcela: tabela[0].valor,
        ultimaParcela: tabela[tabela.length - 1].valor,
        tabela
    };
}
