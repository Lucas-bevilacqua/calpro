import { Metadata } from "next"
import { RescisaoForm } from "@/components/calculators/rescisao-form"
import { AdBanner, AdInArticle } from "@/components/ads/google-adsense"
import { ShareButtons } from "@/components/ui/share-buttons"
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup"

export const metadata: Metadata = {
    title: "Calculadora de Rescisão Trabalhista 2025 (Exata e Grátis) | CalcPro",
    description: "Calcule o valor exato da sua rescisão de contrato. Inclui multa de 40% do FGTS, aviso prévio, férias e 13º salário. Atualizada com as novas regras da CLT.",
    keywords: ["calculadora rescisão", "calcular acerto trabalhista", "rescisão clt", "multa 40 fgts", "aviso prévio indenizado"],
}

const faqData = [
    {
        question: "O que é pago na rescisão sem justa causa?",
        answer: "Na demissão sem justa causa, você recebe: Saldo de salário (dias trabalhados), Aviso prévio (trabalhado ou indenizado), 13º salário proporcional, Férias vencidas e proporcionais (+1/3), e Multa de 40% sobre o saldo do FGTS."
    },
    {
        question: "Como funciona o aviso prévio indenizado?",
        answer: "Se a empresa decidir que você não precisa trabalhar durante o aviso, ela deve pagar o salário desse período (30 dias + 3 dias por ano de empresa) como indenização. Esse valor não tem desconto de INSS e IRRF."
    },
    {
        question: "Qual o prazo para pagamento da rescisão?",
        answer: "Pela nova regra da CLT (Reforma Trabalhista), a empresa tem até 10 dias corridos após o término do contrato para pagar as verbas rescisórias, independentemente do tipo de aviso prévio."
    },
    {
        question: "Tenho direito ao Seguro-Desemprego?",
        answer: "Sim, se você foi demitido sem justa causa e trabalhou pelo menos 12 meses nos últimos 18 meses (para a primeira solicitação). O valor depende da média dos seus últimos 3 salários."
    }
]

export default function RescisaoPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            {/* Ad Banner - Top */}
            <div className="max-w-4xl mx-auto mb-6 md:mb-8">
                <AdBanner />
            </div>

            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Calculadora de Rescisão Trabalhista
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Descubra exatamente quanto você tem a receber. Cálculo completo com multa do FGTS, aviso prévio e descontos oficiais de 2025.
                </p>
            </div>

            <RescisaoForm />

            {/* Ad In-Article - Middle */}
            <div className="max-w-4xl mx-auto my-8 md:my-12">
                <AdInArticle />
            </div>

            <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert">
                <h2>Entenda seu Cálculo de Rescisão</h2>
                <p>
                    Sair de um emprego gera muitas dúvidas. Nossa calculadora segue rigorosamente as regras da <strong>Consolidação das Leis do Trabalho (CLT)</strong> para garantir que você saiba seus direitos.
                </p>

                <h3>O que entra na conta?</h3>
                <div className="grid sm:grid-cols-2 gap-4 not-prose my-6">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                        <h4 className="font-semibold text-primary mb-2">🟢 O que você recebe (Proventos)</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Saldo de Salário (dias trabalhados)</li>
                            <li>• Aviso Prévio (se indenizado)</li>
                            <li>• 13º Salário Proporcional</li>
                            <li>• Férias Vencidas + 1/3</li>
                            <li>• Férias Proporcionais + 1/3</li>
                            <li>• Multa de 40% do FGTS</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                        <h4 className="font-semibold text-destructive mb-2">🔴 O que é descontado (Descontos)</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• INSS (Previdência Social)</li>
                            <li>• IRRF (Imposto de Renda)</li>
                            <li>• Adiantamentos recebidos</li>
                            <li>• Vale-transporte (dias não trabalhados)</li>
                        </ul>
                    </div>
                </div>

                <h3>Dúvidas Comuns sobre Rescisão</h3>

                <h4>Como funciona o Aviso Prévio Proporcional?</h4>
                <p>
                    Além dos 30 dias padrão, a Lei 12.506/2011 garante <strong>3 dias a mais de aviso para cada ano completo</strong> trabalhado na empresa, até o limite de 90 dias totais (20 anos de casa).
                </p>
                <p>
                    <em>Exemplo: Se você trabalhou 2 anos, seu aviso prévio será de 36 dias (30 + 6).</em>
                </p>

                <h4>Sobre a Multa do FGTS</h4>
                <p>
                    Se a demissão for <strong>sem justa causa</strong>, a empresa deve depositar uma multa de 40% sobre todo o valor que ela depositou no seu FGTS durante o contrato. Esse valor é seu e pode ser sacado junto com o saldo.
                </p>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-xl border border-blue-100 dark:border-blue-900 my-8 not-prose">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Dica de Especialista</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                        Sempre confira o <strong>TRCT (Termo de Rescisão do Contrato de Trabalho)</strong>. Se houver divergência de valores ou se a empresa não pagar em até 10 dias, você pode ter direito a uma multa no valor de um salário seu (Art. 477 da CLT).
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <ShareButtons
                    title="Calculadora de Rescisão Trabalhista - CalcPro"
                    description="Calculei minha rescisão exata aqui. Ferramenta gratuita e atualizada!"
                />
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema(
                    "Calculadora de Rescisão Trabalhista",
                    "Calcule sua rescisão exata com multa do FGTS e aviso prévio.",
                    "https://calcprobr.com/calculadora/trabalhista/rescisao-trabalhista"
                ),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    )
}
