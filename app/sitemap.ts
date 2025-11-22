import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://calcpro.br'

    // Static routes
    const routes = [
        '',
        '/calculadoras',
        '/sobre',
        '/blog',
        '/calculadora/trabalhista/rescisao-trabalhista',
        '/calculadora/trabalhista/horas-extras',
        '/calculadora/trabalhista/13-salario',
        '/calculadora/financeira/salario-liquido',
        '/calculadora/financeira/juros-compostos',
        '/calculadora/financeira/financiamento',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : route === '/calculadoras' ? 0.9 : 0.8,
    }))

    return routes
}
