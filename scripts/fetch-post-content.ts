import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

dotenv.config()

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined")

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:postgres@localhost:5432/callpro?schema=public",
        },
    },
})

async function main() {
    const slug = "como-calcular-seu-valor-hora-como-freelancer-e-aumentar-sua-renda"
    const post = await prisma.post.findUnique({
        where: { slug },
        select: { content: true },
    })

    if (post) {
        console.log(post.content)
    } else {
        console.log("Post not found")
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
