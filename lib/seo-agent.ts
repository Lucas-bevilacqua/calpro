// SEO Agent - Automated content management
// Orchestrates all SEO tasks automatically

import { generateContentCalendar } from './seo-strategy'
import { generateFeaturedImage } from './generate-image'
import { findRelatedPosts, insertInternalLinks } from './internal-linking'
import { identifyRefreshCandidates, autoUpdateYear } from './content-refresh'
import { generateMonthlyReport } from './seo-reporting'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export interface AgentTask {
    id: string
    type: 'generate_post' | 'refresh_post' | 'add_links' | 'generate_report'
    status: 'pending' | 'running' | 'completed' | 'failed'
    progress: number
    result?: any
    error?: string
}

export interface AgentRun {
    id: string
    startTime: Date
    endTime?: Date
    tasks: AgentTask[]
    summary: {
        postsGenerated: number
        postsRefreshed: number
        linksAdded: number
        errors: number
    }
}

// Run full SEO automation
export async function runSEOAgent(
    prisma: any,
    options: {
        generateNewPosts?: number
        refreshOldPosts?: boolean
        addInternalLinks?: boolean
        generateReport?: boolean
    } = {}
): Promise<AgentRun> {
    const runId = `run-${Date.now()}`
    const tasks: AgentTask[] = []
    const summary = {
        postsGenerated: 0,
        postsRefreshed: 0,
        linksAdded: 0,
        errors: 0
    }

    console.log('🤖 SEO Agent iniciado...\n')

    try {
        // Task 1: Generate new posts
        if (options.generateNewPosts && options.generateNewPosts > 0) {
            for (let i = 0; i < options.generateNewPosts; i++) {
                const task: AgentTask = {
                    id: `generate-${i}`,
                    type: 'generate_post',
                    status: 'running',
                    progress: 0
                }
                tasks.push(task)

                try {
                    console.log(`📝 Gerando post ${i + 1}/${options.generateNewPosts}...`)

                    // Generate post content
                    const postData = await generatePostWithAI(prisma)

                    task.progress = 100
                    task.status = 'completed'
                    task.result = postData
                    summary.postsGenerated++

                    console.log(`✅ Post criado: "${postData.title}"`)
                } catch (error: any) {
                    task.status = 'failed'
                    task.error = error.message
                    summary.errors++
                    console.error(`❌ Erro ao gerar post: ${error.message}`)
                }
            }
        }

        // Task 2: Refresh old posts
        if (options.refreshOldPosts) {
            const refreshTask: AgentTask = {
                id: 'refresh-posts',
                type: 'refresh_post',
                status: 'running',
                progress: 0
            }
            tasks.push(refreshTask)

            try {
                console.log('\n🔄 Atualizando posts antigos...')

                const posts = await prisma.post.findMany({
                    where: { published: true }
                })

                const candidates = identifyRefreshCandidates(posts)

                for (const candidate of candidates.slice(0, 3)) { // Max 3 per run
                    const post = await prisma.post.findUnique({
                        where: { id: candidate.postId }
                    })

                    const { updatedContent, updatedTitle } = autoUpdateYear(
                        post.content,
                        post.title
                    )

                    await prisma.post.update({
                        where: { id: candidate.postId },
                        data: {
                            title: updatedTitle,
                            content: updatedContent
                        }
                    })

                    summary.postsRefreshed++
                    console.log(`✅ Post atualizado: "${updatedTitle}"`)
                }

                refreshTask.progress = 100
                refreshTask.status = 'completed'
            } catch (error: any) {
                refreshTask.status = 'failed'
                refreshTask.error = error.message
                summary.errors++
                console.error(`❌ Erro ao atualizar posts: ${error.message}`)
            }
        }

        // Task 3: Add internal links
        if (options.addInternalLinks) {
            const linksTask: AgentTask = {
                id: 'add-links',
                type: 'add_links',
                status: 'running',
                progress: 0
            }
            tasks.push(linksTask)

            try {
                console.log('\n🔗 Adicionando links internos...')

                const posts = await prisma.post.findMany({
                    where: { published: true }
                })

                for (const post of posts.slice(0, 5)) { // Max 5 per run
                    const suggestions = findRelatedPosts(post, posts, 3)

                    if (suggestions.length > 0) {
                        const updatedContent = insertInternalLinks(
                            post.content,
                            suggestions,
                            3
                        )

                        await prisma.post.update({
                            where: { id: post.id },
                            data: { content: updatedContent }
                        })

                        summary.linksAdded += suggestions.length
                        console.log(`✅ ${suggestions.length} links adicionados em "${post.title}"`)
                    }
                }

                linksTask.progress = 100
                linksTask.status = 'completed'
            } catch (error: any) {
                linksTask.status = 'failed'
                linksTask.error = error.message
                summary.errors++
                console.error(`❌ Erro ao adicionar links: ${error.message}`)
            }
        }

        // Task 4: Generate report
        if (options.generateReport) {
            const reportTask: AgentTask = {
                id: 'generate-report',
                type: 'generate_report',
                status: 'running',
                progress: 0
            }
            tasks.push(reportTask)

            try {
                console.log('\n📊 Gerando relatório...')

                const posts = await prisma.post.findMany()
                const report = generateMonthlyReport(posts)

                reportTask.progress = 100
                reportTask.status = 'completed'
                reportTask.result = report

                console.log('✅ Relatório gerado')
            } catch (error: any) {
                reportTask.status = 'failed'
                reportTask.error = error.message
                summary.errors++
                console.error(`❌ Erro ao gerar relatório: ${error.message}`)
            }
        }

        console.log('\n🎉 SEO Agent finalizado!')
        console.log(`📊 Resumo:`)
        console.log(`   Posts gerados: ${summary.postsGenerated}`)
        console.log(`   Posts atualizados: ${summary.postsRefreshed}`)
        console.log(`   Links adicionados: ${summary.linksAdded}`)
        console.log(`   Erros: ${summary.errors}`)

    } catch (error: any) {
        console.error('❌ Erro fatal:', error.message)
        summary.errors++
    }

    return {
        id: runId,
        startTime: new Date(),
        endTime: new Date(),
        tasks,
        summary
    }
}

// Helper: Generate post with AI
async function generatePostWithAI(prisma: any) {
    const { getNextTopic, getRandomAngle } = await import('./post-topics')

    const topic = getNextTopic([])
    const angle = getRandomAngle(topic)

    const prompt = `
Escreva um artigo de blog completo e otimizado para SEO sobre: "${angle}"

Contexto: Este é para um site de calculadoras financeiras e trabalhistas (calcprobr.com).

Requisitos:
- Título atrativo e otimizado para SEO (H1)
- Introdução envolvente (2-3 parágrafos)
- Conteúdo estruturado com subtítulos (H2, H3)
- Mínimo de 1000 palavras
- Tom profissional mas acessível
- Inclua exemplos práticos e numéricos
- Use as palavras-chave: ${topic.keywords.join(', ')}
- Adicione uma seção de FAQ com 3-5 perguntas
- Conclusão com call-to-action para usar a calculadora do calcprobr.com
- Formato em Markdown

NÃO inclua meta tags ou informações técnicas, apenas o conteúdo do artigo.
`

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: 'Você é um especialista em finanças pessoais e direito trabalhista brasileiro. Escreva conteúdo educativo, preciso e otimizado para SEO.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.7,
        max_tokens: 3000,
    })

    const content = completion.choices[0].message.content || ''

    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : angle

    // Generate slug
    const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

    // Generate excerpt
    const paragraphs = content.split('\n\n').filter(p => !p.startsWith('#'))
    const excerpt = paragraphs.slice(0, 2).join('\n\n').substring(0, 200) + '...'

    // Get admin user
    const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    })

    // Save post
    const post = await prisma.post.create({
        data: {
            title,
            slug,
            content,
            excerpt,
            published: false,
            authorId: adminUser.id,
        }
    })

    return post
}
