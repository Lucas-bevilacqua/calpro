import { calcularSalarioLiquido } from '../lib/calculators/salario-liquido';

const scenarios = [
    {
        name: "Cenário 1: Salário Mínimo (R$ 1518)",
        input: {
            salarioBruto: 1518,
            dependentes: 0,
            outrosDescontos: 0,
        },
        expected: {
            salarioBruto: 1518,
            descontoINSS: 113.85, // 7.5%
            descontoIRRF: 0, // Isento
            salarioLiquido: 1404.15
        }
    },
    {
        name: "Cenário 2: R$ 5000, 0 dependentes",
        input: {
            salarioBruto: 5000,
            dependentes: 0,
            outrosDescontos: 0,
        },
        expected: {
            salarioBruto: 5000,
            // INSS:
            // 1518 * 0.075 = 113.85
            // (2793.88 - 1518) * 0.09 = 114.83
            // (4190.83 - 2793.88) * 0.12 = 167.63
            // (5000 - 4190.83) * 0.14 = 113.28
            // Total INSS = 509.59
            descontoINSS: 509.59,
            // IRRF Base = 5000 - 509.59 = 4490.41
            // Band 4 (22.5%, ded 662.77)
            // (4490.41 * 0.225) - 662.77 = 1010.34 - 662.77 = 347.57
            descontoIRRF: 347.57,
            salarioLiquido: 5000 - 509.59 - 347.57 // = 4142.84
        }
    }
];

scenarios.forEach(scenario => {
    console.log(`\nRunning ${scenario.name}...`);
    const result = calcularSalarioLiquido(scenario.input);

    let passed = true;
    for (const [key, val] of Object.entries(scenario.expected)) {
        // @ts-ignore
        if (Math.abs(result[key] - val) > 1.00) {
            // @ts-ignore
            console.error(`❌ Mismatch in ${key}: Expected ${val}, got ${result[key]}`);
            passed = false;
        } else {
            console.log(`✅ ${key} correct: ${result[key]} (Expected ~${val})`);
        }
    }

    if (passed) console.log("✨ Scenario Passed");
});
