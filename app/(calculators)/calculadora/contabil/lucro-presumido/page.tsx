import { Metadata } from "next"
import { LucroPresumidoCalculator } from "@/components/calculators/lucro-presumido-calculator"

export const metadata: Metadata = {
    title: "Calculadora de Lucro Presumido 2024 | calcprobr.com",
    description: "Calcule os impostos no Lucro Presumido: IRPJ, CSLL, PIS e COFINS. Veja a alíquota efetiva.",
    keywords: ["lucro presumido", "impostos lucro presumido", "IRPJ", "CSLL"],
}

export default function LucroPresumidoPage() {
    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8 md:space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">Calculadora de Lucro Presumido</h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                    Calcule os impostos federais no regime de Lucro Presumido.
                </p>
            </div>

            <LucroPresumidoCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o Lucro Presumido?</h2>
                <p>
                    No Lucro Presumido, a Receita Federal presume um percentual de lucro sobre o faturamento para calcular IRPJ e CSLL.
                </p>
                <h3>Presunção de Lucro</h3>
                <ul>
                    <li><strong>Comércio/Indústria:</strong> 8% do faturamento</li>
                    <li><strong>Serviços:</strong> 32% do faturamento</li>
                </ul>
            </div>
        </div>
    )
}
