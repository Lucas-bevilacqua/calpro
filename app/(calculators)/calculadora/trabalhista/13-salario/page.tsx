import { Metadata } from "next"
import { DecimoTerceiroForm } from "@/components/calculators/decimo-terceiro-form"
import { ShareButtons } from "@/components/ui/share-buttons"
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup"

export const metadata: Metadata = {
    title: "Calculadora de 13º Salário 2025 (1ª e 2ª Parcela) | CalcPro",
    description: "Descubra o valor exato do seu 13º Salário. Calcule a primeira parcela (sem descontos) e a segunda parcela (com INSS e IRRF). Atualizado 2025.",
    keywords: ["calculadora 13 salario", "calcular decimo terceiro", "primeira parcela 13", "segunda parcela 13", "descontos 13 salario"],
}

const faqData = [
    {
        question: "Quando cai a primeira parcela do 13º?",
        answer: "A primeira parcela deve ser paga entre 1º de fevereiro e 30 de novembro. Ela corresponde a 50% do salário bruto, sem nenhum desconto."
    },
    {
        question: "Quando cai a segunda parcela do 13º?",
        answer: "A segunda parcela deve ser paga até o dia 20 de dezembro. Nela são descontados o INSS e o Imposto de Renda sobre o valor total do benefício."
    },
    {
        question: "Quem tem direito ao Décimo Terceiro?",
        answer: "Todo trabalhador com carteira assinada (CLT), aposentados, pensionistas e servidores públicos. É necessário ter trabalhado pelo menos 15 dias no ano para ter direito a 1/12 do valor."
    },
    {
        question: "Como calcular 13º proporcional?",
        answer: "Divida seu salário por 12 e multiplique pelo número de meses trabalhados no ano. Lembre-se que fração igual ou superior a 15 dias conta como mês inteiro."
    }
]

export default function DecimoTerceiroPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Calculadora de 13º Salário
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Saiba exatamente quanto vai cair na conta. Simule a 1ª parcela (adiantamento) e a 2ª parcela com todos os descontos.
                </p>
            </div>

            <DecimoTerceiroForm />

            <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
                <h2>O Guia Completo do 13º Salário</h2>
                <p>
                    O Décimo Terceiro Salário, ou Gratificação de Natal, é um dos direitos mais aguardados pelos trabalhadores. Mas o cálculo pode confundir, principalmente por causa da divisão em duas parcelas com regras diferentes.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                    <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl border border-green-100 dark:border-green-900">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-100 mb-2">💰 1ª Parcela (Adiantamento)</h3>
                        <p className="text-sm text-green-700 dark:text-green-200 mb-4">Paga até 30 de Novembro</p>
                        <ul className="space-y-2 text-sm text-green-800 dark:text-green-100">
                            <li>✅ <strong>50% do salário bruto</strong></li>
                            <li>✅ <strong>Sem descontos</strong> (INSS/IRRF)</li>
                            <li>✅ Cai "limpo" na conta</li>
                        </ul>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border border-amber-100 dark:border-amber-900">
                        <h3 className="text-xl font-bold text-amber-800 dark:text-amber-100 mb-2">📉 2ª Parcela (Acerto)</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-200 mb-4">Paga até 20 de Dezembro</p>
                        <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-100">
                            <li>🔻 <strong>Saldo restante</strong></li>
                            <li>🔻 <strong>Desconto do INSS</strong> (sobre o total)</li>
                            <li>🔻 <strong>Desconto do IRRF</strong> (sobre o total)</li>
                            <li>🔻 <strong>Valor menor</strong> que a 1ª parcela</li>
                        </ul>
                    </div>
                </div>

                <h3>Dúvidas Frequentes</h3>

                <h4>Média de Horas Extras e Comissões</h4>
                <p>
                    Se você faz horas extras ou recebe comissões, o valor do 13º deve incluir a média desses valores recebidos durante o ano. Nossa calculadora permite inserir esses adicionais para um cálculo preciso.
                </p>

                <h4>Descontos na 2ª Parcela</h4>
                <p>
                    É comum se assustar com o valor da segunda parcela. Isso acontece porque o INSS e o Imposto de Renda são calculados sobre o <strong>valor total</strong> do 13º, e descontados integralmente nesta parcela final.
                </p>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <ShareButtons
                    title="Calculadora de 13º Salário - CalcPro"
                    description="Veja quanto você vai receber de Décimo Terceiro. Cálculo exato das parcelas!"
                />
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema(
                    "Calculadora de 13º Salário",
                    "Calcule a primeira e segunda parcela do seu décimo terceiro salário.",
                    "https://calcprobr.com/calculadora/trabalhista/13-salario"
                ),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    )
}
