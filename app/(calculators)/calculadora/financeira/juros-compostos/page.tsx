import { Metadata } from "next";
import { JurosCompostosForm } from "@/components/calculators/juros-compostos-form";
import { ShareButtons } from "@/components/ui/share-buttons";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
    title: "Calculadora de Juros Compostos (Simulador de Investimentos) | CalcPro",
    description: "Simule o crescimento do seu patrimônio com juros compostos. Veja o efeito 'bola de neve' nos seus investimentos mensais a longo prazo.",
    keywords: ["calculadora juros compostos", "simulador de investimentos", "calcular rendimento", "juros sobre juros", "futuro financeiro"],
};

const faqData = [
    {
        question: "O que são juros compostos?",
        answer: "É quando o juro do mês seguinte é calculado sobre o valor inicial + os juros acumulados dos meses anteriores. É o famoso 'juros sobre juros', que faz o dinheiro crescer exponencialmente."
    },
    {
        question: "Qual a diferença para juros simples?",
        answer: "Nos juros simples, o rendimento é sempre calculado apenas sobre o valor inicial. Nos compostos, a base de cálculo aumenta todo mês, gerando muito mais lucro a longo prazo."
    },
    {
        question: "Como converter taxa anual para mensal?",
        answer: "Em juros compostos, não basta dividir por 12. A fórmula é: (1 + taxa anual)^(1/12) - 1. Nossa calculadora faz essa conversão automaticamente para você."
    }
];

export default function JurosCompostosPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Calculadora de Juros Compostos
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    A "Oitava Maravilha do Mundo" a seu favor. Simule quanto seu dinheiro pode render com o tempo.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <JurosCompostosForm />
            </div>

            <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
                <h2>O Poder dos Juros Compostos</h2>
                <p>
                    Albert Einstein teria dito que "os juros compostos são a força mais poderosa do universo". Exageros à parte, matematicamente eles são a chave para construir riqueza.
                </p>

                <div className="bg-card p-6 rounded-xl border shadow-sm my-8 not-prose">
                    <h3 className="text-xl font-bold mb-4">📈 A Curva Exponencial</h3>
                    <p className="text-muted-foreground mb-4">
                        No começo, o crescimento parece lento. Mas após alguns anos, os juros começam a render mais do que os seus próprios depósitos mensais.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-primary">Fase de Acumulação</h4>
                            <p className="text-sm text-muted-foreground">
                                Nos primeiros anos, o esforço vem do seu bolso (aportes mensais). É preciso paciência e constância.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-primary">Fase de Multiplicação</h4>
                            <p className="text-sm text-muted-foreground">
                                A partir de um certo ponto, o rendimento mensal supera o valor do seu aporte. O dinheiro passa a "trabalhar sozinho".
                            </p>
                        </div>
                    </div>
                </div>

                <h3>Dicas para Maximizar seus Ganhos</h3>
                <ul>
                    <li><strong>Comece cedo:</strong> O tempo é o fator mais importante na fórmula (ele é o expoente!).</li>
                    <li><strong>Aporte mensalmente:</strong> A constância vale mais do que acertar o "investimento do momento".</li>
                    <li><strong>Reinvista os dividendos:</strong> Se você gasta os rendimentos, quebra o efeito dos juros compostos.</li>
                </ul>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <ShareButtons
                    title="Simulador de Juros Compostos - CalcPro"
                    description="Veja quanto seu dinheiro pode render com juros compostos!"
                />
            </div>

            <SchemaMarkup data={{
                ...generateWebApplicationSchema(
                    "Calculadora de Juros Compostos",
                    "Simule investimentos e veja o crescimento patrimonial com juros compostos.",
                    "https://calcprobr.com/calculadora/financeira/juros-compostos"
                ),
                ...generateFAQSchema(faqData)
            }} />
        </div>
    );
}
