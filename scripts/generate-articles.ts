/**
 * Script para gerar múltiplos artigos de blog com IA
 * 
 * Uso:
 * npx ts-node scripts/generate-articles.ts
 */

const articles = [
  {
    title: "Como Calcular 13º Salário em 2025: Guia Completo",
    angle: "Como calcular 13º salário corretamente em 2025, incluindo primeira e segunda parcela, descontos de INSS e IRRF",
    keywords: ["13º salário", "décimo terceiro", "como calcular 13º", "13º salário 2025"],
    category: "trabalhista",
    calculator: "13-salario"
  },
  {
    title: "Horas Extras: Como Calcular com DSR em 2025",
    angle: "Como calcular horas extras com adicional de 50% e 100%, incluindo DSR (Descanso Semanal Remunerado)",
    keywords: ["horas extras", "como calcular horas extras", "DSR", "adicional noturno"],
    category: "trabalhista",
    calculator: "horas-extras"
  },
  {
    title: "Salário Líquido 2025: Guia Completo INSS e IRRF",
    angle: "Como calcular salário líquido descontando INSS e IRRF corretamente em 2025",
    keywords: ["salário líquido", "como calcular salário líquido", "INSS 2025", "IRRF 2025"],
    category: "financeira",
    calculator: "salario-liquido"
  },
  {
    title: "Férias Proporcionais: Como Calcular Passo a Passo",
    angle: "Como calcular férias proporcionais corretamente, incluindo 1/3 constitucional e avos",
    keywords: ["férias proporcionais", "como calcular férias", "1/3 de férias", "avos"],
    category: "trabalhista",
    calculator: "ferias-proporcionais"
  },
  {
    title: "Valor Hora Freelancer: Fórmula Definitiva 2025",
    angle: "Como calcular valor hora freelancer considerando custos, impostos e margem de lucro",
    keywords: ["valor hora freelancer", "como calcular valor hora", "precificação freelancer"],
    category: "freelancer",
    calculator: "valor-hora"
  },
  {
    title: "Impostos MEI 2025: Quanto Pagar e Como Calcular",
    angle: "Guia completo sobre impostos MEI em 2025: valores, DAS, categorias e como calcular",
    keywords: ["impostos MEI", "DAS MEI", "quanto paga MEI", "MEI 2025"],
    category: "freelancer",
    calculator: "impostos-mei"
  },
  {
    title: "Juros Compostos: O Poder dos Investimentos Explicado",
    angle: "Como funcionam juros compostos, fórmula de cálculo e exemplos práticos de investimentos",
    keywords: ["juros compostos", "como calcular juros compostos", "investimentos", "rentabilidade"],
    category: "financeira",
    calculator: "juros-compostos"
  },
  {
    title: "Financiamento SAC vs Price: Qual Escolher em 2025?",
    angle: "Diferenças entre SAC e Price, como calcular cada um e qual é melhor para você",
    keywords: ["financiamento SAC", "tabela price", "SAC vs Price", "financiamento imobiliário"],
    category: "financeira",
    calculator: "financiamento"
  },
  {
    title: "Materiais de Construção: Como Calcular Quantidade",
    angle: "Como calcular quantidade de materiais de construção: cimento, areia, tijolos, tinta e mais",
    keywords: ["materiais de construção", "como calcular materiais", "quantidade de cimento", "obra"],
    category: "construcao",
    calculator: "materiais-obra"
  },
  {
    title: "Seguro-Desemprego 2025: Quem Tem Direito e Valores",
    angle: "Guia completo sobre seguro-desemprego: requisitos, valores, parcelas e como calcular",
    keywords: ["seguro-desemprego", "quem tem direito", "valores seguro-desemprego", "parcelas"],
    category: "trabalhista",
    calculator: "seguro-desemprego"
  }
];

console.log(`
╔════════════════════════════════════════════════════════════╗
║  📝 Gerador de Artigos com IA - calcprobr.com             ║
╚════════════════════════════════════════════════════════════╝

🎯 ${articles.length} artigos serão gerados

📋 Lista de artigos:
${articles.map((a, i) => `   ${i + 1}. ${a.title}`).join('\n')}

⚙️  Configuração:
   - Modelo: GPT-4o-mini
   - Tamanho: 2.500-3.000 palavras cada
   - Tempo estimado: ~${articles.length * 2} minutos
   - Custo estimado: ~$${(articles.length * 0.15).toFixed(2)}

🚀 Para gerar os artigos:
   1. Acesse: http://localhost:3000/admin/posts/new
   2. Clique em "Gerar com IA"
   3. Selecione o tópico desejado
   4. Aguarde a geração
   5. Revise e publique

💡 Dica: Gere 2-3 artigos por dia para não sobrecarregar a API

📊 Impacto esperado:
   - +150k visitas/mês em 3-4 meses
   - +R$ 20k/mês em receita (Mês 6)
   - ROI: 900% em 6 meses

════════════════════════════════════════════════════════════

✅ Sistema de geração otimizado e pronto!
`);

export { articles };
