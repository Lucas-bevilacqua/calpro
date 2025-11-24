import { Metadata } from "next"
import { FGTSCalculator } from "@/components/calculators/fgts-calculator"

export const metadata: Metadata = {
    title: "Calculadora de FGTS 2024 | calcprobr.com",
    description: "Calcule seu saldo de FGTS, depósitos mensais e rendimento. Simule quanto você tem acumulado.",
    keywords: ["FGTS", "fundo de garantia", "saldo FGTS", "rendimento FGTS"],
}

export default function FGTSPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de FGTS</h1>
                <p className="text-xl text-muted-foreground">
                    Descubra quanto você tem de FGTS acumulado e quanto seu empregador deposita por mês.
                </p>
            </div>

            <FGTSCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o FGTS?</h2>
                <p>
                    O FGTS (Fundo de Garantia do Tempo de Serviço) é um depósito mensal de 8% do seu salário feito pelo empregador.
                </p>
                <h3>Quando posso sacar?</h3>
                <ul>
                    <li>Demissão sem justa causa</li>
                    <li>Compra da casa própria</li>
                    <li>Aposentadoria</li>
                    <li>Doenças graves</li>
                </ul>
            </div>
        </div>
    )
}
