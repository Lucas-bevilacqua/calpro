import { Metadata } from "next"
import { DecimoTerceiroForm } from "@/components/calculators/decimo-terceiro-form"

export const metadata: Metadata = {
    title: "Calculadora de 13º Salário 2025 - Primeira e Segunda Parcela | CalcPro.br",
    description: "Calcule o valor exato do seu Décimo Terceiro Salário. Veja quanto receber na primeira parcela (adiantamento) e na segunda parcela com descontos.",
    keywords: ["calculadora 13 salario", "calcular decimo terceiro", "primeira parcela 13", "segunda parcela 13"],
}

export default function DecimoTerceiroPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de 13º Salário</h1>
                <p className="text-xl text-muted-foreground">
                    Saiba exatamente quanto vai cair na sua conta no final do ano.
                </p>
            </div>

            <DecimoTerceiroForm />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o pagamento do 13º?</h2>
                <p>
                    O benefício é pago em duas parcelas:
                </p>
                <ul>
                    <li><strong>1ª Parcela (até 30 de novembro):</strong> Corresponde a 50% do salário bruto, sem descontos.</li>
                    <li><strong>2ª Parcela (até 20 de dezembro):</strong> É o restante do valor, mas com os descontos de INSS e Imposto de Renda sobre o valor total.</li>
                </ul>

                <h3>Quem tem direito?</h3>
                <p>
                    Todo trabalhador com carteira assinada (CLT) que trabalhou pelo menos 15 dias no ano. O valor é proporcional aos meses trabalhados.
                </p>
            </div>
        </div>
    )
}
