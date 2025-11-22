import { Metadata } from "next";
import { ImpostosMEIForm } from "@/components/calculators/impostos-mei-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Impostos MEI 2025 - DAS Mensal | CalcPro.br",
  description: "Calcule o valor do DAS (Documento de Arrecadação do Simples) do MEI. Descubra quanto pagar mensalmente de impostos como Microempreendedor Individual.",
  keywords: ["impostos mei", "das mei", "calcular das", "mei 2025", "microempreendedor individual"],
};

const faqs = [
  {
    question: "Quanto um MEI paga de imposto por mês?",
    answer: "O MEI paga um valor fixo mensal através do DAS, que varia de acordo com a atividade: Comércio/Indústria paga INSS (5% do salário mínimo) + R$ 1,00 de ICMS. Serviços paga INSS + R$ 5,00 de ISSQN. Comércio e Serviços paga INSS + R$ 1,00 de ICMS + R$ 5,00 de ISSQN."
  },
  {
    question: "Qual o limite de faturamento do MEI em 2025?",
    answer: "O limite anual de faturamento do MEI é de R$ 81.000,00, o que equivale a uma média de R$ 6.750,00 por mês. Se ultrapassar esse valor, é necessário migrar para outro regime tributário."
  },
  {
    question: "O que acontece se o MEI ultrapassar o limite?",
    answer: "Se ultrapassar até 20% (R$ 97.200), você pode continuar como MEI até dezembro e migrar no ano seguinte, pagando a diferença. Se ultrapassar mais de 20%, deve migrar imediatamente para Microempresa (ME)."
  },
  {
    question: "Como é calculado o DAS do MEI?",
    answer: "O DAS é composto por: 5% do salário mínimo para INSS, mais R$ 1,00 de ICMS (comércio/indústria) e/ou R$ 5,00 de ISSQN (serviços). O valor é fixo e não depende do faturamento."
  }
];

export default function ImpostosMEIPage() {
  return (
    <>
      <SchemaMarkup schema={generateWebApplicationSchema({
        name: "Calculadora de Impostos MEI",
        description: "Calcule o valor do DAS mensal do MEI",
        url: "https://calcpro.br/calculadora/freelancer/impostos-mei"
      })} />
      <SchemaMarkup schema={generateFAQSchema(faqs)} />

      <div className="container py-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Calculadora de Impostos MEI
          </h1>
          <p className="text-xl text-muted-foreground">
            Calcule o valor do DAS (Documento de Arrecadação do Simples) mensal do MEI. 
            Atualizado com os valores de 2025.
          </p>
        </div>

        <ImpostosMEIForm />

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>Como funciona o pagamento de impostos do MEI?</h2>
          <p>
            O Microempreendedor Individual (MEI) paga seus impostos através do DAS (Documento de Arrecadação do Simples Nacional), 
            um boleto único mensal com valor fixo que unifica todos os tributos.
          </p>

          <h3>Composição do DAS</h3>
          <ul>
            <li><strong>INSS:</strong> 5% do salário mínimo vigente (garante aposentadoria e benefícios previdenciários)</li>
            <li><strong>ICMS:</strong> R$ 1,00 para atividades de comércio e indústria</li>
            <li><strong>ISSQN:</strong> R$ 5,00 para atividades de prestação de serviços</li>
          </ul>

          <h3>Vantagens do MEI</h3>
          <ul>
            <li>Valor fixo mensal, independente do faturamento</li>
            <li>Isenção de impostos federais (IRPJ, CSLL, PIS, COFINS)</li>
            <li>Processo simplificado de abertura e manutenção</li>
            <li>Acesso a benefícios previdenciários</li>
            <li>Possibilidade de emitir nota fiscal</li>
          </ul>

          <h3>Quando pagar o DAS?</h3>
          <p>
            O DAS deve ser pago até o dia 20 de cada mês, referente ao mês anterior. 
            O boleto pode ser gerado no Portal do Empreendedor ou através do aplicativo MEI.
          </p>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h3 className="mt-0">Importante</h3>
            <p className="mb-0">
              Mesmo sem faturamento, o MEI deve pagar o DAS mensalmente para manter a regularidade. 
              O não pagamento pode resultar em multas e perda de benefícios.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
