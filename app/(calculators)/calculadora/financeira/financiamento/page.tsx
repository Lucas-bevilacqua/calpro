import { Metadata } from "next"
import { FinanciamentoForm } from "@/components/calculators/financiamento-form"
import { ShareButtons } from "@/components/ui/share-buttons"
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup"

export const metadata: Metadata = {
    title: "Calculadora de Financiamento (SAC vs Price) | Comparador Grátis",
    description: "Simule seu financiamento imobiliário ou de veículo. Compare Tabela SAC (parcelas decrescentes) e Tabela Price (fixas) e veja qual paga menos juros.",
    keywords: ["simulador financiamento", "tabela sac ou price", "calcular financiamento imobiliario", "juros financiamento", "amortização"],
}

const faqData = [
    {
        question: "Qual a melhor tabela: SAC ou Price?",
        answer: "Depende do seu fluxo de caixa. A SAC começa com parcelas mais altas que diminuem, resultando em menos juros totais. A Price tem parcelas fixas (menores no início), mas paga-se mais juros no final. Para economizar, SAC geralmente é melhor."
    },
    {
        question: "Como funciona a amortização?",
        answer: "Amortização é a parte da parcela que realmente abate sua dívida. O resto é juros. No sistema SAC, a amortização é constante. Na Price, ela começa baixa e aumenta ao longo do tempo."
    },
    {
        question: "Posso mudar de SAC para Price depois?",
        answer: "Geralmente não. A escolha do sistema de amortização é feita na assinatura do contrato. Porém, você pode fazer a portabilidade do financiamento para outro banco que ofereça condições melhores."
    }
]

export default function FinanciamentoPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Simulador de Financiamento
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    SAC ou Price? Simule as parcelas, veja o total de juros e descubra qual opção economiza mais dinheiro no seu bolso.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <FinanciamentoForm />
            </div>

            <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
                <h2>SAC vs Price: O Guia Definitivo</h2>
                <p>
                    A dúvida mais comum na hora de financiar um imóvel ou carro é: <em>"Qual tabela eu escolho?"</em>. A resposta errada pode custar milhares de reais em juros. Vamos entender as diferenças reais.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            📉 Tabela SAC
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Mais Econômica</span>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">Sistema de Amortização Constante</p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">✅ <strong>Juros Totais Menores:</strong> Você paga menos no final.</li>
                            <li className="flex gap-2">✅ <strong>Parcelas Decrescentes:</strong> Começa alto, termina baixo.</li>
                            <li className="flex gap-2">❌ <strong>Entrada Maior:</strong> Exige comprovação de renda maior no início.</li>
                        </ul>
                    </div>

                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            ➖ Tabela Price
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">Parcela Fixa</span>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">Sistema Francês de Amortização</p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">✅ <strong>Parcela Inicial Menor:</strong> Cabe mais fácil no bolso hoje.</li>
                            <li className="flex gap-2">✅ <strong>Previsibilidade:</strong> Valor fixo do início ao fim.</li>
                            <li className="flex gap-2">❌ <strong>Mais Juros:</strong> O saldo devedor cai mais devagar.</li>
                        </ul>
                    </div>
                </div>

                <h3>Exemplo Prático (R$ 200.000 em 30 anos)</h3>
                <p>
                    Imagine um financiamento com juros de 10% ao ano.
                </p>
                <ul>
                    <li><strong>No SAC:</strong> Você começaria pagando uns R$ 2.200 e terminaria pagando R$ 560. Total pago: ~R$ 500 mil.</li>
                    <li><strong>Na Price:</strong> Você pagaria R$ 1.750 fixos por 30 anos. Total pago: ~R$ 630 mil.</li>
                </ul>
                <p>
                    <strong>Conclusão:</strong> Se você aguenta a parcela inicial mais alta, vá de <strong>SAC</strong>. Se precisa que a parcela caiba no orçamento apertado agora, vá de <strong>Price</strong> (mas saiba que pagará mais caro pelo "aluguel" do dinheiro).
                </p>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <ShareButtons
                    title="Simulador de Financiamento SAC vs Price"
                    description="Comparei meu financiamento aqui. Veja qual tabela vale mais a pena!"
                />
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema(
                    "Calculadora de Financiamento SAC/Price",
                    "Simule e compare tabelas SAC e Price para financiamento imobiliário.",
                    "https://calcprobr.com/calculadora/financeira/financiamento"
                ),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    )
}
