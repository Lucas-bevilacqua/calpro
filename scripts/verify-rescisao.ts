import { calcularRescisao } from '../lib/calculators/rescisao';

const scenarios = [
    {
        name: "Cenário 1: Padrão (1 ano, Sem Justa Causa)",
        input: {
            salarioBruto: 3000,
            dataAdmissao: new Date('2024-01-01'),
            dataDemissao: new Date('2025-01-01'),
            tipoRescisao: 'sem-justa-causa' as const,
            saldoFGTS: 5000,
        },
        expected: {
            avisoPrevio: 3300, // 3000 + 3 dias (300) = 3300
            multaFGTS: 2000, // 40% de 5000
        }
    },
    {
        name: "Cenário 2: Justa Causa",
        input: {
            salarioBruto: 3000,
            dataAdmissao: new Date('2024-01-01'),
            dataDemissao: new Date('2025-01-01'),
            tipoRescisao: 'justa-causa' as const,
            saldoFGTS: 5000,
        },
        expected: {
            avisoPrevio: 0,
            multaFGTS: 0,
            decimoTerceiro: 0,
            feriasProporcionais: 0
        }
    }
];

scenarios.forEach(scenario => {
    console.log(`\nRunning ${scenario.name}...`);
    const result = calcularRescisao(scenario.input);

    let passed = true;
    for (const [key, val] of Object.entries(scenario.expected)) {
        // @ts-ignore
        if (result[key] !== val) {
            // @ts-ignore
            console.error(`❌ Mismatch in ${key}: Expected ${val}, got ${result[key]}`);
            passed = false;
        } else {
            console.log(`✅ ${key} correct: ${val}`);
        }
    }

    if (passed) console.log("✨ Scenario Passed");
});
