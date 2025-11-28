/**
 * Sistema de imagens para artigos do blog
 * Gera URLs de imagens do Unsplash baseadas no tópico
 */

interface ImageConfig {
  topic: string
  keywords: string[]
  unsplashQuery: string
}

const imageConfigs: Record<string, ImageConfig> = {
  'rescisao-trabalhista': {
    topic: 'Rescisão Trabalhista',
    keywords: ['rescisão', 'demissão', 'trabalho'],
    unsplashQuery: 'business-handshake-office'
  },
  '13-salario': {
    topic: '13º Salário',
    keywords: ['13º', 'salário', 'dinheiro'],
    unsplashQuery: 'money-calculator-finance'
  },
  'horas-extras': {
    topic: 'Horas Extras',
    keywords: ['horas extras', 'trabalho', 'relógio'],
    unsplashQuery: 'clock-time-work'
  },
  'ferias': {
    topic: 'Férias',
    keywords: ['férias', 'descanso', 'praia'],
    unsplashQuery: 'vacation-beach-relax'
  },
  'salario-liquido': {
    topic: 'Salário Líquido',
    keywords: ['salário', 'dinheiro', 'finanças'],
    unsplashQuery: 'payroll-salary-money'
  },
  'valor-hora': {
    topic: 'Valor Hora',
    keywords: ['freelancer', 'trabalho', 'computador'],
    unsplashQuery: 'freelancer-laptop-work'
  },
  'impostos-mei': {
    topic: 'Impostos MEI',
    keywords: ['MEI', 'impostos', 'empreendedor'],
    unsplashQuery: 'entrepreneur-business-tax'
  },
  'juros-compostos': {
    topic: 'Juros Compostos',
    keywords: ['investimento', 'dinheiro', 'crescimento'],
    unsplashQuery: 'investment-growth-chart'
  },
  'financiamento': {
    topic: 'Financiamento',
    keywords: ['casa', 'financiamento', 'imóvel'],
    unsplashQuery: 'house-keys-mortgage'
  },
  'materiais-construcao': {
    topic: 'Materiais de Construção',
    keywords: ['construção', 'obra', 'materiais'],
    unsplashQuery: 'construction-building-materials'
  },
  'seguro-desemprego': {
    topic: 'Seguro-Desemprego',
    keywords: ['desemprego', 'trabalho', 'direitos'],
    unsplashQuery: 'job-search-unemployment'
  },
  'default': {
    topic: 'Calculadoras',
    keywords: ['calculadora', 'finanças', 'trabalho'],
    unsplashQuery: 'calculator-finance-business'
  }
}

/**
 * Gera URL de imagem do Unsplash baseada no tópico
 */
export function getUnsplashImageUrl(topic: string, width = 1200, height = 630): string {
  const config = imageConfigs[topic] || imageConfigs.default
  
  // Unsplash Source API (gratuito, sem necessidade de API key)
  return `https://source.unsplash.com/${width}x${height}/?${config.unsplashQuery}`
}

/**
 * Gera URL de imagem específica do Unsplash (IDs fixos para consistência)
 */
const unsplashImageIds: Record<string, string> = {
  'rescisao-trabalhista': 'hpjSkU2UYSU', // Business handshake
  '13-salario': 'ZVprbBmT8QA', // Money and calculator
  'horas-extras': 'vbxyFxlgpjM', // Clock and time
  'ferias': 'KMn4VEeEPR8', // Beach vacation
  'salario-liquido': 'JrjhtBJ-pGU', // Payroll
  'valor-hora': 'Q1p7bh3SHj8', // Freelancer working
  'impostos-mei': 'npxXWgQ33ZQ', // Small business
  'juros-compostos': 'fiXLQXAhCfk', // Investment growth
  'financiamento': 'UCd78vfC8vU', // House keys
  'materiais-construcao': 'JjGXjESMxOY', // Construction
  'seguro-desemprego': 'IClZBVw5W5A', // Job search
  'default': 'ZVprbBmT8QA' // Calculator
}

/**
 * Gera URL de imagem específica do Unsplash (mais consistente)
 */
export function getSpecificUnsplashImage(topic: string, width = 1200, height = 630): string {
  const imageId = unsplashImageIds[topic] || unsplashImageIds.default
  return `https://images.unsplash.com/photo-${imageId}?w=${width}&h=${height}&fit=crop&auto=format`
}

/**
 * Detecta o tópico baseado no slug ou título
 */
export function detectTopicFromSlug(slug: string): string {
  if (slug.includes('rescisao')) return 'rescisao-trabalhista'
  if (slug.includes('13') || slug.includes('decimo')) return '13-salario'
  if (slug.includes('hora') && slug.includes('extra')) return 'horas-extras'
  if (slug.includes('feria')) return 'ferias'
  if (slug.includes('salario') && slug.includes('liquido')) return 'salario-liquido'
  if (slug.includes('valor') && slug.includes('hora')) return 'valor-hora'
  if (slug.includes('mei') || slug.includes('imposto')) return 'impostos-mei'
  if (slug.includes('juro')) return 'juros-compostos'
  if (slug.includes('financiamento')) return 'financiamento'
  if (slug.includes('material') || slug.includes('construcao')) return 'materiais-construcao'
  if (slug.includes('seguro') && slug.includes('desemprego')) return 'seguro-desemprego'
  
  return 'default'
}

/**
 * Gera imagem para um artigo baseado no slug
 */
export function generateBlogImage(slug: string): string {
  const topic = detectTopicFromSlug(slug)
  return getSpecificUnsplashImage(topic)
}

/**
 * Lista de imagens locais alternativas (caso queira usar imagens próprias)
 */
export const localImages: Record<string, string> = {
  'rescisao-trabalhista': '/images/blog/rescisao-trabalhista.jpg',
  '13-salario': '/images/blog/13-salario.jpg',
  'horas-extras': '/images/blog/horas-extras.jpg',
  'ferias': '/images/blog/ferias.jpg',
  'salario-liquido': '/images/blog/salario-liquido.jpg',
  'valor-hora': '/images/blog/valor-hora.jpg',
  'impostos-mei': '/images/blog/impostos-mei.jpg',
  'juros-compostos': '/images/blog/juros-compostos.jpg',
  'financiamento': '/images/blog/financiamento.jpg',
  'materiais-construcao': '/images/blog/materiais-construcao.jpg',
  'seguro-desemprego': '/images/blog/seguro-desemprego.jpg',
  'default': '/images/default-blog.jpg'
}
