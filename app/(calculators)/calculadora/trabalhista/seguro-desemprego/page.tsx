import { Metadata } from "next";
import { SeguroDesempregoForm } from "@/components/calculators/seguro-desemprego-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Seguro-Desemprego 2025 | calcprobr.com",
  description: "Calcule quantas parcelas e o valor do seguro-desemprego você tem direito. Atualizado com as regras 2025.",
  keywords: ["seguro desemprego", "calcular seguro desemprego", "parcelas seguro", "valor seguro desemprego"],
};

const faqs = [
  {
    question: "Quem tem direito ao seguro-desemprego?",
    answer: "Tem direito ao seguro-desemprego o trabalhador dispensado sem justa causa que comprove: ter recebido salários nos últimos 18 meses, ter trabalhado pelo menos 12 meses (1ª solicitação), 9 meses (2ª solicitação) ou 6 meses (3ª solicitação em diante), e não possuir renda própria suficiente."
  },
  {
    question: "Quantas parcelas do seguro-desemprego posso receber?",
    answer: "O número de parcelas varia de 3 a 5, dependendo do tempo trabalhado: 6 a 11 meses = 3 parcelas; 12 a 23 meses = 4 parcelas; 24 meses ou mais = 5 parcelas."
  },
  {
    question: "Como é calculado o valor do seguro-desemprego?",
    answer: "O valor é calculado com base na média dos últimos 3 salários, usando uma tabela progressiva: até R$ 2.313,74 recebe 80%; de R$ 2.313,74 a R$ 3.856,23 recebe 50% do excedente; acima disso, valor fixo máximo."
  },
  {
    question: "Qual o valor mínimo e máximo do seguro-desemprego?",
    answer: "O valor mínimo é de R$ 1.412,00 (salário mínimo 2025) e o máximo é de R$ 2.313,74."
  }
];

export default function SeguroDesempregoPage() {
  return (
    <>
      <SchemaMarkup data={generateWebApplicationSchema(
        "Calculadora de Seguro-Desemprego",
        "Calcule o valor e número de parcelas do seguro-desemprego",
        "https://calcprobr.com/calculadora/trabalhista/seguro-desemprego"
      )} />
      <SchemaMarkup data={generateFAQSchema(faqs)} />

      <div className="container py-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Calculadora de Seguro-Desemprego
          </h1>
          <p className="text-xl text-muted-foreground">
            Verifique se você tem direito ao seguro-desemprego e calcule o valor das parcelas. 
            Atualizado com as regras de 2025.
          </p>
        </div>

        <SeguroDesempregoForm />

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>Como funciona o seguro-desemprego?</h2>
          <p>
            O seguro-desemprego é um benefício temporário concedido ao trabalhador dispensado sem justa causa. 
            O objetivo é auxiliar financeiramente durante o período de procura por um novo emprego.
          </p>

          <h3>Requisitos para receber</h3>
          <ul>
            <li><strong>1ª solicitação:</strong> Ter trabalhado pelo menos 12 meses nos últimos 18 meses</li>
            <li><strong>2ª solicitação:</strong> Ter trabalhado pelo menos 9 meses nos últimos 12 meses</li>
            <li><strong>3ª solicitação em diante:</strong> Ter trabalhado pelo menos 6 meses</li>
            <li>Ter sido dispensado sem justa causa</li>
            <li>Não estar recebendo benefício previdenciário (exceto auxílio-acidente e pensão por morte)</li>
            <li>Não possuir renda própria suficiente</li>
          </ul>

          <h3>Número de parcelas</h3>
          <p>O número de parcelas varia conforme o tempo trabalhado:</p>
          <ul>
            <li><strong>6 a 11 meses:</strong> 3 parcelas</li>
            <li><strong>12 a 23 meses:</strong> 4 parcelas</li>
            <li><strong>24 meses ou mais:</strong> 5 parcelas</li>
          </ul>

          <h3>Cálculo do valor</h3>
          <p>
            O valor é calculado com base na média dos últimos 3 salários, aplicando uma tabela progressiva:
          </p>
          <ul>
            <li><strong>Até R$ 2.313,74:</strong> 80% do salário médio</li>
            <li><strong>De R$ 2.313,74 a R$ 3.856,23:</strong> R$ 1.850,99 + 50% do que exceder R$ 2.313,74</li>
            <li><strong>Acima de R$ 3.856,23:</strong> Valor fixo de R$ 2.313,74</li>
          </ul>

          <h3>Como solicitar</h3>
          <ol>
            <li>Aguardar 7 a 120 dias após a demissão</li>
            <li>Acessar o Portal Emprega Brasil ou aplicativo Carteira de Trabalho Digital</li>
            <li>Preencher o requerimento online</li>
            <li>Aguardar análise (geralmente 30 dias)</li>
            <li>Receber as parcelas mensalmente</li>
          </ol>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h3 className="mt-0">Atenção</h3>
            <p className="mb-0">
              Este cálculo é uma estimativa. O valor oficial será determinado pelo Ministério do Trabalho 
              após análise do seu requerimento. Consulte sempre o Portal Emprega Brasil para informações atualizadas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
