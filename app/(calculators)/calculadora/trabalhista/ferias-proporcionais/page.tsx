import { Metadata } from "next";
import { FeriasProporcionaisForm } from "@/components/calculators/ferias-proporcionais-form";
import { ShareButtons } from "@/components/ui/share-buttons";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Férias Proporcionais 2025 (Com 1/3) | CalcPro",
  description: "Calcule o valor exato das suas férias proporcionais + 1/3 constitucional. Entenda a regra dos avos e os descontos na rescisão. Atualizado CLT 2025.",
  keywords: ["férias proporcionais", "calcular férias", "1/3 férias", "férias clt", "avos de férias", "rescisão férias"],
};

const faqs = [
  {
    question: "Como calcular férias proporcionais?",
    answer: "O cálculo é feito em 'avos'. Divida seu salário por 12 e multiplique pelo número de meses trabalhados. Adicione 1/3 a esse valor. Fração de mês superior a 14 dias conta como mês completo."
  },
  {
    question: "O que é o terço constitucional?",
    answer: "É um adicional de 33,33% sobre o valor das férias, garantido pela Constituição Federal. Ele incide sobre férias vencidas, proporcionais e gozadas."
  },
  {
    question: "Quando recebo férias proporcionais?",
    answer: "Você tem direito a receber férias proporcionais na rescisão do contrato de trabalho (pedido de demissão ou demissão sem justa causa). Na justa causa, perde-se esse direito."
  },
  {
    question: "Incide INSS e IRRF sobre férias indenizadas?",
    answer: "Não. Quando as férias são pagas na rescisão (indenizadas), elas não sofrem desconto de INSS nem de Imposto de Renda, pois têm caráter indenizatório."
  }
];

export default function FeriasProporcionaisPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
      <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Calculadora de Férias Proporcionais
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Vai sair da empresa? Calcule quanto você tem a receber de férias proporcionais e o terço constitucional.
        </p>
      </div>

      <FeriasProporcionaisForm />

      <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
        <h2>Entendendo as Férias Proporcionais</h2>
        <p>
          Muitos trabalhadores perdem dinheiro na rescisão por não entenderem a regra dos "avos" de férias. Nossa calculadora faz a conta exata para você não ter prejuízo.
        </p>

        <div className="bg-card p-6 rounded-xl border shadow-sm my-8 not-prose">
          <h3 className="text-xl font-bold mb-4">📅 A Regra dos 15 Dias</h3>
          <p className="text-muted-foreground mb-4">
            Para ganhar direito a 1/12 (um avo) de férias no mês, você precisa ter trabalhado <strong>pelo menos 15 dias</strong> naquele mês.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-100 dark:border-green-900">
              <strong>Exemplo 1:</strong> Saiu dia 14 de Março.<br />
              ❌ Não ganha o avo de Março.
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-100 dark:border-green-900">
              <strong>Exemplo 2:</strong> Saiu dia 16 de Março.<br />
              ✅ Ganha o avo de Março inteiro!
            </div>
          </div>
        </div>

        <h3>Como é feito o cálculo?</h3>
        <ol>
          <li><strong>Valor do Avo:</strong> Dividimos seu salário por 12.</li>
          <li><strong>Quantidade de Avos:</strong> Contamos quantos meses você trabalhou no período aquisitivo atual.</li>
          <li><strong>Terço Constitucional:</strong> Somamos 33,33% ao valor total.</li>
        </ol>

        <p>
          <em>Exemplo: Salário de R$ 1.200,00 e 6 meses trabalhados.</em><br />
          Valor base: R$ 600,00 (6/12)<br />
          Terço (1/3): R$ 200,00<br />
          <strong>Total a receber: R$ 800,00</strong>
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <ShareButtons
          title="Calculadora de Férias Proporcionais - CalcPro"
          description="Calculei minhas férias proporcionais aqui. Veja quanto você tem a receber!"
        />
      </div>

      <SchemaMarkup data={{
        ...generateWebApplicationSchema(
          "Calculadora de Férias Proporcionais",
          "Calcule o valor das férias proporcionais com 1/3 constitucional na rescisão.",
          "https://calcprobr.com/calculadora/trabalhista/ferias-proporcionais"
        ),
        ...generateFAQSchema(faqs)
      }} />
    </div>
  );
}
