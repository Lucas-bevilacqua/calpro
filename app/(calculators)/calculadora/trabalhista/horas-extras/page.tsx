import { Metadata } from "next"
import { HorasExtrasForm } from "@/components/calculators/horas-extras-form"

export const metadata: Metadata = {
    title: "Calculadora de Horas Extras 2025 - Com DSR | calcprobr.com",
    description: "Calcule o valor das suas horas extras online. Inclui cálculo automático do DSR (Descanso Semanal Remunerado) e adicionais de 50% e 100%.",
    keywords: ["calculadora horas extras", "calcular hora extra", "valor hora extra", "dsr horas extras"],
}

export default function HorasExtrasPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de Horas Extras</h1>
                <p className="text-xl text-muted-foreground">
                    Descubra quanto você vai receber pelas horas trabalhadas a mais. Cálculo completo com DSR.
                </p>
            </div>

            <HorasExtrasForm />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como calcular Horas Extras?</h2>
                <p>
                    O cálculo da hora extra envolve três passos principais:
                </p>
                <ol>
                    <li><strong>Valor da Hora Normal:</strong> Divida seu salário pela carga horária mensal (ex: 220h).</li>
                    <li><strong>Valor da Hora Extra:</strong> Acrescente o adicional (geralmente 50% ou 100%) ao valor da hora normal.</li>
                    <li><strong>DSR (Descanso Semanal Remunerado):</strong> As horas extras também geram reflexo no descanso remunerado.</li>
                </ol>

                <h3>Fórmula do DSR sobre Horas Extras</h3>
                <p>
                    <code>DSR = (Total Horas Extras / Dias Úteis) × Domingos e Feriados</code>
                </p>

                <div className="bg-muted p-4 rounded-lg mt-6">
                    <h3 className="mt-0">Exemplo Prático</h3>
                    <p className="mb-0">
                        Se você ganha R$ 2.200,00 e fez 10 horas extras (50%):<br />
                        Hora Normal = R$ 10,00<br />
                        Hora Extra = R$ 15,00<br />
                        Total HE = R$ 150,00<br />
                        DSR (aprox.) = R$ 25,00<br />
                        <strong>Total a Receber = R$ 175,00</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
