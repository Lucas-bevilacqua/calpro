import { Metadata } from "next"
import { IRPFCalculator } from "@/components/calculators/irpf-calculator"

export const metadata: Metadata = {
    title: "Calculadora de Imposto de Renda 2024 (IRPF) | calcprobr.com",
    description: "Calcule seu imposto de renda mensal. Veja qual faixa você se enquadra e quanto vai descontar.",
    keywords: ["IRPF", "imposto de renda", "calcular IR", "tabela IR 2024"],
}

export default function IRPFPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de Imposto de Renda (IRPF)</h1>
                <p className="text-xl text-muted-foreground">
                    Descubra quanto você paga de imposto de renda por mês.
                </p>
            </div>

            <IRPFCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Tabela IRPF 2024</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Faixa</th>
                            <th>Alíquota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Até R$ 2.259,20</td><td>Isento</td></tr>
                        <tr><td>De R$ 2.259,21 a R$ 2.826,65</td><td>7,5%</td></tr>
                        <tr><td>De R$ 2.826,66 a R$ 3.751,05</td><td>15%</td></tr>
                        <tr><td>De R$ 3.751,06 a R$ 4.664,68</td><td>22,5%</td></tr>
                        <tr><td>Acima de R$ 4.664,68</td><td>27,5%</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
