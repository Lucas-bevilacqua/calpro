import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import OpenAI from 'openai'
import { getNextTopic, getRandomAngle, POST_TOPICS } from '@/lib/post-topics'
import { prisma } from '@/lib/prisma'

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

        let topic: typeof POST_TOPICS[number] | undefined
        let angle: string | undefined

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
            // Use next topic from rotation
            topic = getNextTopic()
            angle = getRandomAngle(topic)
        }

        if (!topic) {
            return new NextResponse('No topic available', { status: 400 })
        }


        // Generate blog post using OpenAI with improved hybrid prompt
        const prompt = customPrompt || `
Escreva um artigo de blog evergreen completo e otimizado para SEO sobre: "${angle}"

**CONTEXTO:**
Este artigo é para o calcprobr.com, um site brasileiro de calculadoras financeiras e trabalhistas que ajuda profissionais a tomar decisões informadas sobre finanças pessoais e direitos trabalhistas.

**ESTRUTURA E FORMATO:**

1. **Título Principal (H1):**
   - Atrativo, claro e otimizado para SEO
   - Inclua a palavra-chave principal: "${topic.keywords[0]}"
   - Máximo 60 caracteres
   - Prometa valor concreto ao leitor

2. **Meta Description:**
   - Escreva uma meta description envolvente com 140-160 caracteres
   - Inclua a palavra-chave principal
   - Crie urgência ou curiosidade
   - Formato: Apenas o texto da descrição, sem tags ou comentários.

3. **Introdução (Gancho Emocional):**
   - 3-4 parágrafos que conectem emocionalmente com o leitor
   - Comece com uma reflexão, pergunta ou situação do dia a dia brasileiro
   - Inclua a palavra-chave principal no segundo parágrafo
   - Estabeleça o problema que o artigo resolve
   - Mostre empatia com as dúvidas do leitor

4. **Desenvolvimento:**
   - Mínimo de 1800 palavras no total
   - Use subtítulos H2 e H3 para organizar o conteúdo
   - Inclua a palavra-chave principal em pelo menos um H2
   - Forneça exemplos práticos do contexto brasileiro
   - Use frases curtas e diretas (máximo 20 palavras)
   - Parágrafos de 2-4 linhas para facilitar leitura
   - Inclua listas numeradas ou com bullets quando apropriado
   - Explique termos técnicos de forma simples

5. **Palavras-chave:**
   - Principal: ${topic.keywords[0]}
   - Secundárias: ${topic.keywords.slice(1).join(', ')}
   - Densidade da palavra-chave principal: máximo 1.5%
   - Use sinônimos e variações naturalmente
   - NÃO force palavras-chave de forma artificial

6. **Elementos Visuais:**
   - Sugira 3-4 locais estratégicos para imagens
   - Para cada imagem, forneça uma descrição detalhada do alt text
   - Formato: [IMAGEM: descrição detalhada para alt text]
   - As imagens devem complementar o conteúdo, não apenas decorar

7. **Links Internos:**
   - Sugira 2-3 links para a calculadora relacionada ou outros posts
   - Use texto âncora natural e descritivo
   - Formato: [LINK: texto âncora | /calculadora/${topic.category.toLowerCase()}/${topic.calculator.toLowerCase().replace(/ /g, '-')}]

8. **Conclusão:**
   - Resuma os pontos principais em 2-3 parágrafos
   - Reforce o valor que o leitor ganhou
   - Call-to-action claro e específico para usar a calculadora
   - Exemplo: "Pronto para calcular [X]? Use nossa calculadora gratuita e descubra em segundos!"

9. **Resumo em Bullet Points:**
   - Seção final com título "📌 Principais Pontos"
   - 5-7 bullet points com os takeaways mais importantes
   - Cada ponto deve ser uma frase completa e acionável

**TOM E ESTILO:**

- **Tom:** Profissional mas acessível, amigável e confiável
- **Ponto de vista:** Segunda pessoa (você, seu, sua)
- **Linguagem:** Simples e clara, como uma conversa com um amigo que entende do assunto
- **Evite:** Jargões sem explicação, frases muito longas, linguagem robótica
- **Use:** Exemplos do cotidiano brasileiro, valores em reais (R$), referências à CLT quando relevante

**HUMANIZAÇÃO:**

- Escreva de forma natural e conversacional
- Use perguntas retóricas para engajar ("Você já se perguntou...?")
- Inclua transições suaves entre seções
- Varie o comprimento das frases para criar ritmo
- Mostre empatia com os desafios do leitor
- Seja autêntico - admita quando algo é complexo
- Use expressões brasileiras naturais

**PROIBIÇÕES:**
- NÃO use: "Descubra", "Revolucionário", "Incrível", "Surpreendente"
- NÃO use clickbait ou promessas exageradas
- NÃO repita palavras-chave excessivamente

**FORMATO DE SAÍDA:**
Retorne APENAS o artigo em markdown puro, começando com o título H1.
`.trim()

        console.log('🤖 Generating blog post with AI...')
        console.log(`📝 Topic: ${topic.category} - ${topic.calculator}`)
        console.log(`🎯 Angle: ${angle}`)

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'Você é um escritor especializado em conteúdo SEO para blogs brasileiros sobre finanças e direitos trabalhistas. Escreva artigos naturais, informativos e otimizados para SEO.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 4000,
        })

        const aiContent = completion.choices[0]?.message?.content
        if (!aiContent) {
            throw new Error('No content generated by AI')
        }

        console.log('✅ Content generated successfully')

        // Extract title (first H1)
        const titleMatch = aiContent.match(/^#\s+(.+)$/m)
        const title = titleMatch ? titleMatch[1].trim() : angle

        // Remove title from content to avoid duplication
        const content = aiContent.replace(/^#\s+.+$/m, '').trim()

        // Generate excerpt (first 2 paragraphs)
        const paragraphs = content.split('\n\n').filter(p => !p.startsWith('#') && p.trim().length > 0)
        const excerpt = paragraphs.slice(0, 2).join('\n\n').substring(0, 200) + '...'

        // Generate slug
        const slug = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        // Generate featured image (optional - can be slow)
        let imageUrl = '/images/default-blog.jpg'
        try {
            console.log('🎨 Generating featured image...')
            const { generateFeaturedImage } = await import('@/lib/generate-image')
            const image = await generateFeaturedImage(angle, topic.keywords)
            imageUrl = image.localPath
            console.log('✅ Image generated successfully')
        } catch (imageError: any) {
            console.warn('⚠️ Image generation failed, using default:', imageError.message)
        }

        return NextResponse.json({
            title,
            slug,
            content,
            excerpt,
            image: imageUrl,
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
