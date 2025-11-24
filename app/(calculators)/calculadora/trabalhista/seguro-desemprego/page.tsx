import { Metadata } from "next";
import { SeguroDesempregoForm } from "@/components/calculators/seguro-desemprego-form";
import { ShareButtons } from "@/components/ui/share-buttons";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Seguro-Desemprego 2025 (Valor e Parcelas) | CalcPro",
  description: "Descubra se você tem direito e calcule o valor exato do Seguro-Desemprego. Veja quantas parcelas vai receber. Atualizado com o novo salário mínimo.",
  keywords: ["seguro desemprego", "calcular seguro desemprego", "parcelas seguro", "valor seguro desemprego", "quem tem direito seguro desemprego"],
};

const faqs = [
  {
    question: "Quem tem direito ao seguro-desemprego?",
    answer: "Trabalhadores demitidos sem justa causa que não possuem renda própria. É preciso ter trabalhado pelo menos 12 meses (1ª solicitação), 9 meses (2ª solicitação) ou 6 meses (3ª solicitação)."
  },
  {
    question: "Qual o valor máximo do seguro-desemprego em 2025?",
    answer: "O valor máximo da parcela é de R$ 2.313,74. Ninguém recebe mais que isso, mesmo que tenha salário muito alto. O valor mínimo é o salário mínimo vigente (R$ 1.412,00)."
  },
  {
    question: "Quantas parcelas vou receber?",
    answer: "Depende do tempo de trabalho: De 6 a 11 meses = 3 parcelas; De 12 a 23 meses = 4 parcelas; Acima de 24 meses = 5 parcelas."
  },
  {
    question: "Qual o prazo para dar entrada?",
    answer: "O trabalhador formal tem de 7 a 120 dias após a data da demissão para solicitar o benefício. Trabalhadores domésticos têm de 7 a 90 dias."
  }
];

export default function SeguroDesempregoPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
      <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Calculadora de Seguro-Desemprego
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Foi demitido? Veja quanto você vai receber de auxílio enquanto busca uma nova oportunidade.
        </p>
      </div>

      <SeguroDesempregoForm />

      <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert mt-12">
        <h2>Guia do Seguro-Desemprego 2025</h2>
        <p>
          O Seguro-Desemprego é um dos benefícios mais importantes do trabalhador brasileiro. Ele serve como uma "rede de proteção" financeira após uma demissão involuntária.
        </p>

        <div className="bg-card p-6 rounded-xl border shadow-sm my-8 not-prose">
          <h3 className="text-xl font-bold mb-4">💰 Como é calculado o valor?</h3>
          <p className="text-muted-foreground mb-4">
            O cálculo considera a <strong>média dos seus últimos 3 salários</strong> anteriores à demissão.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="bg-primary/10 text-primary font-bold px-2 rounded">Faixa 1</span>
              <span>Média até <strong>R$ 2.041,39</strong>: Multiplica-se por 0,8 (80%).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/10 text-primary font-bold px-2 rounded">Faixa 2</span>
              <span>Média entre <strong>R$ 2.041,40 e R$ 3.402,65</strong>: O que exceder R$ 2.041,39 multiplica-se por 0,5 (50%) e soma-se a R$ 1.633,10.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/10 text-primary font-bold px-2 rounded">Faixa 3</span>
              <span>Média acima de <strong>R$ 3.402,65</strong>: O valor da parcela será fixo em <strong>R$ 2.313,74</strong>.</span>
            </li>
          </ul>
        </div>

        <h3>Passo a Passo para Solicitar</h3>
        <ol>
          <li><strong>Reúna os documentos:</strong> TRCT (Termo de Rescisão), Carteira de Trabalho e Documento de Identidade.</li>
          <li><strong>Acesse o App:</strong> Baixe o aplicativo "Carteira de Trabalho Digital" ou acesse o portal Gov.br.</li>
          <li><strong>Solicite:</strong> Vá na aba "Benefícios" e selecione "Seguro-Desemprego".</li>
          <li><strong>Acompanhe:</strong> O sistema informará a data de liberação das parcelas.</li>
        </ol>

        <p>
          <strong>Importante:</strong> Você não pode ter renda própria (CNPJ com faturamento ou outro emprego) para receber o benefício.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <ShareButtons
          title="Calculadora de Seguro-Desemprego - CalcPro"
          description="Veja quantas parcelas e qual o valor do seu Seguro-Desemprego."
        />
      </div>

      <SchemaMarkup data={{
        ...generateWebApplicationSchema(
          "Calculadora de Seguro-Desemprego",
          "Calcule o valor e número de parcelas do seguro-desemprego.",
          "https://calcprobr.com/calculadora/trabalhista/seguro-desemprego"
        ),
        ...generateFAQSchema(faqs)
      }} />
    </div>
  );
}
