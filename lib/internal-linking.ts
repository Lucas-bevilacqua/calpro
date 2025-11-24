// Internal linking automation
// Suggests and creates internal links between related posts

export interface InternalLink {
    fromPostId: string
    toPostId: string
    anchorText: string
    relevanceScore: number
}

export interface LinkSuggestion {
    targetPost: {
        id: string
        title: string
        slug: string
    }
    suggestedAnchors: string[]
    relevanceScore: number
    reason: string
}

// Find related posts based on keywords and content similarity
export function findRelatedPosts(
    currentPost: any,
    allPosts: any[],
    maxSuggestions: number = 5
): LinkSuggestion[] {
    const currentKeywords = extractKeywords(currentPost.title + ' ' + currentPost.content)

    const scored = allPosts
        .filter(post => post.id !== currentPost.id && post.published)
        .map(post => {
            const postKeywords = extractKeywords(post.title + ' ' + (post.excerpt || ''))
            const score = calculateRelevance(currentKeywords, postKeywords)

            return {
                post,
                score,
                commonKeywords: currentKeywords.filter(k => postKeywords.includes(k))
            }
        })
        .filter(item => item.score > 0.2) // Minimum relevance threshold
        .sort((a, b) => b.score - a.score)
        .slice(0, maxSuggestions)

    return scored.map(item => ({
        targetPost: {
            id: item.post.id,
            title: item.post.title,
            slug: item.post.slug
        },
        suggestedAnchors: generateAnchorTexts(item.post.title, item.commonKeywords),
        relevanceScore: Math.round(item.score * 100),
        reason: `${item.commonKeywords.length} palavras-chave em comum: ${item.commonKeywords.slice(0, 3).join(', ')}`
    }))
}

// Calculate relevance between two sets of keywords
function calculateRelevance(keywords1: string[], keywords2: string[]): number {
    const common = keywords1.filter(k => keywords2.includes(k))
    const total = new Set([...keywords1, ...keywords2]).size

    return total > 0 ? common.length / total : 0
}

// Extract keywords from text
function extractKeywords(text: string): string[] {
    const stopWords = [
        'como', 'para', 'de', 'do', 'da', 'em', 'o', 'a', 'e', 'que', 'um', 'uma',
        'guia', 'completo', 'sobre', 'com', 'por', 'no', 'na', 'os', 'as', 'dos', 'das'
    ]

    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.includes(word))
        .filter((word, index, self) => self.indexOf(word) === index) // Unique
        .slice(0, 20)
}

// Generate anchor text variations
function generateAnchorTexts(title: string, keywords: string[]): string[] {
    const anchors: string[] = []

    // Use title (truncated if too long)
    if (title.length <= 60) {
        anchors.push(title)
    } else {
        anchors.push(title.substring(0, 57) + '...')
    }

    // Use main keywords
    if (keywords.length > 0) {
        anchors.push(keywords[0])
        if (keywords.length > 1) {
            anchors.push(`${keywords[0]} e ${keywords[1]}`)
        }
    }

    // Generic but contextual
    anchors.push('Saiba mais')
    anchors.push('Leia também')

    return anchors.slice(0, 3)
}

// Insert internal links into content
export function insertInternalLinks(
    content: string,
    suggestions: LinkSuggestion[],
    maxLinks: number = 3
): string {
    let updatedContent = content
    let linksInserted = 0

    for (const suggestion of suggestions) {
        if (linksInserted >= maxLinks) break

        // Try each anchor text
        for (const anchor of suggestion.suggestedAnchors) {
            // Find anchor text in content (case insensitive)
            const regex = new RegExp(`\\b${escapeRegex(anchor)}\\b`, 'i')
            const match = updatedContent.match(regex)

            if (match) {
                // Replace with markdown link
                const link = `[${match[0]}](/blog/${suggestion.targetPost.slug})`
                updatedContent = updatedContent.replace(regex, link)
                linksInserted++
                break
            }
        }
    }

    // If no natural links found, add a "Related Posts" section
    if (linksInserted === 0 && suggestions.length > 0) {
        const relatedSection = `\n\n## Artigos Relacionados\n\n${suggestions
            .slice(0, 3)
            .map(s => `- [${s.targetPost.title}](/blog/${s.targetPost.slug})`)
            .join('\n')}\n`

        updatedContent += relatedSection
    }

    return updatedContent
}

// Escape special regex characters
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Analyze internal linking structure
export function analyzeInternalLinks(posts: any[]): {
    totalLinks: number
    avgLinksPerPost: number
    postsWithoutLinks: number
    mostLinkedPosts: Array<{ post: any; linkCount: number }>
} {
    const linkCounts = new Map<string, number>()
    let totalLinks = 0

    posts.forEach(post => {
        const links = (post.content.match(/\[.*?\]\(\/blog\/.*?\)/g) || []).length
        totalLinks += links

        // Count links to each post
        const linkedSlugs = (post.content.match(/\/blog\/([\w-]+)/g) || [])
            .map((match: string) => match.replace('/blog/', ''))

        linkedSlugs.forEach((slug: string) => {
            linkCounts.set(slug, (linkCounts.get(slug) || 0) + 1)
        })
    })

    const postsWithoutLinks = posts.filter(post =>
        !(post.content.match(/\[.*?\]\(\/blog\/.*?\)/g) || []).length
    ).length

    const mostLinked = Array.from(linkCounts.entries())
        .map(([slug, count]) => ({
            post: posts.find(p => p.slug === slug),
            linkCount: count
        }))
        .filter(item => item.post)
        .sort((a, b) => b.linkCount - a.linkCount)
        .slice(0, 5)

    return {
        totalLinks,
        avgLinksPerPost: posts.length > 0 ? Math.round(totalLinks / posts.length) : 0,
        postsWithoutLinks,
        mostLinkedPosts: mostLinked
    }
}
