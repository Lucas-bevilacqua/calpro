import { Metadata } from "next"
import { ProLaboreCalculator } from "@/components/calculators/pro-labore-calculator"

export const metadata: Metadata = {
    title: "Calculadora de Pró-Labore 2024 | calcprobr.com",
    description: "Calcule pró-labore, INSS, IRRF e custo total para empresa. Simule quanto você vai receber líquido.",
    keywords: ["pró-labore", "calcular pró-labore", "INSS pró-labore", "custo empresa"],
}

export default function ProLaborePage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de Pró-Labore</h1>
                <p className="text-xl text-muted-foreground">
                    Calcule quanto você vai receber de pró-labore líquido e o custo total para sua empresa.
                </p>
            </div>

            <ProLaboreCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>O que é Pró-Labore?</h2>
                <p>
                    Pró-labore é a remuneração dos sócios que trabalham na empresa. É obrigatório para sócios que exercem atividades na empresa.
                </p>
                <h3>Impostos sobre Pró-Labore</h3>
                <ul>
                    <li><strong>INSS:</strong> 11% (contribuinte individual)</li>
                    <li><strong>INSS Patronal:</strong> 20% (custo da empresa)</li>
                    <li><strong>IRRF:</strong> Conforme tabela progressiva</li>
                </ul>
            </div>
        </div>
    )
}
