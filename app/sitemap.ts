import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcpro.br';
  const currentDate = new Date();

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculadoras`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/precos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Calculadoras - Trabalhista
  const calculadorasTrabalhista = [
    'rescisao-trabalhista',
    'horas-extras',
    '13-salario',
    'ferias-proporcionais',
    'seguro-desemprego',
  ].map((slug) => ({
    url: `${baseUrl}/calculadora/trabalhista/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Calculadoras - Freelancer
  const calculadorasFreelancer = [
    'valor-hora',
    'impostos-mei',
  ].map((slug) => ({
    url: `${baseUrl}/calculadora/freelancer/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Calculadoras - Financeira
  const calculadorasFinanceira = [
    'salario-liquido',
    'juros-compostos',
    'financiamento',
  ].map((slug) => ({
    url: `${baseUrl}/calculadora/financeira/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Calculadoras - Construção
  const calculadorasConstrucao = [
    'materiais-obra',
  ].map((slug) => ({
    url: `${baseUrl}/calculadora/construcao/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    ...staticPages,
    ...calculadorasTrabalhista,
    ...calculadorasFreelancer,
    ...calculadorasFinanceira,
    ...calculadorasConstrucao,
  ];
}
