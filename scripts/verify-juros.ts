import { calcularJurosCompostos } from '../lib/calculators/juros-compostos';

const scenarios = [
    {
        name: "Cenário 1: R$ 1000, R$ 100/mês, 1% a.m., 12 meses",
        input: {
            valorInicial: 1000,
            valorMensal: 100,
            taxaJuros: 1,
            taxaUnidade: 'mensal' as const,
            periodo: 12,
            periodoUnidade: 'meses' as const,
        },
        expected: {
            totalInvestido: 1000 + (100 * 12), // 2200
            // FV = P(1+i)^n + M * [((1+i)^n - 1) / i]
            // FV = 1000(1.01)^12 + 100 * [((1.01)^12 - 1) / 0.01]
            // FV = 1000 * 1.126825 + 100 * [0.126825 / 0.01]
            // FV = 1126.825 + 100 * 12.6825
            // FV = 1126.825 + 1268.25 = 2395.075
            totalFinal: 2395.08
        }
    },
    {
        name: "Cenário 2: R$ 5000, R$ 0/mês, 10% a.a., 2 anos",
        input: {
            valorInicial: 5000,
            valorMensal: 0,
            taxaJuros: 10,
            taxaUnidade: 'anual' as const,
            periodo: 2,
            periodoUnidade: 'anos' as const,
        },
        expected: {
            totalInvestido: 5000,
            // FV = 5000 * (1.10)^2 = 5000 * 1.21 = 6050
            totalFinal: 6050.00
        }
    }
];

scenarios.forEach(scenario => {
    console.log(`\nRunning ${scenario.name}...`);
    const result = calcularJurosCompostos(scenario.input);

    let passed = true;
    // @ts-ignore
    if (Math.abs(result.totalFinal - scenario.expected.totalFinal) > 0.10) {
        // @ts-ignore
        console.error(`❌ Mismatch in Total Final: Expected ${scenario.expected.totalFinal}, got ${result.totalFinal}`);
        passed = false;
    } else {
        // @ts-ignore
        console.log(`✅ Total Final correct: ${result.totalFinal} (Expected ~${scenario.expected.totalFinal})`);
    }

    // @ts-ignore
    if (Math.abs(result.totalInvestido - scenario.expected.totalInvestido) > 0.10) {
        // @ts-ignore
        console.error(`❌ Mismatch in Total Investido: Expected ${scenario.expected.totalInvestido}, got ${result.totalInvestido}`);
        passed = false;
    } else {
        // @ts-ignore
        console.log(`✅ Total Investido correct: ${result.totalInvestido}`);
    }

    if (passed) console.log("✨ Scenario Passed");
});
