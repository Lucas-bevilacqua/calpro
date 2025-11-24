import { Metadata } from "next"
import { PontoEquilibrioCalculator } from "@/components/calculators/ponto-equilibrio-calculator"

export const metadata: Metadata = {
    title: "Calculadora de Ponto de Equilíbrio (Break-Even) 2024 | calcprobr.com",
    description: "Calcule o ponto de equilíbrio do seu negócio. Descubra quantas vendas precisa fazer para cobrir custos.",
    keywords: ["ponto de equilíbrio", "break-even", "margem de contribuição", "custos fixos"],
}

export default function PontoEquilibrioPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de Ponto de Equilíbrio</h1>
                <p className="text-xl text-muted-foreground">
                    Descubra quantas unidades você precisa vender para não ter prejuízo.
                </p>
            </div>

            <PontoEquilibrioCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>O que é Ponto de Equilíbrio?</h2>
                <p>
                    É o momento em que a receita total se iguala aos custos totais. A partir desse ponto, você começa a ter lucro.
                </p>
                <h3>Fórmula</h3>
                <p>
                    <code>Ponto de Equilíbrio = Custos Fixos / Margem de Contribuição</code>
                </p>
            </div>
        </div>
    )
}
