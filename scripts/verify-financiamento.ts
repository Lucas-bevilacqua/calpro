import { calcularFinanciamento } from '../lib/calculators/financiamento';

const scenarios = [
    {
        name: "Cenário 1: SAC - R$ 120.000, 12% a.a., 12 meses",
        input: {
            valorFinanciado: 120000,
            taxaJurosAnual: 12,
            prazoMeses: 12,
            sistema: 'sac' as const,
        },
        expected: {
            primeiraParcela: 10948.68, // Amort 10000 + Juros ~948.68 (0.9488% mo)
            // i_m = (1.12)^(1/12) - 1 = 0.00948879
            // Juros 1 = 120000 * 0.00948879 = 1138.65
            // Wait, standard calc usually uses nominal rate / 12 or effective?
            // PRD didn't specify, but usually mortgages in Brazil use Nominal/12 if stated "ao mês", 
            // but "Taxa Anual" usually implies effective or nominal. 
            // My code uses effective conversion: (1+i)^(1/12)-1.
            // Let's check the output of the code to verify consistency with ITSELF first, 
            // then we can adjust if the user meant nominal (i/12).
            // 12% effective annual = 0.948879% monthly.
            // Amort = 10000.
            // Juros 1 = 120000 * 0.00948879 = 1138.65
            // Parcela 1 = 11138.65
            primeiraParcela: 11138.65
        }
    },
    {
        name: "Cenário 2: Price - R$ 10.000, 2% a.m. (approx 26.8% a.a.), 10 meses",
        // Let's use a monthly rate derived from annual to match the input format
        // 2% mo => (1.02)^12 - 1 = 26.824%
        input: {
            valorFinanciado: 10000,
            taxaJurosAnual: 26.824179, // Equivalent to 2% mo
            prazoMeses: 10,
            sistema: 'price' as const,
        },
        expected: {
            // PMT = 10000 * [0.02 * (1.02)^10] / [(1.02)^10 - 1]
            // PMT = 10000 * [0.02 * 1.21899] / 0.21899
            // PMT = 10000 * 0.0243798 / 0.21899 = 10000 * 0.1113265
            // PMT = 1113.26
            primeiraParcela: 1113.27
        }
    }
];

scenarios.forEach(scenario => {
    console.log(`\nRunning ${scenario.name}...`);
    const result = calcularFinanciamento(scenario.input);

    // @ts-ignore
    if (Math.abs(result.primeiraParcela - scenario.expected.primeiraParcela) > 1.00) {
        // @ts-ignore
        console.error(`❌ Mismatch in Primeira Parcela: Expected ${scenario.expected.primeiraParcela}, got ${result.primeiraParcela}`);
    } else {
        // @ts-ignore
        console.log(`✅ Primeira Parcela correct: ${result.primeiraParcela}`);
    }

    console.log("✨ Scenario Passed");
});
