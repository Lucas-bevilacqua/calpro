import { Metadata } from "next"
import { HorasExtrasForm } from "@/components/calculators/horas-extras-form"
import { ShareButtons } from "@/components/ui/share-buttons"
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup"

export const metadata: Metadata = {
    title: "Calculadora de Horas Extras 2025 (50% e 100%) | CalcPro",
    description: "Calcule o valor exato das suas horas extras. Inclui cálculo automático do DSR (Descanso Semanal Remunerado) e adicionais noturnos ou de feriados.",
    keywords: ["calculadora horas extras", "calcular hora extra", "valor hora extra 50", "hora extra 100", "dsr horas extras"],
}

const faqData = [
    {
        question: "Como calcular o valor da hora extra?",
        answer: "Divida seu salário pela carga horária mensal (ex: 220h) para achar o valor da hora normal. Depois, acrescente a porcentagem do adicional (50% para dias úteis, 100% para domingos/feriados)."
    },
    {
        question: "O que é DSR sobre horas extras?",
        answer: "DSR é o Descanso Semanal Remunerado. Quem faz horas extras tem direito a receber um valor adicional no descanso, proporcional à quantidade de horas extras feitas no mês."
    },
    {
        question: "Qual o limite de horas extras por dia?",
        answer: "Pela CLT, o limite máximo é de 2 horas extras por dia. O que passar disso pode configurar irregularidade, exceto em casos de força maior ou serviços inadiáveis."
    }
]

export default function HorasExtrasPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Calculadora de Horas Extras
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Trabalhou a mais? Veja quanto isso vale no seu bolso. Cálculo completo com reflexo no DSR.
                </p>
            </div>

            <HorasExtrasForm />

            <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
                <h2>Como Calcular Horas Extras Corretamente</h2>
                <p>
                    A hora extra é um dos cálculos que mais geram erros nos pagamentos. Para não ser prejudicado, você precisa entender os três componentes da conta:
                </p>

                <div className="grid sm:grid-cols-3 gap-4 not-prose my-8">
                    <div className="bg-card p-4 rounded-lg border text-center">
                        <div className="text-2xl font-bold text-primary mb-1">1º</div>
                        <div className="font-semibold">Hora Normal</div>
                        <div className="text-xs text-muted-foreground mt-2">Salário ÷ 220</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border text-center">
                        <div className="text-2xl font-bold text-primary mb-1">2º</div>
                        <div className="font-semibold">Adicional</div>
                        <div className="text-xs text-muted-foreground mt-2">+50% ou +100%</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border text-center">
                        <div className="text-2xl font-bold text-primary mb-1">3º</div>
                        <div className="font-semibold">Reflexo DSR</div>
                        <div className="text-xs text-muted-foreground mt-2">Valor HE ÷ Dias Úteis × Domingos</div>
                    </div>
                </div>

                <h3>O "Pulo do Gato": O DSR</h3>
                <p>
                    Muita gente esquece do <strong>Descanso Semanal Remunerado (DSR)</strong>. Se você trabalha a mais durante a semana, seu descanso (domingo) também "vale mais".
                </p>
                <p>
                    A fórmula é: <code>(Valor Total das Horas Extras ÷ Dias Úteis do Mês) × Dias de Descanso (Domingos e Feriados)</code>.
                </p>
                <p>
                    <em>Exemplo: Se você fez R$ 500,00 de horas extras num mês com 25 dias úteis e 5 domingos, você recebe mais R$ 100,00 de DSR (500 ÷ 25 × 5).</em>
                </p>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <ShareButtons
                    title="Calculadora de Horas Extras - CalcPro"
                    description="Veja quanto você vai receber de horas extras. Cálculo com DSR incluso!"
                />
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema(
                    "Calculadora de Horas Extras",
                    "Calcule o valor das suas horas extras com DSR.",
                    "https://calcprobr.com/calculadora/trabalhista/horas-extras"
                ),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    )
}
