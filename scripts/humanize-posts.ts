import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Mapeamento de tópicos para calculadoras relevantes
const CALCULATOR_LINKS: Record<string, { url: string; text: string }[]> = {
    'salário': [
        { url: '/calculadora/trabalhista/salario-liquido', text: 'calculadora de salário líquido' },
        { url: '/calculadora/trabalhista/horas-extras', text: 'calculadora de horas extras' }
    ],
    'férias': [
        { url: '/calculadora/trabalhista/ferias', text: 'calculadora de férias' },
        { url: '/calculadora/trabalhista/abono-pecuniario', text: 'calculadora de abono pecuniário' }
    ],
    'rescisão': [
        { url: '/calculadora/trabalhista/rescisao-trabalhista', text: 'calculadora de rescisão' }
    ],
    'horas extras': [
        { url: '/calculadora/trabalhista/horas-extras', text: 'calculadora de horas extras' }
    ],
    'juros': [
        { url: '/calculadora/financeira/juros-compostos', text: 'calculadora de juros compostos' }
    ],
    'financiamento': [
        { url: '/calculadora/financeira/financiamento', text: 'calculadora de financiamento' }
    ],
    'freelancer': [
        { url: '/calculadora/freelancer/valor-hora', text: 'calculadora de valor hora' }
    ],
    'mei': [
        { url: '/calculadora/impostos/mei', text: 'calculadora MEI' }
    ]
}

async function humanizePost(post: any) {
    console.log(`\n🔄 Humanizando: ${post.title}`)

    const prompt = `Você é um editor de conteúdo especializado em tornar textos mais naturais e humanos.

TAREFA: Reescreva o artigo abaixo para que pareça escrito por um humano, não por IA.

DIRETRIZES OBRIGATÓRIAS:
1. **Tom Conversacional**: Use "você" em vez de linguagem formal
2. **Remova Clichês de IA**: Elimine frases como "É importante ressaltar", "Vale destacar", "Neste artigo", etc.
3. **Adicione Personalidade**: Use exemplos do dia a dia, perguntas retóricas, expressões brasileiras
4. **Varie Estrutura**: Misture parágrafos curtos e longos, use listas quando apropriado
5. **Seja Direto**: Vá direto ao ponto, sem enrolação
6. **Mantenha SEO**: Preserve palavras-chave importantes e estrutura H2/H3
7. **Adicione Humanidade**: Inclua frases como "Vou te explicar", "Olha só", "Sabe aquela situação..."

ARTIGO ORIGINAL:
${post.content}

ARTIGO HUMANIZADO (mantenha formato Markdown):
`

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'Você é um editor brasileiro experiente que transforma textos formais em conteúdo natural e conversacional.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 3000
        })

        return completion.choices[0].message.content || post.content
    } catch (error) {
        console.error(`❌ Erro ao humanizar: ${error}`)
        return post.content
    }
}

function addInternalLinks(content: string, postTitle: string): string {
    let updatedContent = content

    // Encontrar calculadoras relevantes baseado no título e conteúdo
    const relevantLinks: { url: string; text: string }[] = []

    Object.entries(CALCULATOR_LINKS).forEach(([keyword, links]) => {
        const titleLower = postTitle.toLowerCase()
        const contentLower = content.toLowerCase()

        if (titleLower.includes(keyword) || contentLower.includes(keyword)) {
            relevantLinks.push(...links)
        }
    })

    // Remover duplicatas
    const uniqueLinks = Array.from(new Set(relevantLinks.map(l => l.url)))
        .map(url => relevantLinks.find(l => l.url === url)!)

    // Adicionar links de forma natural no conteúdo
    if (uniqueLinks.length > 0) {
        // Adicionar CTA no final antes da conclusão
        const ctaSection = `\n\n## Calcule Agora Mesmo\n\nQuer fazer seus próprios cálculos? Use nossa${uniqueLinks.length > 1 ? 's' : ''} ${uniqueLinks.map(link => `[${link.text}](${link.url})`).join(' ou ')} gratuitamente!\n\n`

        // Inserir antes da conclusão ou FAQ
        if (updatedContent.includes('## Conclusão') || updatedContent.includes('## FAQ')) {
            updatedContent = updatedContent.replace(
                /(## (?:Conclusão|FAQ))/,
                `${ctaSection}$1`
            )
        } else {
            // Se não tiver conclusão, adicionar no final
            updatedContent += ctaSection
        }
    }

    return updatedContent
}

async function humanizeAllPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        })

        console.log(`📝 Encontrados ${posts.length} posts para humanizar\n`)

        for (const post of posts) {
            // Humanizar conteúdo
            const humanizedContent = await humanizePost(post)

            // Adicionar links internos
            const contentWithLinks = addInternalLinks(humanizedContent, post.title)

            // Atualizar no banco
            await prisma.post.update({
                where: { id: post.id },
                data: { content: contentWithLinks }
            })

            console.log(`✅ Atualizado: ${post.title}`)

            // Delay para não sobrecarregar a API
            await new Promise(resolve => setTimeout(resolve, 2000))
        }

        console.log(`\n🎉 Todos os ${posts.length} posts foram humanizados e linkados!`)
    } catch (error) {
        console.error('❌ Erro:', error)
    } finally {
        await prisma.$disconnect()
    }
}

humanizeAllPosts()
