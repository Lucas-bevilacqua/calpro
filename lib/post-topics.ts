// Topic templates for AI blog post generation
// Each calculator category has multiple angles to ensure variety

export interface PostTopic {
    category: string
    calculator: string
    angles: string[]
    keywords: string[]
}

export const POST_TOPICS: PostTopic[] = [
    {
        category: 'Trabalhista',
        calculator: 'Salário Líquido',
        angles: [
            'Como calcular seu salário líquido em 2024: Guia completo',
            'Descontos no salário: Entenda INSS, IRRF e outros',
            '5 erros comuns ao calcular salário líquido',
            'Salário líquido vs bruto: Qual a diferença?',
            'Como negociar salário sabendo seu líquido real'
        ],
        keywords: ['salário líquido', 'INSS', 'IRRF', 'descontos', 'CLT']
    },
    {
        category: 'Trabalhista',
        calculator: 'Férias',
        angles: [
            'Férias proporcionais: Como calcular corretamente',
            'Direitos trabalhistas: Tudo sobre férias',
            'Férias vencidas: O que fazer?',
            'Abono pecuniário: Vale a pena vender férias?',
            'Planejamento de férias: Dicas financeiras'
        ],
        keywords: ['férias', 'férias proporcionais', 'abono', 'CLT', 'direitos']
    },
    {
        category: 'Trabalhista',
        calculator: 'Horas Extras',
        angles: [
            'Horas extras: Como calcular e seus direitos',
            'Banco de horas vs horas extras: Qual é melhor?',
            'Adicional noturno: Entenda seus direitos',
            'Como comprovar horas extras não pagas',
            'Limite de horas extras: O que diz a lei'
        ],
        keywords: ['horas extras', 'adicional noturno', 'banco de horas', 'CLT']
    },
    {
        category: 'Financeira',
        calculator: 'Juros Compostos',
        angles: [
            'Juros compostos: O segredo da riqueza',
            'Como investir usando juros compostos',
            'Calculadora de juros: Planeje seu futuro',
            'Diferença entre juros simples e compostos',
            'Investimentos de longo prazo: O poder dos juros'
        ],
        keywords: ['juros compostos', 'investimento', 'rentabilidade', 'poupança']
    },
    {
        category: 'Financeira',
        calculator: 'Financiamento',
        angles: [
            'Financiamento imobiliário: Como calcular parcelas',
            'SAC vs Price: Qual sistema escolher?',
            'Como reduzir juros do financiamento',
            'Amortização: Vale a pena antecipar parcelas?',
            'Simulação de financiamento: Guia completo'
        ],
        keywords: ['financiamento', 'SAC', 'Price', 'amortização', 'imóvel']
    },
    {
        category: 'Freelancer',
        calculator: 'Valor Hora',
        angles: [
            'Como calcular seu valor hora como freelancer',
            'Precificação freelancer: Erros que custam caro',
            'Quanto cobrar por projeto: Guia prático',
            'Custos ocultos do freelancer: Não esqueça deles',
            'Freelancer vs CLT: Comparação financeira'
        ],
        keywords: ['freelancer', 'valor hora', 'precificação', 'autônomo']
    },
    {
        category: 'Impostos',
        calculator: 'MEI',
        angles: [
            'MEI 2024: Guia completo de impostos',
            'Vale a pena ser MEI? Análise completa',
            'Como calcular impostos do MEI',
            'MEI: Direitos e deveres que você precisa saber',
            'Faturamento MEI: Limites e cuidados'
        ],
        keywords: ['MEI', 'microempreendedor', 'impostos', 'DAS', 'CNPJ']
    }
]

// Get a random topic that hasn't been used recently
export function getNextTopic(usedTopics: string[] = []): PostTopic {
    const availableTopics = POST_TOPICS.filter(
        topic => !usedTopics.includes(`${topic.category}-${topic.calculator}`)
    )

    if (availableTopics.length === 0) {
        // Reset if all topics have been used
        return POST_TOPICS[Math.floor(Math.random() * POST_TOPICS.length)]
    }

    return availableTopics[Math.floor(Math.random() * availableTopics.length)]
}

// Get a random angle for a topic
export function getRandomAngle(topic: PostTopic): string {
    return topic.angles[Math.floor(Math.random() * topic.angles.length)]
}
