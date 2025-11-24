import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function removeDuplicateImages() {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true }
        })

        console.log(`📝 Processando ${posts.length} posts...\n`)

        for (const post of posts) {
            let content = post.content
            let updated = false

            // Remover imagem markdown do início do conteúdo
            // Padrão: ![alt text](url) no início do conteúdo
            const imageRegex = /^!\[.*?\]\(.*?\)\s*\n*/

            if (imageRegex.test(content)) {
                content = content.replace(imageRegex, '')
                updated = true
                console.log(`✅ Removida imagem duplicada de: ${post.title}`)
            } else {
                console.log(`⏭️  Sem imagem duplicada em: ${post.title}`)
            }

            if (updated) {
                await prisma.post.update({
                    where: { id: post.id },
                    data: { content }
                })
            }
        }

        console.log(`\n🎉 Processamento completo!`)
    } catch (error) {
        console.error('❌ Erro:', error)
    } finally {
        await prisma.$disconnect()
    }
}

removeDuplicateImages()
