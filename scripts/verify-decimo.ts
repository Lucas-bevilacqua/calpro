import { calcularDecimoTerceiro } from '../lib/calculators/decimo-terceiro';
import { calcularINSS, calcularIRRF } from '../lib/calculators/utils/tax';

const scenarios = [
    {
        name: "Cenário 1: Padrão (R$ 3000, 12 meses)",
        input: {
            salarioBruto: 3000,
            mesesTrabalhados: 12,
            parcela: 'unica' as const,
        },
        expected: {
            valorTotal: 3000.00,
            primeiraParcela: 1500.00,
            // INSS on 3000:
            // 1518 * 0.075 = 113.85
            // (2793.88 - 1518) * 0.09 = 1275.88 * 0.09 = 114.8292
            // (3000 - 2793.88) * 0.12 = 206.12 * 0.12 = 24.7344
            // Total INSS = 113.85 + 114.83 + 24.73 = 253.41
            descontoINSS: 253.41, // Approx
            // IRRF Base = 3000 - 253.41 = 2746.59
            // 2746.59 < 2826.65 (Band 2: 7.5%, ded 169.44)
            // (2746.59 * 0.075) - 169.44 = 205.99 - 169.44 = 36.55
            descontoIRRF: 36.55,
            segundaParcela: 3000 - 1500 - 253.41 - 36.55 // = 1210.04
        }
    }
];

scenarios.forEach(scenario => {
    console.log(`\nRunning ${scenario.name}...`);
    const result = calcularDecimoTerceiro(scenario.input);

    let passed = true;
    for (const [key, val] of Object.entries(scenario.expected)) {
        // @ts-ignore
        if (Math.abs(result[key] - val) > 1.00) { // Tolerance for tax rounding diffs
            // @ts-ignore
            console.error(`❌ Mismatch in ${key}: Expected ${val}, got ${result[key]}`);
            passed = false;
        } else {
            console.log(`✅ ${key} correct: ${result[key]} (Expected ~${val})`);
        }
    }

    if (passed) console.log("✨ Scenario Passed");
});
