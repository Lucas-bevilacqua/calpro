// Automated SEO reporting
// Generates comprehensive reports on blog performance

export interface SEOReport {
    period: {
        start: Date
        end: Date
    }
    summary: {
        totalPosts: number
        newPosts: number
        totalViews: number
        avgViewsPerPost: number
        growthRate: number
    }
    topPerformers: Array<{
        title: string
        slug: string
        views: number
        ctr: number
    }>
    improvements: Array<{
        metric: string
        change: number
        trend: 'up' | 'down'
    }>
    recommendations: string[]
}

// Generate monthly report
export function generateMonthlyReport(posts: any[]): SEOReport {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Filter posts from this month
    const newPosts = posts.filter(post => {
        const createdAt = new Date(post.createdAt)
        return createdAt >= startOfMonth && createdAt <= endOfMonth && post.published
    })

    // Simulate metrics (in production, use real analytics)
    const totalViews = Math.floor(Math.random() * 5000) + 1000
    const avgViewsPerPost = posts.length > 0 ? Math.floor(totalViews / posts.length) : 0
    const growthRate = Math.floor(Math.random() * 30) + 5 // 5-35%

    // Top performers
    const topPerformers = posts
        .filter(p => p.published)
        .map(post => ({
            title: post.title,
            slug: post.slug,
            views: Math.floor(Math.random() * 1000),
            ctr: Math.random() * 0.1 + 0.02 // 2-12%
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)

    // Improvements
    const improvements = [
        { metric: 'Visualizações', change: growthRate, trend: 'up' as const },
        { metric: 'Taxa de Cliques', change: 2.3, trend: 'up' as const },
        { metric: 'Tempo na Página', change: 15, trend: 'up' as const },
        { metric: 'Taxa de Rejeição', change: -8, trend: 'down' as const }
    ]

    // Recommendations
    const recommendations = generateRecommendations(posts, newPosts.length)

    return {
        period: {
            start: startOfMonth,
            end: endOfMonth
        },
        summary: {
            totalPosts: posts.filter(p => p.published).length,
            newPosts: newPosts.length,
            totalViews,
            avgViewsPerPost,
            growthRate
        },
        topPerformers,
        improvements,
        recommendations
    }
}

// Generate recommendations based on data
function generateRecommendations(posts: any[], newPostsCount: number): string[] {
    const recommendations: string[] = []

    if (newPostsCount < 4) {
        recommendations.push('Aumentar frequência de publicação para 2 posts/semana')
    }

    if (posts.length > 0) {
        const oldPosts = posts.filter(p => {
            const age = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            return age > 180
        })

        if (oldPosts.length > 5) {
            recommendations.push(`Atualizar ${oldPosts.length} posts antigos (>6 meses)`)
        }
    }

    recommendations.push('Adicionar mais links internos entre posts relacionados')
    recommendations.push('Otimizar meta descriptions para melhorar CTR')
    recommendations.push('Criar conteúdo sobre palavras-chave de alta prioridade')

    return recommendations.slice(0, 5)
}

// Format report as markdown
export function formatReportAsMarkdown(report: SEOReport): string {
    const { period, summary, topPerformers, improvements, recommendations } = report

    const startDate = period.start.toLocaleDateString('pt-BR')
    const endDate = period.end.toLocaleDateString('pt-BR')

    return `# Relatório SEO - ${startDate} a ${endDate}

## 📊 Resumo

- **Total de Posts:** ${summary.totalPosts}
- **Novos Posts:** ${summary.newPosts}
- **Visualizações:** ${summary.totalViews.toLocaleString()}
- **Média por Post:** ${summary.avgViewsPerPost}
- **Crescimento:** +${summary.growthRate}%

## 🏆 Top 5 Posts

${topPerformers.map((post, i) => `${i + 1}. **${post.title}**
   - ${post.views} visualizações
   - CTR: ${(post.ctr * 100).toFixed(2)}%`).join('\n\n')}

## 📈 Melhorias

${improvements.map(imp => {
        const icon = imp.trend === 'up' ? '📈' : '📉'
        const sign = imp.change > 0 ? '+' : ''
        return `- ${icon} ${imp.metric}: ${sign}${imp.change}%`
    }).join('\n')}

## 💡 Recomendações

${recommendations.map(rec => `- ${rec}`).join('\n')}

---

*Relatório gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')}*
`
}

// Export report to file
export function exportReport(report: SEOReport, format: 'markdown' | 'json' = 'markdown'): string {
    if (format === 'json') {
        return JSON.stringify(report, null, 2)
    }

    return formatReportAsMarkdown(report)
}
