// Content refresh automation
// Identifies and updates old posts to maintain SEO performance

export interface RefreshCandidate {
    postId: string
    title: string
    slug: string
    publishedDate: Date
    lastUpdated: Date
    ageInDays: number
    currentPerformance: {
        views: number
        position: number
    }
    refreshPriority: number
    reasons: string[]
    suggestedUpdates: string[]
}

export interface RefreshStrategy {
    updateFrequency: 'monthly' | 'quarterly' | 'yearly'
    minAgeForRefresh: number // days
    performanceThreshold: number // views
}

// Identify posts that need refreshing
export function identifyRefreshCandidates(
    posts: any[],
    strategy: RefreshStrategy = {
        updateFrequency: 'quarterly',
        minAgeForRefresh: 90,
        performanceThreshold: 100
    }
): RefreshCandidate[] {
    const now = new Date()

    return posts
        .filter(post => post.published)
        .map(post => {
            const publishedDate = new Date(post.createdAt)
            const lastUpdated = new Date(post.updatedAt)
            const ageInDays = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24))
            const daysSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24))

            // Skip recent posts
            if (ageInDays < strategy.minAgeForRefresh) {
                return null
            }

            const reasons: string[] = []
            const suggestedUpdates: string[] = []
            let priority = 0

            // Check age
            if (ageInDays > 365) {
                reasons.push('Post tem mais de 1 ano')
                suggestedUpdates.push('Atualizar estatísticas e exemplos')
                suggestedUpdates.push('Verificar se leis/regras mudaram')
                priority += 3
            } else if (ageInDays > 180) {
                reasons.push('Post tem mais de 6 meses')
                suggestedUpdates.push('Revisar informações')
                priority += 2
            }

            // Check if title has old year
            const currentYear = now.getFullYear()
            const titleHasOldYear = post.title.match(/\d{4}/)
            if (titleHasOldYear && !post.title.includes(currentYear.toString())) {
                reasons.push('Título contém ano desatualizado')
                suggestedUpdates.push(`Atualizar ano no título para ${currentYear}`)
                priority += 2
            }

            // Check content for old dates
            const contentHasOldYear = post.content.includes((currentYear - 1).toString())
            if (contentHasOldYear) {
                reasons.push('Conteúdo menciona ano anterior')
                suggestedUpdates.push('Atualizar referências de datas')
                priority += 1
            }

            // Check if not updated recently
            if (daysSinceUpdate > 180) {
                reasons.push('Não atualizado há mais de 6 meses')
                priority += 1
            }

            // Simulate performance (in production, use real data)
            const views = Math.floor(Math.random() * 500)
            const position = Math.floor(Math.random() * 50) + 1

            // Low performance
            if (views < strategy.performanceThreshold && ageInDays > 90) {
                reasons.push('Performance abaixo do esperado')
                suggestedUpdates.push('Melhorar SEO on-page')
                suggestedUpdates.push('Adicionar mais palavras-chave')
                priority += 2
            }

            // Poor ranking
            if (position > 20) {
                reasons.push('Posição no Google baixa')
                suggestedUpdates.push('Otimizar título e meta description')
                suggestedUpdates.push('Adicionar links internos')
                priority += 1
            }

            if (reasons.length === 0) return null

            return {
                postId: post.id,
                title: post.title,
                slug: post.slug,
                publishedDate,
                lastUpdated,
                ageInDays,
                currentPerformance: { views, position },
                refreshPriority: priority,
                reasons,
                suggestedUpdates: [...new Set(suggestedUpdates)] // Remove duplicates
            }
        })
        .filter(Boolean)
        .sort((a, b) => b!.refreshPriority - a!.refreshPriority) as RefreshCandidate[]
}

// Generate refresh plan
export function generateRefreshPlan(
    candidates: RefreshCandidate[],
    postsPerWeek: number = 2
): {
    week: number
    posts: RefreshCandidate[]
}[] {
    const plan: { week: number; posts: RefreshCandidate[] }[] = []
    let currentWeek = 1

    for (let i = 0; i < candidates.length; i += postsPerWeek) {
        plan.push({
            week: currentWeek,
            posts: candidates.slice(i, i + postsPerWeek)
        })
        currentWeek++
    }

    return plan
}

// Auto-update post with current year
export function autoUpdateYear(content: string, title: string): {
    updatedContent: string
    updatedTitle: string
    changes: string[]
} {
    const currentYear = new Date().getFullYear()
    const previousYear = currentYear - 1
    const changes: string[] = []

    // Update title
    let updatedTitle = title
    const titleYearMatch = title.match(/\d{4}/)
    if (titleYearMatch && titleYearMatch[0] !== currentYear.toString()) {
        updatedTitle = title.replace(/\d{4}/, currentYear.toString())
        changes.push(`Título atualizado: ${titleYearMatch[0]} → ${currentYear}`)
    }

    // Update content
    let updatedContent = content
    const contentYearMatches = content.match(new RegExp(previousYear.toString(), 'g'))
    if (contentYearMatches) {
        updatedContent = content.replace(
            new RegExp(previousYear.toString(), 'g'),
            currentYear.toString()
        )
        changes.push(`${contentYearMatches.length} referências de ${previousYear} atualizadas para ${currentYear}`)
    }

    return {
        updatedContent,
        updatedTitle,
        changes
    }
}
