// SEO Strategy and Content Planning
// Generates optimized content calendar based on keyword research and topic clustering

export interface KeywordCluster {
    primary: string
    secondary: string[]
    searchVolume: 'high' | 'medium' | 'low'
    difficulty: 'easy' | 'medium' | 'hard'
    category: string
}

export interface ContentPlanItem {
    id: string
    topic: string
    keywords: string[]
    angle: string
    priority: number
    estimatedTraffic: number
    scheduledDate?: Date
}

// Keyword clusters by calculator category with SEO data
export const KEYWORD_CLUSTERS: KeywordCluster[] = [
    {
        primary: 'salário líquido',
        secondary: ['calcular salário', 'salário bruto', 'descontos CLT', 'INSS IRRF'],
        searchVolume: 'high',
        difficulty: 'medium',
        category: 'Trabalhista'
    },
    {
        primary: 'férias proporcionais',
        secondary: ['cálculo férias', 'direitos trabalhistas', 'férias CLT', 'abono pecuniário'],
        searchVolume: 'high',
        difficulty: 'easy',
        category: 'Trabalhista'
    },
    {
        primary: 'horas extras',
        secondary: ['adicional noturno', 'banco de horas', 'hora extra CLT', 'cálculo hora extra'],
        searchVolume: 'high',
        difficulty: 'medium',
        category: 'Trabalhista'
    },
    {
        primary: '13º salário',
        secondary: ['décimo terceiro', 'gratificação natalina', 'cálculo 13º', '13º proporcional'],
        searchVolume: 'high',
        difficulty: 'easy',
        category: 'Trabalhista'
    },
    {
        primary: 'rescisão trabalhista',
        secondary: ['acerto demissão', 'verbas rescisórias', 'demissão CLT', 'cálculo rescisão'],
        searchVolume: 'high',
        difficulty: 'medium',
        category: 'Trabalhista'
    },
    {
        primary: 'juros compostos',
        secondary: ['investimento longo prazo', 'rentabilidade', 'juros sobre juros', 'calculadora investimento'],
        searchVolume: 'medium',
        difficulty: 'medium',
        category: 'Financeira'
    },
    {
        primary: 'financiamento imobiliário',
        secondary: ['SAC Price', 'amortização', 'simulação financiamento', 'juros imóvel'],
        searchVolume: 'high',
        difficulty: 'hard',
        category: 'Financeira'
    },
    {
        primary: 'valor hora freelancer',
        secondary: ['precificação freelancer', 'quanto cobrar', 'cálculo hora', 'freelancer autônomo'],
        searchVolume: 'medium',
        difficulty: 'easy',
        category: 'Freelancer'
    },
    {
        primary: 'MEI impostos',
        secondary: ['DAS MEI', 'microempreendedor', 'impostos MEI 2024', 'faturamento MEI'],
        searchVolume: 'high',
        difficulty: 'medium',
        category: 'Impostos'
    },
    {
        primary: 'imposto de renda',
        secondary: ['IRPF', 'declaração IR', 'restituição', 'tabela IR 2024'],
        searchVolume: 'high',
        difficulty: 'hard',
        category: 'Impostos'
    }
]

// Generate 30-day content calendar
export function generateContentCalendar(startDate: Date = new Date()): ContentPlanItem[] {
    const calendar: ContentPlanItem[] = []
    const postsPerWeek = 2 // Monday and Thursday
    const weeksToGenerate = 4

    let currentDate = new Date(startDate)

    // Start from next Monday
    const daysUntilMonday = (8 - currentDate.getDay()) % 7
    currentDate.setDate(currentDate.getDate() + daysUntilMonday)

    for (let week = 0; week < weeksToGenerate; week++) {
        // Monday post
        const mondayPost = createContentPlanItem(currentDate, calendar.length)
        calendar.push(mondayPost)

        // Thursday post
        const thursdayDate = new Date(currentDate)
        thursdayDate.setDate(thursdayDate.getDate() + 3)
        const thursdayPost = createContentPlanItem(thursdayDate, calendar.length)
        calendar.push(thursdayPost)

        // Move to next week
        currentDate.setDate(currentDate.getDate() + 7)
    }

    return calendar
}

function createContentPlanItem(date: Date, index: number): ContentPlanItem {
    // Rotate through keyword clusters
    const cluster = KEYWORD_CLUSTERS[index % KEYWORD_CLUSTERS.length]

    // Generate topic variations
    const topicVariations = [
        `Como calcular ${cluster.primary}: Guia completo 2024`,
        `${cluster.primary.charAt(0).toUpperCase() + cluster.primary.slice(1)}: Tudo que você precisa saber`,
        `Guia definitivo de ${cluster.primary}`,
        `${cluster.primary.charAt(0).toUpperCase() + cluster.primary.slice(1)}: Passo a passo completo`,
        `Entenda ${cluster.primary} de uma vez por todas`
    ]

    const topic = topicVariations[index % topicVariations.length]

    // Estimate traffic based on search volume and difficulty
    const trafficEstimate = {
        'high-easy': 500,
        'high-medium': 300,
        'high-hard': 150,
        'medium-easy': 200,
        'medium-medium': 100,
        'medium-hard': 50,
        'low-easy': 50,
        'low-medium': 30,
        'low-hard': 10
    }

    const key = `${cluster.searchVolume}-${cluster.difficulty}` as keyof typeof trafficEstimate
    const estimatedTraffic = trafficEstimate[key] || 100

    // Priority: high volume + easy difficulty = high priority
    const priorityScore =
        (cluster.searchVolume === 'high' ? 3 : cluster.searchVolume === 'medium' ? 2 : 1) +
        (cluster.difficulty === 'easy' ? 3 : cluster.difficulty === 'medium' ? 2 : 1)

    return {
        id: `plan-${Date.now()}-${index}`,
        topic,
        keywords: [cluster.primary, ...cluster.secondary],
        angle: topic,
        priority: priorityScore,
        estimatedTraffic,
        scheduledDate: date
    }
}

// Get next post to generate based on calendar
export function getNextScheduledPost(calendar: ContentPlanItem[]): ContentPlanItem | null {
    const now = new Date()
    const upcoming = calendar
        .filter(item => item.scheduledDate && item.scheduledDate > now)
        .sort((a, b) => (a.scheduledDate!.getTime() - b.scheduledDate!.getTime()))

    return upcoming[0] || null
}

// Export calendar to JSON
export function exportCalendarToJSON(calendar: ContentPlanItem[]): string {
    return JSON.stringify(calendar, null, 2)
}
