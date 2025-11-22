import { calcularHorasExtras } from '../lib/calculators/horas-extras';

const scenarios = [
    {
        name: "Cenário 1: Padrão (R$ 2200, 220h, 10h @ 50%)",
        input: {
            salarioBruto: 2200,
            cargaHorariaMensal: 220,
            horasExtrasFeitas: 10,
            adicional: 50,
            diasUteis: 25,
            domingosFeriados: 5,
        },
        expected: {
            valorHoraNormal: 10.00,
            valorHoraExtra: 15.00,
            totalHorasExtras: 150.00,
            dsr: 30.00, // (150 / 25) * 5 = 6 * 5 = 30
            totalBruto: 180.00
        }
    },
    {
        name: "Cenário 2: 100% (R$ 3000, 220h, 5h @ 100%)",
        input: {
            salarioBruto: 3000,
            cargaHorariaMensal: 220,
            horasExtrasFeitas: 5,
            adicional: 100,
            diasUteis: 24,
            domingosFeriados: 6,
        },
        expected: {
            valorHoraNormal: 13.64, // 3000/220 = 13.6363...
            valorHoraExtra: 27.27, // 13.6363 * 2 = 27.2727...
            totalHorasExtras: 136.36, // 27.2727 * 5 = 136.3636...
            dsr: 34.09, // (136.3636 / 24) * 6 = 5.6818 * 6 = 34.0909...
        }
    }
];

scenarios.forEach(scenario => {
    console.log(`\nRunning ${scenario.name}...`);
    const result = calcularHorasExtras(scenario.input);

    let passed = true;
    for (const [key, val] of Object.entries(scenario.expected)) {
        // @ts-ignore
        if (Math.abs(result[key] - val) > 0.05) { // Tolerance for rounding
            // @ts-ignore
            console.error(`❌ Mismatch in ${key}: Expected ${val}, got ${result[key]}`);
            passed = false;
        } else {
            console.log(`✅ ${key} correct: ${result[key]} (Expected ${val})`);
        }
    }

    if (passed) console.log("✨ Scenario Passed");
});
