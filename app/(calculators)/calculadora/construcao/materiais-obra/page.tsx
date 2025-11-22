import { Metadata } from "next";
import { MateriaisConstrucaoForm } from "@/components/calculators/materiais-construcao-form";
import { SchemaMarkup, generateWebApplicationSchema, generateFAQSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Calculadora de Materiais de Construção 2025 | CalcPro.br",
  description: "Calcule a quantidade de materiais para sua obra: concreto, tijolos, argamassa, tinta, pisos e telhas. Evite desperdício e economize.",
  keywords: ["materiais construção", "calcular concreto", "quantidade tijolos", "tinta parede", "materiais obra"],
};

const faqs = [
  {
    question: "Como calcular a quantidade de concreto necessária?",
    answer: "Para calcular concreto, multiplique comprimento × largura × altura (em metros) para obter o volume em m³. Adicione 10% de perda. Para cada m³, você precisará de aproximadamente 7 sacos de cimento, 0,5m³ de areia e 0,75m³ de brita."
  },
  {
    question: "Quantos tijolos por m² de parede?",
    answer: "Depende do tipo de tijolo: tijolo comum (5×10×20cm) usa cerca de 80 tijolos/m², enquanto tijolo baiano (9×19×19cm) usa cerca de 25 tijolos/m². Sempre adicione 10% de perda."
  },
  {
    question: "Como calcular a quantidade de tinta?",
    answer: "Divida a área a pintar pelo rendimento da tinta (geralmente 12m²/litro) e multiplique pelo número de demãos. Adicione 10% de perda. Uma lata de 18L rende aproximadamente 216m² em 1 demão."
  },
  {
    question: "Por que adicionar percentual de perda?",
    answer: "O percentual de perda compensa quebras, recortes, desperdícios e imperfeições durante a aplicação. Varia de 10% (concreto, pisos) a 15% (telhas, argamassa)."
  }
];

export default function MateriaisConstrucaoPage() {
  return (
    <>
      <SchemaMarkup schema={generateWebApplicationSchema({
        name: "Calculadora de Materiais de Construção",
        description: "Calcule a quantidade de materiais para sua obra",
        url: "https://calcpro.br/calculadora/construcao/materiais-obra"
      })} />
      <SchemaMarkup schema={generateFAQSchema(faqs)} />

      <div className="container py-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Calculadora de Materiais de Construção
          </h1>
          <p className="text-xl text-muted-foreground">
            Calcule a quantidade exata de materiais para sua obra. 
            Evite desperdício e economize no orçamento.
          </p>
        </div>

        <MateriaisConstrucaoForm />

        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>Como calcular materiais de construção?</h2>
          <p>
            Calcular corretamente a quantidade de materiais é essencial para evitar desperdício e garantir que 
            a obra não pare por falta de insumos. Nossa calculadora considera as perdas típicas de cada material.
          </p>

          <h3>Concreto</h3>
          <p>
            Para calcular concreto, você precisa do volume em m³ (comprimento × largura × altura). 
            O traço mais comum é 1:2:3 (1 parte de cimento, 2 de areia, 3 de brita).
          </p>
          <ul>
            <li>1m³ de concreto = 7 sacos de cimento (50kg)</li>
            <li>1m³ de concreto = 0,5m³ de areia</li>
            <li>1m³ de concreto = 0,75m³ de brita</li>
          </ul>

          <h3>Tijolos</h3>
          <p>
            A quantidade de tijolos depende do tipo e da espessura da parede:
          </p>
          <ul>
            <li><strong>Tijolo comum (5×10×20cm):</strong> ~80 tijolos/m²</li>
            <li><strong>Tijolo baiano (9×19×19cm):</strong> ~25 tijolos/m²</li>
            <li><strong>Bloco de concreto (14×19×39cm):</strong> ~12,5 blocos/m²</li>
          </ul>

          <h3>Argamassa</h3>
          <p>
            Para reboco, considere a espessura da camada (geralmente 2cm). 
            Cada saco de argamassa pronta (20kg) rende aproximadamente 0,02m³.
          </p>

          <h3>Tinta</h3>
          <p>
            O rendimento médio da tinta é de 12m²/litro por demão. Para paredes novas ou cores escuras, 
            recomenda-se 2-3 demãos. Uma lata de 18L rende cerca de 216m² em 1 demão.
          </p>

          <h3>Pisos e Azulejos</h3>
          <p>
            Calcule a área em m² e divida pelo tamanho da peça. Pisos 60×60cm têm 0,36m² por peça. 
            Adicione 10% de perda para recortes e quebras.
          </p>

          <h3>Telhas</h3>
          <p>
            A quantidade varia por tipo:
          </p>
          <ul>
            <li><strong>Telha cerâmica:</strong> ~17 telhas/m²</li>
            <li><strong>Telha de concreto:</strong> ~10 telhas/m²</li>
            <li><strong>Telha metálica:</strong> Varia por modelo</li>
          </ul>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h3 className="mt-0">Dica importante</h3>
            <p className="mb-0">
              Sempre compre um pouco mais do que o calculado (10-15% a mais) para compensar perdas, 
              quebras e possíveis erros de medição. É melhor sobrar um pouco do que faltar material no meio da obra.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
