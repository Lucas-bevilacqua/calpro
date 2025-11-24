import { Metadata } from "next";
import { FeriasProporcionaisForm } from "@/components/calculators/ferias-proporcionais-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Férias Proporcionais 2025 - CLT | calcprobr.com",
  description: "Calcule o valor das férias proporcionais com 1/3 constitucional. Atualizado com as regras da CLT 2025. Grátis e preciso.",
  keywords: ["férias proporcionais", "calcular férias", "1/3 férias", "férias clt", "avos de férias"],
};

const faqs = [
  {
    question: "Como calcular férias proporcionais?",
    answer: "As férias proporcionais são calculadas em avos (1/12 por mês trabalhado). Para cada mês completo ou fração igual ou superior a 15 dias, conta-se 1 avo. O valor é: (salário ÷ 12) × número de avos + 1/3 constitucional."
  },
  {
    question: "O que é o 1/3 constitucional de férias?",
    answer: "O 1/3 constitucional é um adicional de 33,33% sobre o valor das férias, garantido pela Constituição Federal. Ele é pago tanto nas férias gozadas quanto nas férias indenizadas."
  },
  {
    question: "Quando tenho direito a férias proporcionais?",
    answer: "Você tem direito a férias proporcionais em caso de rescisão do contrato de trabalho, desde que não seja por justa causa. O cálculo considera os meses trabalhados no período aquisitivo atual."
  },
  {
    question: "Férias proporcionais sofrem desconto de INSS e IRRF?",
    answer: "Quando as férias são indenizadas (pagas na rescisão), geralmente não há desconto de INSS e IRRF. Porém, quando são gozadas, há os descontos normais de folha de pagamento."
  }
];

export default function FeriasProporcionaisPage() {
  return (
    <>
      <SchemaMarkup data={generateWebApplicationSchema(
        "Calculadora de Férias Proporcionais",
        "Calcule o valor das férias proporcionais com 1/3 constitucional",
        "https://calcprobr.com/calculadora/trabalhista/ferias-proporcionais"
      )} />
      <SchemaMarkup data={generateFAQSchema(faqs)} />

      <div className="container py-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Calculadora de Férias Proporcionais
          </h1>
          <p className="text-xl text-muted-foreground">
            Calcule o valor das suas férias proporcionais com 1/3 constitucional. 
            Atualizado com as regras da CLT 2025.
          </p>
        </div>

        <FeriasProporcionaisForm />

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>Como funcionam as férias proporcionais?</h2>
          <p>
            As férias proporcionais são um direito trabalhista garantido pela CLT quando há rescisão do contrato 
            de trabalho (exceto por justa causa). O cálculo é feito em "avos", onde cada mês trabalhado equivale a 1/12 das férias.
          </p>

          <h3>Regra dos avos</h3>
          <p>
            Para cada mês completo trabalhado no período aquisitivo, o trabalhador tem direito a 1 avo de férias. 
            Frações de mês iguais ou superiores a 15 dias também contam como 1 avo.
          </p>

          <h3>Período aquisitivo</h3>
          <p>
            O período aquisitivo é o período de 12 meses contados a partir da data de admissão (ou do último aniversário de admissão). 
            As férias proporcionais consideram os meses trabalhados no período aquisitivo atual.
          </p>

          <h3>Composição do valor</h3>
          <ul>
            <li><strong>Férias proporcionais:</strong> (Salário ÷ 12) × número de avos</li>
            <li><strong>1/3 constitucional:</strong> 33,33% sobre o valor das férias</li>
            <li><strong>Férias vencidas:</strong> Períodos completos não gozados (se houver)</li>
          </ul>

          <h3>Exemplo prático</h3>
          <p>
            Um trabalhador com salário de R$ 3.000,00 que trabalhou 7 meses no período aquisitivo atual:
          </p>
          <ul>
            <li>Férias proporcionais: R$ 3.000 ÷ 12 × 7 = R$ 1.750,00</li>
            <li>1/3 constitucional: R$ 1.750 ÷ 3 = R$ 583,33</li>
            <li>Total: R$ 2.333,33</li>
          </ul>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h3 className="mt-0">Atenção</h3>
            <p className="mb-0">
              Este cálculo é uma estimativa. Para valores oficiais e homologação, consulte sempre o RH da empresa 
              ou um contador especializado em direito trabalhista.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
