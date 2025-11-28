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
Escreva um artigo de blog COMPLETO e DETALHADO otimizado para SEO sobre: "${angle}"

**CONTEXTO:**
Este artigo é para o calcprobr.com, um site brasileiro de calculadoras financeiras e trabalhistas. O objetivo é ranquear no Google e converter visitantes em usuários da calculadora.

**ESTRUTURA OBRIGATÓRIA (2.500-3.000 palavras):**

1. **Título H1:**
   - Inclua: "${topic.keywords[0]}"
   - Formato: "Como Calcular [X] em 2025: Guia Completo com Exemplos"
   - Máximo 60 caracteres

2. **Introdução (200 palavras):**
   - Parágrafo 1: Situação real do dia a dia brasileiro
   - Parágrafo 2: Problema que o artigo resolve (inclua palavra-chave)
   - Parágrafo 3: O que o leitor vai aprender
   - Parágrafo 4: Preview dos benefícios

3. **Seção "O que é [X]?" (H2 - 300 palavras):**
   - Definição clara e simples
   - Por que é importante
   - Contexto legal brasileiro (CLT, se aplicável)
   - Exemplo prático

4. **Seção "Tipos de [X]" ou "Quando Usar" (H2 - 400 palavras):**
   - Liste 3-5 tipos/situações
   - Explique cada um com exemplo
   - Use H3 para cada tipo
   - Tabela comparativa se aplicável

5. **Seção "Como Calcular [X] Passo a Passo" (H2 - 600 palavras):**
   - Fórmula matemática explicada
   - Passo 1, 2, 3... (use H3)
   - Exemplo prático COMPLETO com números reais
   - Cálculo detalhado linha por linha
   - Resultado final destacado

6. **Seção "Exemplo Prático Detalhado" (H2 - 400 palavras):**
   - Situação real brasileira
   - Dados do exemplo (salário, tempo, etc)
   - Cálculo passo a passo
   - Tabela com resultados
   - Interpretação do resultado

7. **Seção "Tabelas e Valores 2025" (H2 - 300 palavras):**
   - Tabela INSS 2025 (se aplicável)
   - Tabela IRRF 2025 (se aplicável)
   - Outros valores oficiais atualizados
   - Fonte das informações

8. **Seção "Perguntas Frequentes" (H2 - 400 palavras):**
   - 5-7 perguntas reais
   - Respostas de 50-100 palavras cada
   - Use H3 para cada pergunta
   - Inclua variações da palavra-chave

9. **Seção "Use Nossa Calculadora" (H2 - 150 palavras):**
   - CTA forte para a calculadora
   - Liste 3-4 benefícios da calculadora
   - Link direto: /calculadora/${topic.category.toLowerCase()}/${topic.calculator.toLowerCase().replace(/ /g, '-')}
   - Botão visual: [**→ Calcular Agora Grátis**]

10. **Conclusão (200 palavras):**
    - Resumo dos pontos principais
    - Reforço do valor
    - CTA final para calculadora
    - Convite para comentários

11. **Resumo Final:**
    - Título: "📌 Principais Pontos"
    - 7-10 bullet points
    - Cada ponto = 1 frase completa

**PALAVRAS-CHAVE:**
- Principal: ${topic.keywords[0]} (usar 8-12 vezes naturalmente)
- Secundárias: ${topic.keywords.slice(1).join(', ')} (usar 3-5 vezes cada)
- LSI Keywords: inclua sinônimos e variações

**ELEMENTOS OBRIGATÓRIOS:**
- ✅ Mínimo 2.500 palavras
- ✅ 3-5 exemplos práticos com números
- ✅ 2-3 tabelas formatadas em markdown (IMPORTANTE: usar formato | coluna | coluna |)
- ✅ 5-7 FAQs
- ✅ 3 CTAs para a calculadora
- ✅ Valores em R$ (reais)
- ✅ Referências à legislação brasileira
- ✅ Data atualizada (2025)

**FORMATO DE TABELAS (OBRIGATÓRIO):**
Use SEMPRE este formato para tabelas:

| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor 1  | Valor 2  | Valor 3  |
| Valor 4  | Valor 5  | Valor 6  |

NUNCA use tabelas em formato ASCII ou texto. SEMPRE use pipes (|) e hífens (-).

Exemplo correto:
| Faixa Salarial | Alíquota |
|----------------|----------|
| Até R$ 1.412   | 7,5%     |
| R$ 1.412 a R$ 2.666 | 9% |

Exemplo ERRADO (não use):
Faixa Salarial | Alíquota
-------------- | --------
Até R$ 1.412   | 7,5%

**TOM:**
- Profissional mas acessível
- Segunda pessoa (você)
- Conversacional, não robótico
- Empático com dúvidas do leitor

**PROIBIDO:**
- ❌ Menos de 2.500 palavras
- ❌ Palavras clickbait
- ❌ Informações desatualizadas
- ❌ Exemplos sem números concretos
- ❌ Linguagem muito técnica sem explicação

**FORMATO DE SAÍDA:**
Retorne APENAS o artigo em markdown, começando com # Título
`.trim()

        console.log('🤖 Generating blog post with AI...')
        console.log(`📝 Topic: ${topic.category} - ${topic.calculator}`)
        console.log(`🎯 Angle: ${angle}`)

        // Call OpenAI API with increased token limit
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `Você é um especialista em SEO e redação de conteúdo para blogs brasileiros sobre finanças e direitos trabalhistas. Você escreve artigos LONGOS (2.500-3.000 palavras), DETALHADOS e OTIMIZADOS que ranqueiam no Google. Seus artigos são informativos, práticos e incluem muitos exemplos com números reais. Você SEMPRE segue a estrutura solicitada e inclui TODAS as seções obrigatórias.

IMPORTANTE: Você SEMPRE formata tabelas em Markdown usando pipes (|) e hífens (-). NUNCA use formato ASCII ou texto.

Exemplo de tabela correta:
| Faixa Salarial | Alíquota | Dedução |
|----------------|----------|---------|
| Até R$ 2.259   | Isento   | -       |
| R$ 2.259 a R$ 2.826 | 7,5% | R$ 169,44 |
| R$ 2.826 a R$ 3.751 | 15%  | R$ 381,44 |`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 8000, // Aumentado para artigos mais longos
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

        // Generate featured image
        let imageUrl = '/images/default-blog.jpg'

        // Try to use Unsplash image based on topic
        try {
            const { generateBlogImage } = await import('@/lib/blog-images')
            imageUrl = generateBlogImage(slug)
            console.log('✅ Using Unsplash image for topic')
        } catch (error: any) {
            console.warn('⚠️ Failed to generate Unsplash image, using default:', error.message)
        }

        // Only generate with DALL-E if explicitly enabled (overrides Unsplash)
        const enableDallE = process.env.ENABLE_DALLE_IMAGES === 'true'

        if (enableDallE) {
            try {
                console.log('🎨 Generating featured image with DALL-E...')
                const { generateFeaturedImage } = await import('@/lib/generate-image')
                const image = await generateFeaturedImage(angle, topic.keywords)
                imageUrl = image.localPath
                console.log('✅ DALL-E image generated successfully')
            } catch (imageError: any) {
                console.warn('⚠️ DALL-E generation failed, keeping Unsplash:', imageError.message)
            }
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
