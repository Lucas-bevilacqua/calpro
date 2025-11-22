export interface HorasExtrasInput {
    salarioBruto: number;
    cargaHorariaMensal: number; // usually 220, 180, etc.
    horasExtrasFeitas: number;
    adicional: number; // percentage, e.g., 50 for 50%
    diasUteis: number; // for DSR calculation
    domingosFeriados: number; // for DSR calculation
}

export interface HorasExtrasOutput {
    valorHoraNormal: number;
    valorHoraExtra: number;
    totalHorasExtras: number;
    dsr: number;
    totalBruto: number;
}

export function calcularHorasExtras(input: HorasExtrasInput): HorasExtrasOutput {
    const { salarioBruto, cargaHorariaMensal, horasExtrasFeitas, adicional, diasUteis, domingosFeriados } = input;

    const valorHoraNormal = salarioBruto / cargaHorariaMensal;
    const valorHoraExtra = valorHoraNormal * (1 + adicional / 100);
    const totalHorasExtras = valorHoraExtra * horasExtrasFeitas;

    // DSR Formula: (Total HE / Dias Úteis) * Domingos e Feriados
    // Note: Some interpretations use "Dias Úteis" as total days minus sundays/holidays.
    // Standard formula: (Valor Total HE / Dias Úteis do mês) * Domingos e Feriados do mês.
    // Where Dias Úteis includes Saturdays usually.
    let dsr = 0;
    if (diasUteis > 0) {
        dsr = (totalHorasExtras / diasUteis) * domingosFeriados;
    }

    const totalBruto = totalHorasExtras + dsr;

    return {
        valorHoraNormal: Number(valorHoraNormal.toFixed(2)),
        valorHoraExtra: Number(valorHoraExtra.toFixed(2)),
        totalHorasExtras: Number(totalHorasExtras.toFixed(2)),
        dsr: Number(dsr.toFixed(2)),
        totalBruto: Number(totalBruto.toFixed(2)),
    };
}
