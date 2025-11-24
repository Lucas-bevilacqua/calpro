// Performance tracking for blog posts
// Tracks views, engagement, and SEO metrics

export interface PostPerformance {
    postId: string
    title: string
    slug: string
    views: number
    avgTimeOnPage: number
    bounceRate: number
    keywords: string[]
    estimatedPosition: number
    publishedDays: number
    trafficGrowth: number
}

export interface PerformanceSummary {
    totalPosts: number
    totalViews: number
    avgViewsPerPost: number
    topPerformers: PostPerformance[]
    underPerformers: PostPerformance[]
    growthRate: number
}

// Simulate performance data (in production, this would come from analytics)
export function generatePerformanceData(posts: any[]): PostPerformance[] {
    return posts.map(post => {
        const publishedDays = Math.floor(
            (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )

        // Simulate views based on age and title keywords
        const baseViews = Math.floor(Math.random() * 500) + 50
        const ageMultiplier = Math.min(publishedDays / 30, 3) // Max 3x for older posts
        const views = Math.floor(baseViews * ageMultiplier)

        // Simulate engagement metrics
        const avgTimeOnPage = Math.floor(Math.random() * 180) + 60 // 60-240 seconds
        const bounceRate = Math.random() * 0.4 + 0.3 // 30-70%

        // Extract keywords from title
        const keywords = extractKeywords(post.title)

        // Estimate position (1-100)
        const estimatedPosition = Math.floor(Math.random() * 50) + 1

        // Calculate growth (views per day)
        const trafficGrowth = publishedDays > 0 ? views / publishedDays : 0

        return {
            postId: post.id,
            title: post.title,
            slug: post.slug,
            views,
            avgTimeOnPage,
            bounceRate,
            keywords,
            estimatedPosition,
            publishedDays,
            trafficGrowth
        }
    })
}

export function getPerformanceSummary(performances: PostPerformance[]): PerformanceSummary {
    const totalViews = performances.reduce((sum, p) => sum + p.views, 0)
    const avgViewsPerPost = performances.length > 0 ? totalViews / performances.length : 0

    // Sort by views
    const sorted = [...performances].sort((a, b) => b.views - a.views)

    // Top 5 performers
    const topPerformers = sorted.slice(0, 5)

    // Bottom 5 performers (but only if published for at least 7 days)
    const underPerformers = sorted
        .filter(p => p.publishedDays >= 7)
        .slice(-5)
        .reverse()

    // Calculate overall growth rate
    const totalGrowth = performances.reduce((sum, p) => sum + p.trafficGrowth, 0)
    const growthRate = performances.length > 0 ? totalGrowth / performances.length : 0

    return {
        totalPosts: performances.length,
        totalViews,
        avgViewsPerPost: Math.floor(avgViewsPerPost),
        topPerformers,
        underPerformers,
        growthRate: Math.floor(growthRate)
    }
}

// Extract keywords from title
function extractKeywords(title: string): string[] {
    const stopWords = ['como', 'para', 'de', 'do', 'da', 'em', 'o', 'a', 'e', 'que', 'um', 'uma', 'guia', 'completo']

    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.includes(word))
        .slice(0, 5)
}

// Identify posts that need optimization
export function getOptimizationSuggestions(performances: PostPerformance[]): {
    post: PostPerformance
    suggestions: string[]
}[] {
    return performances
        .filter(p => p.publishedDays >= 7) // Only posts older than 7 days
        .map(post => {
            const suggestions: string[] = []

            // Low views
            if (post.views < 50 && post.publishedDays >= 30) {
                suggestions.push('Título pode não ser atrativo - considere reformular')
                suggestions.push('Adicionar mais palavras-chave no conteúdo')
            }

            // High bounce rate
            if (post.bounceRate > 0.6) {
                suggestions.push('Taxa de rejeição alta - melhorar introdução')
                suggestions.push('Adicionar mais links internos')
            }

            // Low time on page
            if (post.avgTimeOnPage < 90) {
                suggestions.push('Tempo na página baixo - conteúdo pode estar curto')
                suggestions.push('Adicionar exemplos práticos e imagens')
            }

            // Poor position
            if (post.estimatedPosition > 30) {
                suggestions.push('Posição no Google baixa - otimizar SEO on-page')
                suggestions.push('Conseguir backlinks de qualidade')
            }

            return {
                post,
                suggestions
            }
        })
        .filter(item => item.suggestions.length > 0)
        .sort((a, b) => b.suggestions.length - a.suggestions.length)
        .slice(0, 10) // Top 10 posts needing optimization
}
