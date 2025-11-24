import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function updateAuthor() {
    const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    })

    if (!admin) {
        console.log('No admin user found')
        return
    }

    const updated = await prisma.user.update({
        where: { id: admin.id },
        data: {
            name: 'Equipe CalcPro',
            avatar: '/authors/equipe-calcpro.png',
            bio: 'Especialistas em finanças pessoais e direito trabalhista brasileiro, dedicados a fornecer informações precisas e ferramentas úteis para ajudar você a tomar decisões financeiras informadas.'
        }
    })

    console.log('Author updated:')
    console.log('Name:', updated.name)
    console.log('Avatar:', updated.avatar)
    console.log('Bio:', updated.bio)
}

updateAuthor()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
