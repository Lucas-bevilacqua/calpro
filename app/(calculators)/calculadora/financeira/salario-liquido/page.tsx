import { Metadata } from "next";
import { SalarioLiquidoForm } from "@/components/calculators/salario-liquido-form";
import { ShareButtons } from "@/components/ui/share-buttons";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
    title: "Calculadora de Salário Líquido 2025 (INSS e IRRF) | CalcPro",
    description: "Calcule seu salário líquido oficial. Veja a tabela de descontos do INSS e Imposto de Renda 2025. Saiba exatamente quanto cai na conta.",
    keywords: ["calculadora salario liquido", "desconto inss 2025", "tabela irrf 2025", "calcular salario real", "salario liquido clt"],
};

const faqData = [
    {
        question: "O que é descontado do meu salário?",
        answer: "Os descontos obrigatórios são o INSS (aposentadoria) e o IRRF (Imposto de Renda). Também podem haver descontos de benefícios como Vale-Transporte (até 6%), Plano de Saúde e Pensão Alimentícia."
    },
    {
        question: "Como funciona o desconto do INSS em 2025?",
        answer: "O INSS é progressivo. Você paga uma alíquota diferente para cada faixa do seu salário (7,5%, 9%, 12% e 14%). O desconto não é uma porcentagem única sobre o total."
    },
    {
        question: "Quem precisa pagar Imposto de Renda (IRRF)?",
        answer: "Quem ganha acima de R$ 2.259,20 (após deduzir o INSS) começa a pagar IRRF. O imposto também é progressivo, com alíquotas de 7,5% a 27,5%."
    }
];

export default function SalarioLiquidoPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Calculadora de Salário Líquido
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Bruto vs Líquido: Entenda para onde vai o seu dinheiro e quanto realmente sobra no final do mês.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <SalarioLiquidoForm />
            </div>

            <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
                <h2>Entenda seu Holerite (Contracheque)</h2>
                <p>
                    É comum olhar para o salário bruto na carteira de trabalho e se decepcionar com o valor que cai na conta. A diferença são os descontos obrigatórios do governo.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-400">1. INSS (Previdência)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Garante sua aposentadoria e auxílios.
                        </p>
                        <p className="text-sm">
                            O cálculo é <strong>progressivo</strong>. Isso significa que quem ganha mais, paga uma alíquota maior, mas apenas sobre a parcela do salário que atinge aquela faixa.
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">2. IRRF (Imposto de Renda)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            O "Leão" morde uma parte do que sobra.
                        </p>
                        <p className="text-sm">
                            É calculado sobre o salário <strong>já descontado o INSS</strong>. Quem tem dependentes (filhos, cônjuge) paga menos imposto.
                        </p>
                    </div>
                </div>

                <h3>Outros Descontos Comuns</h3>
                <ul>
                    <li><strong>Vale-Transporte:</strong> A empresa pode descontar até 6% do seu salário base.</li>
                    <li><strong>Vale-Refeição/Alimentação:</strong> A empresa pode descontar até 20% do valor do benefício (mas geralmente descontam um valor simbólico).</li>
                    <li><strong>Atrasos e Faltas:</strong> Dias não trabalhados sem justificativa são descontados.</li>
                </ul>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <ShareButtons
                    title="Calculadora de Salário Líquido - CalcPro"
                    description="Veja quanto sobra do seu salário depois dos descontos!"
                />
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema(
                    "Calculadora de Salário Líquido",
                    "Calcule seu salário líquido com descontos de INSS e IRRF.",
                    "https://calcprobr.com/calculadora/financeira/salario-liquido"
                ),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    );
}
