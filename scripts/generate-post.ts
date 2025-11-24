import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import { getNextTopic, getRandomAngle } from '../lib/post-topics'
import { generateFeaturedImage } from '../lib/generate-image'

// Force load .env file
dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function generatePost(withImage: boolean = true) {
    try {
        console.log('🤖 Generating blog post with AI...\n')

        // Get recent posts to avoid topic repetition
        const recentPosts = await (prisma.post as any).findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: { title: true }
        })

        const usedTopics: string[] = []

        // Get next topic
        const topic = getNextTopic(usedTopics)
        const angle = getRandomAngle(topic)

        console.log(`📝 Topic: ${topic.category} - ${topic.calculator}`)
        console.log(`📌 Angle: ${angle}\n`)

        // Generate content
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

        console.log('⏳ Calling OpenAI API for content...')

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

        // Generate meta description
        console.log('⏳ Generating meta description...')
        const metaPrompt = `Crie uma meta description de 150-160 caracteres para este artigo: "${title}". Deve ser atrativa e incluir as palavras-chave: ${topic.keywords.slice(0, 2).join(', ')}`

        const metaCompletion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: metaPrompt }],
            temperature: 0.7,
            max_tokens: 100,
        })

        const metaDescription = metaCompletion.choices[0].message.content?.trim() || ''

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

        console.log(`\n✅ Generated: "${title}"`)
        console.log(`📊 Length: ${content.length} characters`)
        console.log(`📝 Meta: ${metaDescription}`)

        // Generate featured image
        let featuredImage = null
        if (withImage) {
            try {
                console.log('\n🎨 Generating featured image...')
                featuredImage = await generateFeaturedImage(title, topic.keywords)
                console.log(`✅ Image: ${featuredImage.localPath}`)
            } catch (imageError: any) {
                console.warn(`⚠️  Image generation failed: ${imageError.message}`)
                console.log('   Continuing without image...')
            }
        }

        // Get admin user
        const adminUser = await (prisma.user as any).findFirst({
            where: { role: 'ADMIN' }
        })

        if (!adminUser) {
            throw new Error('No admin user found. Please create an admin user first.')
        }

        // Prepare final content with image
        let finalContent = content
        if (featuredImage) {
            // Add featured image at the top of the content
            finalContent = `![${featuredImage.altText}](${featuredImage.localPath})\n\n${content}`
        }

        // Save as draft
        const post = await (prisma.post as any).create({
            data: {
                title,
                slug,
                content: finalContent,
                excerpt: metaDescription || excerpt, // Use meta description as excerpt
                published: false,
                authorId: adminUser.id,
            }
        })

        console.log(`\n🎉 Post created as DRAFT (ID: ${post.id})`)
        console.log(`📝 Review at: http://localhost:3000/admin/posts/${post.id}`)

        if (featuredImage) {
            console.log(`🖼️  Featured image: ${featuredImage.localPath}`)
        }

        console.log(`\n💡 To publish, edit the post in the admin panel.\n`)

        console.log(`\n📊 SEO Summary:`)
        console.log(`   Title: ${title.length} chars`)
        console.log(`   Meta: ${metaDescription.length} chars`)
        console.log(`   Content: ${content.length} chars (~${Math.round(content.length / 5)} words)`)
        console.log(`   Keywords: ${topic.keywords.slice(0, 3).join(', ')}`)
        console.log(`   Image: ${featuredImage ? 'Yes ✅' : 'No ❌'}`)

    } catch (error: any) {
        console.error('❌ Error:', error.message)
        if (error.stack) {
            console.error(error.stack)
        }
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

// Run if called directly
if (require.main === module) {
    const withImage = !process.argv.includes('--no-image')
    generatePost(withImage)
}

export { generatePost }
