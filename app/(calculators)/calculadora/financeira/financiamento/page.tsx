import { Metadata } from "next";
import { FinanciamentoForm } from "@/components/calculators/financiamento-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
    title: "Calculadora de Financiamento SAC e Price | calcprobr.com",
    description: "Simule seu financiamento imobiliário ou de veículos. Compare as tabelas SAC (parcelas decrescentes) e Price (parcelas fixas).",
    keywords: ["calculadora financiamento", "tabela sac", "tabela price", "simulador habitacional", "financiamento imobiliario"],
};

const faqData = [
    {
        question: "Qual a diferença entre SAC e Price?",
        answer: "No SAC (Sistema de Amortização Constante), as parcelas começam mais altas e diminuem ao longo do tempo. Na Tabela Price, as parcelas são fixas do início ao fim."
    },
    {
        question: "Qual sistema paga menos juros?",
        answer: "Geralmente, o sistema SAC resulta em um montante total de juros menor, pois a amortização do saldo devedor é mais rápida no início do contrato."
    }
];

export default function FinanciamentoPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Calculadora de Financiamento
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Compare os sistemas SAC e Price e veja qual a melhor opção para o seu bolso.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <FinanciamentoForm />
            </div>

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Entendendo os Sistemas</h2>
                <h3>Tabela SAC</h3>
                <p>
                    O Sistema de Amortização Constante é o mais utilizado em financiamentos imobiliários no Brasil. A principal característica é que o valor que você abate da dívida (amortização) é igual todos os meses. Como os juros são calculados sobre o saldo devedor (que diminui todo mês), o valor da parcela cai ao longo do tempo.
                </p>
                <h3>Tabela Price</h3>
                <p>
                    Também conhecido como Sistema Francês de Amortização, é muito usado em financiamentos de veículos e empréstimos pessoais. A parcela é fixa, mas a composição muda: no começo você paga mais juros e menos amortização; no final, é o contrário.
                </p>
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema("Calculadora de Financiamento", "Simule financiamentos SAC e Price.", "https://calcprobr.com/calculadora/financeira/financiamento"),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    );
}
