import fs from "fs"
import path from "path"
import matter from "gray-matter"

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

export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        // Check if directory exists
        if (!fs.existsSync(postsDirectory)) {
            console.warn("Blog directory not found:", postsDirectory)
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
            .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

        return allPostsData
    } catch (error) {
        console.error("Error fetching posts:", error)
        return []
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`)
        const altPath = path.join(postsDirectory, `${slug}.md`)
        
        let filePath = fullPath
        if (!fs.existsSync(fullPath) && fs.existsSync(altPath)) {
            filePath = altPath
        }
        
        if (!fs.existsSync(filePath)) {
            return null
        }

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
    } catch (error) {
        console.error("Error fetching post:", error)
        return null
    }
}
