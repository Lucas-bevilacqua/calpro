import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

async function deleteAllAIPosts() {
    try {
        console.log('🔍 Procurando posts gerados pela IA...')

        // Deletar todos os posts não publicados (rascunhos da IA)
        const result = await prisma.post.deleteMany({
            where: {
                published: false
            }
        })

        console.log(`✅ ${result.count} posts deletados com sucesso!`)
        console.log('💡 Agora você pode gerar novos posts com a versão corrigida')

    } catch (error) {
        console.error('❌ Erro:', error)
    } finally {
        await prisma.$disconnect()
    }
}

deleteAllAIPosts()
