import { calcularINSS, calcularIRRF } from './utils/tax';

export interface SalarioLiquidoInput {
    salarioBruto: number;
    dependentes: number;
    outrosDescontos: number;
}

export interface SalarioLiquidoOutput {
    salarioBruto: number;
    descontoINSS: number;
    descontoIRRF: number;
    outrosDescontos: number;
    totalDescontos: number;
    salarioLiquido: number;
    aliquotaEfetiva: number;
}

export function calcularSalarioLiquido(input: SalarioLiquidoInput): SalarioLiquidoOutput {
    const { salarioBruto, dependentes, outrosDescontos } = input;

    // 1. Calculate INSS
    const descontoINSS = calcularINSS(salarioBruto);

    // 2. Calculate IRRF Base (Gross - INSS - Dependents)
    // Note: calcularIRRF handles dependent deduction internally if passed, 
    // but usually we pass the base *after* INSS. 
    // Let's check tax.ts. 
    // Looking at previous usage in rescisao.ts: 
    // const descontoINSS = calcularINSS(baseINSS);
    // const descontoIRRF = calcularIRRF(baseCalculo, dependentes);
    // So we pass (Gross - INSS) as base to calcularIRRF.

    const baseIRRF = Math.max(0, salarioBruto - descontoINSS);
    const descontoIRRF = calcularIRRF(baseIRRF, dependentes);

    // 3. Total Discounts
    const totalDescontos = descontoINSS + descontoIRRF + outrosDescontos;

    // 4. Net Salary
    const salarioLiquido = Math.max(0, salarioBruto - totalDescontos);

    // 5. Effective Rate
    const aliquotaEfetiva = salarioBruto > 0 ? (totalDescontos / salarioBruto) * 100 : 0;

    return {
        salarioBruto,
        descontoINSS,
        descontoIRRF,
        outrosDescontos,
        totalDescontos,
        salarioLiquido,
        aliquotaEfetiva
    };
}
