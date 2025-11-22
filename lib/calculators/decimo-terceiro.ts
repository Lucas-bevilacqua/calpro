import { calcularINSS, calcularIRRF } from './utils/tax';

export interface DecimoTerceiroInput {
    salarioBruto: number;
    mesesTrabalhados: number; // 1 to 12
    dependentes?: number;
    parcela: 'unica' | 'primeira' | 'segunda';
    valorPrimeiraParcelaPaga?: number; // Required if calculating 2nd installment separately
}

export interface DecimoTerceiroOutput {
    valorTotal: number; // Full 13th amount
    primeiraParcela: number;
    segundaParcela: number;
    descontoINSS: number;
    descontoIRRF: number;
    totalLiquido: number;
}

export function calcularDecimoTerceiro(input: DecimoTerceiroInput): DecimoTerceiroOutput {
    const { salarioBruto, mesesTrabalhados, dependentes = 0, parcela, valorPrimeiraParcelaPaga = 0 } = input;

    // 1. Calculate Full 13th Amount Proportional
    const valorTotal = (salarioBruto / 12) * mesesTrabalhados;

    // 2. Calculate Installments
    let primeiraParcela = 0;
    let segundaParcela = 0;
    let descontoINSS = 0;
    let descontoIRRF = 0;

    // INSS and IRRF are always calculated on the full amount (valorTotal)
    // But deducted only from the 2nd installment (or single payment)
    descontoINSS = calcularINSS(valorTotal);

    // IRRF Base = Total - INSS - Dependents
    const baseIRRF = Math.max(0, valorTotal - descontoINSS);
    descontoIRRF = calcularIRRF(baseIRRF, dependentes);

    if (parcela === 'primeira') {
        // 1st Installment: 50% of total, no discounts
        primeiraParcela = valorTotal / 2;
        // Discounts are shown for information but not deducted from this payment flow usually? 
        // Actually, 1st installment is just 50% gross.
        // We return the projected discounts for the full year context.
        segundaParcela = 0; // Not calculating 2nd yet
    } else if (parcela === 'segunda') {
        // 2nd Installment: Total - 1st Installment Paid - Discounts
        // If user didn't provide paid amount, assume standard 50%
        const adiantamento = valorPrimeiraParcelaPaga > 0 ? valorPrimeiraParcelaPaga : (valorTotal / 2);
        primeiraParcela = adiantamento; // Already paid

        segundaParcela = valorTotal - adiantamento - descontoINSS - descontoIRRF;
    } else {
        // Single payment (e.g. Rescisão or full year view)
        primeiraParcela = valorTotal / 2;
        segundaParcela = valorTotal - primeiraParcela - descontoINSS - descontoIRRF;
    }

    const totalLiquido = valorTotal - descontoINSS - descontoIRRF;

    return {
        valorTotal: Number(valorTotal.toFixed(2)),
        primeiraParcela: Number(primeiraParcela.toFixed(2)),
        segundaParcela: Number(segundaParcela.toFixed(2)),
        descontoINSS: Number(descontoINSS.toFixed(2)),
        descontoIRRF: Number(descontoIRRF.toFixed(2)),
        totalLiquido: Number(totalLiquido.toFixed(2)),
    };
}
