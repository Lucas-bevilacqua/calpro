import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

async function main() {
    const slug = 'adicional-noturno-entenda-seus-direitos-e-horas-extras'

    console.log('🔧 Unpublishing problematic post...')

    const updated = await prisma.post.update({
        where: { slug },
        data: { status: 'DRAFT' }
    })

    console.log('✅ Post unpublished:', updated.title)
    console.log('📊 New status:', updated.status)
    console.log('\n💡 The build should now succeed. You can fix the MDX syntax later and republish.')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
