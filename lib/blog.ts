import { prisma } from "@/lib/prisma"

export interface BlogPost {
    slug: string
    title: string
    date: string
    description: string
    content: string
    author: string
    image?: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
            },
        })

        return posts.map((post: any) => ({
            slug: post.slug,
            title: post.title,
            date: post.createdAt.toISOString(),
            description: post.excerpt || "",
            content: post.content,
            author: post.author.name || "Equipe CalcPro",
            image: post.image || undefined,
        }))
    } catch (error) {
        console.error("Error fetching posts:", error)
        return []
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug,
                published: true,
            },
            include: {
                author: true,
            },
        })

        if (!post) return null

        return {
            slug: post.slug,
            title: post.title,
            date: post.createdAt.toISOString(),
            description: post.excerpt || "",
            content: post.content,
            author: post.author.name || "Equipe CalcPro",
            image: post.image || undefined,
        }
    } catch (error) {
        console.error("Error fetching post:", error)
        return null
    }
}
