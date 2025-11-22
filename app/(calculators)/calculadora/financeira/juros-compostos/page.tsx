import { Metadata } from "next";
import { JurosCompostosForm } from "@/components/calculators/juros-compostos-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
    title: "Calculadora de Juros Compostos Online | CalcPro.br",
    description: "Simule seus investimentos com juros compostos. Calcule o retorno de aplicações mensais e veja seu patrimônio crescer.",
    keywords: ["calculadora juros compostos", "simulador investimento", "calcular juros", "rendimento composto"],
};

const faqData = [
    {
        question: "O que são juros compostos?",
        answer: "Juros compostos são 'juros sobre juros'. O rendimento de cada mês é somado ao capital inicial, e no mês seguinte o juro é calculado sobre esse novo total, acelerando o crescimento."
    },
    {
        question: "Qual a diferença entre taxa mensal e anual?",
        answer: "A taxa anual é o acumulado de 12 meses. Para converter taxa anual para mensal em juros compostos, usamos a fórmula de equivalência de taxas, não apenas a divisão por 12."
    }
];

export default function JurosCompostosPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Calculadora de Juros Compostos
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Visualize o poder dos juros compostos nos seus investimentos a longo prazo.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <JurosCompostosForm />
            </div>

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o cálculo?</h2>
                <p>
                    A calculadora utiliza a fórmula dos juros compostos com aportes mensais. Ela considera:
                </p>
                <ul>
                    <li><strong>Valor Inicial:</strong> O quanto você tem hoje para investir.</li>
                    <li><strong>Aporte Mensal:</strong> Quanto você vai depositar todo mês.</li>
                    <li><strong>Taxa de Juros:</strong> A rentabilidade esperada do investimento.</li>
                    <li><strong>Tempo:</strong> Por quanto tempo você vai manter o investimento.</li>
                </ul>
                <p>
                    O gráfico mostra a separação entre o dinheiro que você tirou do bolso (Investido) e o dinheiro que o investimento gerou para você (Juros).
                </p>
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema("Calculadora de Juros Compostos", "Simule investimentos com juros compostos.", "https://calcpro.br/calculadora/financeira/juros-compostos"),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    );
}
