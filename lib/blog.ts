import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { prisma } from "@/lib/prisma"

export interface BlogPost {
    slug: string
    title: string
    date: string
    description: string
    content: string
    author: string
    image?: string
    keywords?: string[]
    updatedAt?: string
    published?: boolean
}

const postsDirectory = path.join(process.cwd(), "content/blog")

// Get posts from MDX files
async function getPostsFromFiles(): Promise<BlogPost[]> {
    try {
        if (!fs.existsSync(postsDirectory)) {
            return []
        }

        const fileNames = fs.readdirSync(postsDirectory)
        const allPostsData = fileNames
            .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
            .map((fileName) => {
                const slug = fileName.replace(/\.mdx?$/, "")
                const fullPath = path.join(postsDirectory, fileName)
                const fileContents = fs.readFileSync(fullPath, "utf8")
                const { data, content } = matter(fileContents)

                return {
                    slug,
                    title: data.title || slug,
                    date: data.date || new Date().toISOString(),
                    description: data.description || "",
                    content,
                    author: data.author || "Equipe CalcPro",
                    image: data.image,
                    keywords: data.keywords,
                    updatedAt: data.updatedAt,
                    published: data.published !== false,
                }
            })
            .filter((post) => post.published)

        return allPostsData
    } catch (error) {
        console.error("Error fetching posts from files:", error)
        return []
    }
}

// Get posts from database
async function getPostsFromDatabase(): Promise<BlogPost[]> {
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
            keywords: (post.seoMetrics as any)?.keywords || undefined,
            updatedAt: post.updatedAt?.toISOString(),
            published: post.published,
        }))
    } catch (error) {
        console.error("Error fetching posts from database:", error)
        return []
    }
}

// Validate MDX content (basic check)
function isValidMDX(content: string): boolean {
    // Only check if content exists and is not empty
    if (!content || content.trim().length === 0) {
        return false
    }
    
    // Allow all content - let MDXRemote handle errors at render time
    return true
}

// Get all posts from both sources (hybrid approach)
export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        const [filePosts, dbPosts] = await Promise.all([
            getPostsFromFiles(),
            getPostsFromDatabase()
        ])

        // Combine posts, removing duplicates (file posts take precedence)
        const filePostSlugs = new Set(filePosts.map(p => p.slug))
        const uniqueDbPosts = dbPosts.filter(p => !filePostSlugs.has(p.slug))
        
        const allPosts = [...filePosts, ...uniqueDbPosts]
            // Filter out posts with invalid MDX
            .filter(post => {
                const isValid = isValidMDX(post.content)
                if (!isValid) {
                    console.warn(`Skipping post with invalid MDX: ${post.slug}`)
                }
                return isValid
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        return allPosts
    } catch (error) {
        console.error("Error fetching all posts:", error)
        return []
    }
}

// Get single post by slug (try file first, then database)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        // Try to get from file first
        const fullPath = path.join(postsDirectory, `${slug}.mdx`)
        const altPath = path.join(postsDirectory, `${slug}.md`)
        
        let filePath = fullPath
        if (!fs.existsSync(fullPath) && fs.existsSync(altPath)) {
            filePath = altPath
        }
        
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, "utf8")
            const { data, content } = matter(fileContents)

            return {
                slug,
                title: data.title || slug,
                date: data.date || new Date().toISOString(),
                description: data.description || "",
                content,
                author: data.author || "Equipe CalcPro",
                image: data.image,
                keywords: data.keywords,
                updatedAt: data.updatedAt,
                published: data.published !== false,
            }
        }

        // If not found in files, try database
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
            keywords: (post.seoMetrics as any)?.keywords || undefined,
            updatedAt: post.updatedAt?.toISOString(),
            published: post.published,
        }
    } catch (error) {
        console.error("Error fetching post:", error)
        return null
    }
}
