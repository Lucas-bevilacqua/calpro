import { Metadata } from "next"
import { AvisoPrevioCalculator } from "@/components/calculators/aviso-previo-calculator"

export const metadata: Metadata = {
    title: "Calculadora de Aviso Prévio 2024 | calcprobr.com",
    description: "Calcule o valor e dias de aviso prévio. Inclui dias adicionais por tempo de serviço conforme CLT.",
    keywords: ["aviso prévio", "cálculo aviso prévio", "dias aviso prévio", "indenização"],
}

export default function AvisoPrevioPage() {
    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8 md:space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">Calculadora de Aviso Prévio</h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                    Calcule quantos dias você deve trabalhar e quanto vai receber de aviso prévio.
                </p>
            </div>

            <AvisoPrevioCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o Aviso Prévio?</h2>
                <p>
                    O aviso prévio é o período entre a comunicação da demissão e o último dia de trabalho.
                </p>
                <h3>Regras do Aviso Prévio</h3>
                <ul>
                    <li><strong>Dias base:</strong> 30 dias</li>
                    <li><strong>Dias adicionais:</strong> 3 dias por ano trabalhado (máximo 60 dias)</li>
                    <li><strong>Total máximo:</strong> 90 dias (30 + 60)</li>
                </ul>
                <h3>Tipos de Aviso</h3>
                <ul>
                    <li><strong>Trabalhado:</strong> Você trabalha normalmente durante o período</li>
                    <li><strong>Indenizado:</strong> Você recebe o valor sem trabalhar</li>
                </ul>
            </div>
        </div>
    )
}
