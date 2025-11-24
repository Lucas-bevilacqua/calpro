import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import OpenAI from 'openai'
import { getNextTopic, getRandomAngle, POST_TOPICS } from '@/lib/post-topics'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    try {
        // Check authentication and admin role
        const session = await getServerSession(authOptions)

        if (!session?.user || session.user.role !== 'ADMIN') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { topicId, customPrompt } = body

        let topic
        let angle

        if (topicId) {
            // Use specific topic
            const [category, calculator] = topicId.split('-')
            topic = POST_TOPICS.find(
                t => t.category === category && t.calculator === calculator
            )
            if (!topic) {
                return new NextResponse('Topic not found', { status: 404 })
            }
            angle = getRandomAngle(topic)
        } else {
            // Get random topic
            topic = getNextTopic()
            angle = getRandomAngle(topic)
        }

        // Generate blog post using OpenAI
        const prompt = customPrompt || `
Escreva um artigo de blog completo e otimizado para SEO sobre: "${angle}"

Contexto: Este é para um site de calculadoras financeiras e trabalhistas (calcprobr.com).

Requisitos:
- Título atrativo e otimizado para SEO
- Introdução envolvente (2-3 parágrafos)
- Conteúdo estruturado com subtítulos (H2, H3)
- Mínimo de 800 palavras
- Tom profissional mas acessível
- Inclua exemplos práticos
- Use as palavras-chave: ${topic.keywords.join(', ')}
- Conclusão com call-to-action para usar a calculadora
- Formato em Markdown

NÃO inclua meta tags ou informações técnicas, apenas o conteúdo do artigo.
`

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Cheaper and faster, good quality
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
            max_tokens: 2500,
        })

        const content = completion.choices[0].message.content || ''

        // Extract title from content (first # heading)
        const titleMatch = content.match(/^#\s+(.+)$/m)
        const title = titleMatch ? titleMatch[1] : angle

        // Generate excerpt (first 2 paragraphs)
        const paragraphs = content.split('\n\n').filter(p => !p.startsWith('#'))
        const excerpt = paragraphs.slice(0, 2).join('\n\n').substring(0, 200) + '...'

        // Generate slug
        const slug = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        return NextResponse.json({
            title,
            slug,
            content,
            excerpt,
            topic: `${topic.category} - ${topic.calculator}`,
            keywords: topic.keywords,
        })

    } catch (error: any) {
        console.error('AI generation error:', error)
        return new NextResponse(
            error.message || 'Failed to generate post',
            { status: 500 }
        )
    }
}
