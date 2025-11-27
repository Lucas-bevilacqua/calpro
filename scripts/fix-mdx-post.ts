import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

async function main() {
    const slug = 'adicional-noturno-entenda-seus-direitos-e-horas-extras'

    const post = await prisma.post.findUnique({
        where: { slug }
    })

    if (!post) {
        console.log('❌ Post not found')
        return
    }

    console.log('📝 Post found:', post.title)
    console.log('📊 Status:', post.status)
    console.log('\n📄 Content preview (first 500 chars):')
    console.log(post.content.substring(0, 500))
    console.log('\n🔍 Searching for problematic characters...')

    // Find lines with ! character that might be causing issues
    const lines = post.content.split('\n')
    lines.forEach((line, index) => {
        if (line.includes('!') && !line.trim().startsWith('#') && !line.includes('![')) {
            console.log(`Line ${index + 1}: ${line}`)
        }
    })
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
