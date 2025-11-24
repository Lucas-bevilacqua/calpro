
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import { POST_TOPICS, getRandomAngle } from '../lib/post-topics'
import { generateFeaturedImage } from '../lib/generate-image'

// Force load .env file
dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function generateInitialContent() {
    try {
        console.log('🚀 Starting initial content generation (10 posts)...\n')

        // Get admin user
        const adminUser = await (prisma.user as any).findFirst({
            where: { role: 'ADMIN' }
        })

        if (!adminUser) {
            throw new Error('No admin user found. Please create an admin user first.')
        }

        console.log(`👤 Author: ${adminUser.name || adminUser.email}`)

        // We want 10 posts. We have 7 categories in POST_TOPICS.
        // We will cycle through them to ensure variety.
        const targetCount = 10
        const generatedPosts = []

        for (let i = 0; i < targetCount; i++) {
            const topicIndex = i % POST_TOPICS.length
            const topic = POST_TOPICS[topicIndex]
            const angle = getRandomAngle(topic)

            console.log(`\n----------------------------------------------------------------`)
            console.log(`📝 Generating Post ${i + 1}/${targetCount}`)
            console.log(`📌 Category: ${topic.category} - ${topic.calculator}`)
            console.log(`🎯 Angle: ${angle}`)

            try {
                // Generate content
                const prompt = `
Escreva um artigo de blog completo e otimizado para SEO sobre: "${angle}"

Contexto: Este é para um site de calculadoras financeiras e trabalhistas (calcprobr.com).

Requisitos:
- Título atrativo e otimizado para SEO (H1)
- Introdução envolvente (2-3 parágrafos)
- Conteúdo estruturado com subtítulos (H2, H3)
- Mínimo de 800 palavras
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
                    max_tokens: 2500,
                })

                const content = completion.choices[0].message.content || ''

                // Extract title
                const titleMatch = content.match(/^#\s+(.+)$/m)
                const title = titleMatch ? titleMatch[1] : angle

                // Generate meta description
                const metaPrompt = `Crie uma meta description de 150-160 caracteres para este artigo: "${title}". Deve ser atrativa e incluir as palavras-chave: ${topic.keywords.slice(0, 2).join(', ')}`
                const metaCompletion = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: metaPrompt }],
                    temperature: 0.7,
                    max_tokens: 100,
                })
                const metaDescription = metaCompletion.choices[0].message.content?.trim() || ''

                // Generate slug
                const slug = title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}` // Add suffix to ensure uniqueness

                // Generate featured image
                let featuredImage = null
                try {
                    console.log('🎨 Generating featured image...')
                    featuredImage = await generateFeaturedImage(title, topic.keywords)
                    console.log(`✅ Image generated: ${featuredImage.localPath}`)
                } catch (imageError: any) {
                    console.warn(`⚠️  Image generation failed: ${imageError.message}`)
                }

                // Prepare final content with image
                let finalContent = content
                if (featuredImage) {
                    finalContent = `![${featuredImage.altText}](${featuredImage.localPath})\n\n${content}`
                }

                // Save as PUBLISHED
                const post = await (prisma.post as any).create({
                    data: {
                        title,
                        slug,
                        content: finalContent,
                        excerpt: metaDescription,
                        published: true, // Publish immediately
                        authorId: adminUser.id,
                        image: featuredImage ? featuredImage.localPath : undefined
                    }
                })

                console.log(`✅ Post created: ${title} (ID: ${post.id})`)
                generatedPosts.push(post)

            } catch (postError: any) {
                console.error(`❌ Failed to generate post ${i + 1}:`, postError.message)
            }
        }

        console.log(`\n🎉 Generation complete! Created ${generatedPosts.length} posts.`)

    } catch (error: any) {
        console.error('❌ Fatal Error:', error.message)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

generateInitialContent()
