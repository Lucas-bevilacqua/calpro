import { Metadata } from "next";
import { ValorHoraForm } from "@/components/calculators/valor-hora-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Valor/Hora Freelancer 2025 | calcprobr.com",
  description: "Calcule quanto cobrar por hora como freelancer. Considere custos, impostos e margem de lucro para definir seu preço justo.",
  keywords: ["valor hora freelancer", "quanto cobrar freelancer", "preço hora", "calcular valor hora"],
};

const faqs = [
  {
    question: "Como calcular meu valor/hora como freelancer?",
    answer: "Para calcular seu valor/hora, some sua renda desejada mensal com seus custos fixos, divida pelas horas trabalhadas no mês, e adicione impostos e margem de lucro. Nossa calculadora faz isso automaticamente."
  },
  {
    question: "Qual a margem de lucro ideal para freelancer?",
    answer: "A margem de lucro recomendada para freelancers varia entre 15% e 30%, dependendo da área de atuação e nível de experiência. Profissionais mais experientes podem cobrar margens maiores."
  },
  {
    question: "Devo incluir férias no cálculo?",
    answer: "Sim! Como freelancer você não recebe férias remuneradas, então deve considerar 30 dias de férias por ano no cálculo, reduzindo seus dias úteis anuais."
  },
  {
    question: "Quanto um freelancer MEI paga de imposto?",
    answer: "O MEI paga aproximadamente 6% de impostos (DAS fixo mensal). Já no Simples Nacional, a alíquota varia de 6% a 15% dependendo do faturamento e atividade."
  }
];

export default function ValorHoraPage() {
  return (
    <>
      <SchemaMarkup data={generateWebApplicationSchema(
        "Calculadora de Valor/Hora Freelancer",
        "Calcule quanto cobrar por hora como freelancer",
        "https://calcprobr.com/calculadora/freelancer/valor-hora"
      )} />
      <SchemaMarkup data={generateFAQSchema(faqs)} />

      <div className="container py-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Calculadora de Valor/Hora Freelancer
          </h1>
          <p className="text-xl text-muted-foreground">
            Descubra quanto cobrar por hora considerando seus custos, impostos e margem de lucro. 
            Precifique seus serviços de forma justa e lucrativa.
          </p>
        </div>

        <ValorHoraForm />

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>Como definir seu valor/hora como freelancer?</h2>
          <p>
            Definir o valor/hora correto é essencial para a sustentabilidade do seu negócio como freelancer. 
            Um preço muito baixo pode inviabilizar sua operação, enquanto um preço muito alto pode afastar clientes.
          </p>

          <h3>Fatores a considerar</h3>
          <ul>
            <li><strong>Renda desejada:</strong> Quanto você precisa/quer ganhar por mês</li>
            <li><strong>Custos fixos:</strong> Internet, software, equipamentos, aluguel de espaço</li>
            <li><strong>Impostos:</strong> MEI (6%), Simples Nacional (6-15%) ou outros regimes</li>
            <li><strong>Margem de lucro:</strong> Reserva para crescimento e imprevistos</li>
            <li><strong>Férias e folgas:</strong> Dias não trabalhados no ano</li>
          </ul>

          <h3>Dicas para precificação</h3>
          <ol>
            <li><strong>Pesquise o mercado:</strong> Veja quanto outros profissionais da sua área cobram</li>
            <li><strong>Considere sua experiência:</strong> Profissionais seniores podem cobrar mais</li>
            <li><strong>Seja transparente:</strong> Explique ao cliente como chegou no valor</li>
            <li><strong>Ofereça pacotes:</strong> Valores por projeto podem ser mais atrativos</li>
            <li><strong>Revise periodicamente:</strong> Ajuste seus preços conforme ganha experiência</li>
          </ol>

          <h3>Exemplo prático</h3>
          <p>
            Um desenvolvedor que quer ganhar R$ 5.000/mês, trabalha 8h/dia por 22 dias, tem R$ 1.000 de custos fixos, 
            paga 6% de impostos (MEI) e quer 20% de margem, deve cobrar aproximadamente R$ 50-60/hora.
          </p>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h3 className="mt-0">Lembre-se</h3>
            <p className="mb-0">
              Seu valor/hora não é apenas sobre o tempo trabalhado, mas também sobre o valor que você entrega, 
              sua experiência e a complexidade do projeto. Não tenha medo de cobrar o que você vale!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
