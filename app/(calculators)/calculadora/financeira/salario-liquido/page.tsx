import { Metadata } from "next";
import { SalarioLiquidoForm } from "@/components/calculators/salario-liquido-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
    title: "Calculadora de Salário Líquido 2025 - CLT | calcprobr.com",
    description: "Calcule seu salário líquido exato com os descontos de INSS e Imposto de Renda (IRRF) 2025. Descubra quanto cai na sua conta.",
    keywords: ["calculadora salario liquido", "calcular salario liquido", "desconto inss", "desconto irrf", "salario liquido 2025"],
};

const faqData = [
    {
        question: "O que é descontado do salário bruto?",
        answer: "Os principais descontos são o INSS (Previdência Social) e o IRRF (Imposto de Renda). Outros descontos podem incluir vale-transporte, plano de saúde e pensão alimentícia."
    },
    {
        question: "Como é calculado o INSS em 2025?",
        answer: "O INSS é calculado com alíquotas progressivas que variam de 7,5% a 14%, dependendo da faixa salarial. O teto de desconto é limitado ao teto do INSS."
    }
];

export default function SalarioLiquidoPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Calculadora de Salário Líquido
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Faça o cálculo exato do seu salário líquido com as tabelas de 2025.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <SalarioLiquidoForm />
            </div>

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como calcular o Salário Líquido?</h2>
                <p>
                    Para chegar ao valor líquido, partimos do salário bruto e subtraímos os descontos obrigatórios:
                </p>
                <ol>
                    <li><strong>INSS:</strong> Calculado primeiro, com alíquotas progressivas sobre o bruto.</li>
                    <li><strong>IRRF:</strong> Calculado sobre o (Bruto - INSS - Dedução por Dependente).</li>
                    <li><strong>Outros:</strong> Subtraímos outros descontos eventuais (plano de saúde, etc).</li>
                </ol>
                <p>
                    O resultado é o valor que efetivamente será depositado na sua conta.
                </p>
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema("Calculadora de Salário Líquido", "Calcule seu salário líquido online.", "https://calcprobr.com/calculadora/financeira/salario-liquido"),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    );
}
