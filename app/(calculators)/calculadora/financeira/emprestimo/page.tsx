import { Metadata } from "next"
import { EmprestimoCalculator } from "@/components/calculators/emprestimo-calculator"

export const metadata: Metadata = {
    title: "Calculadora de Empréstimo Pessoal 2024 | calcprobr.com",
    description: "Calcule as parcelas do seu empréstimo pessoal. Veja quanto vai pagar de juros e o custo total.",
    keywords: ["empréstimo pessoal", "calcular empréstimo", "parcelas empréstimo", "juros empréstimo"],
}

export default function EmprestimoPage() {
    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8 md:space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">Calculadora de Empréstimo Pessoal</h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                    Simule seu empréstimo e descubra o valor das parcelas e total de juros.
                </p>
            </div>

            <EmprestimoCalculator />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o cálculo?</h2>
                <p>
                    Usamos o Sistema Price (Tabela Price), onde as parcelas são fixas durante todo o período.
                </p>
                <h3>Dicas para Empréstimo</h3>
                <ul>
                    <li>Compare taxas de diferentes bancos</li>
                    <li>Prefira prazos menores para pagar menos juros</li>
                    <li>Evite comprometer mais de 30% da renda</li>
                </ul>
            </div>
        </div>
    )
}
