// A/B Testing for blog post titles and meta descriptions
// Helps optimize click-through rates

export interface ABTest {
    id: string
    postId: string
    variantA: {
        title: string
        metaDescription: string
    }
    variantB: {
        title: string
        metaDescription: string
    }
    metrics: {
        variantA: {
            impressions: number
            clicks: number
            ctr: number
        }
        variantB: {
            impressions: number
            clicks: number
            ctr: number
        }
    }
    winner?: 'A' | 'B'
    status: 'running' | 'completed'
    startDate: Date
    endDate?: Date
}

export interface TitleVariation {
    original: string
    variations: string[]
}

// Generate title variations using AI patterns
export function generateTitleVariations(originalTitle: string): string[] {
    const variations: string[] = []

    // Pattern 1: Add year
    if (!originalTitle.includes('2024') && !originalTitle.includes('2025')) {
        variations.push(`${originalTitle} em 2024`)
    }

    // Pattern 2: Add "Guia Completo"
    if (!originalTitle.toLowerCase().includes('guia')) {
        variations.push(`${originalTitle}: Guia Completo`)
    }

    // Pattern 3: Question format
    const questionWords = ['Como', 'Quando', 'Onde', 'Por que', 'Qual']
    const startsWithQuestion = questionWords.some(word =>
        originalTitle.startsWith(word)
    )
    if (!startsWithQuestion) {
        variations.push(`Como ${originalTitle.charAt(0).toLowerCase() + originalTitle.slice(1)}?`)
    }

    // Pattern 4: Add numbers
    if (!/\d/.test(originalTitle)) {
        variations.push(`${originalTitle}: 5 Dicas Essenciais`)
        variations.push(`7 Passos para ${originalTitle}`)
    }

    // Pattern 5: Add urgency
    variations.push(`${originalTitle} - Não Perca!`)
    variations.push(`${originalTitle} Atualizado`)

    return variations.slice(0, 3) // Return top 3 variations
}

// Calculate which variant is winning
export function calculateWinner(test: ABTest): 'A' | 'B' | null {
    const { variantA, variantB } = test.metrics

    // Need minimum sample size
    const minImpressions = 100
    if (variantA.impressions < minImpressions || variantB.impressions < minImpressions) {
        return null
    }

    // Calculate CTR
    const ctrA = variantA.impressions > 0 ? variantA.clicks / variantA.impressions : 0
    const ctrB = variantB.impressions > 0 ? variantB.clicks / variantB.impressions : 0

    // Need significant difference (at least 10%)
    const difference = Math.abs(ctrA - ctrB)
    const minDifference = 0.1 // 10%

    if (difference < minDifference) {
        return null // No clear winner yet
    }

    return ctrA > ctrB ? 'A' : 'B'
}

// Get test recommendations
export function getTestRecommendations(posts: any[]): {
    post: any
    reason: string
    suggestedVariations: string[]
}[] {
    return posts
        .filter(post => post.published)
        .map(post => {
            const reasons: string[] = []

            // Title too long
            if (post.title.length > 60) {
                reasons.push('Título muito longo para SEO')
            }

            // Title too short
            if (post.title.length < 30) {
                reasons.push('Título muito curto - pode não ser atrativo')
            }

            // No numbers
            if (!/\d/.test(post.title)) {
                reasons.push('Títulos com números tendem a ter melhor CTR')
            }

            // No year
            if (!post.title.includes('2024') && !post.title.includes('2025')) {
                reasons.push('Adicionar ano pode melhorar relevância')
            }

            if (reasons.length === 0) return null

            return {
                post,
                reason: reasons[0],
                suggestedVariations: generateTitleVariations(post.title)
            }
        })
        .filter(Boolean)
        .slice(0, 5) as any[]
}
