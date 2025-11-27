import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface RelatedPostsProps {
    currentSlug: string
}

async function getRelatedPosts(currentSlug: string) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                NOT: {
                    slug: currentSlug
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: {
                title: true,
                slug: true,
                createdAt: true,
                image: true
            }
        })
        return posts
    } catch (error) {
        return []
    }
}

export async function RelatedPosts({ currentSlug }: RelatedPostsProps) {
    const posts = await getRelatedPosts(currentSlug)

    if (posts.length === 0) return null

    return (
        <section className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Leia também</h2>
            <div className="grid gap-6 sm:grid-cols-3">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full flex flex-col overflow-hidden border-muted-foreground/20 bg-card transition-all hover:border-primary/50 hover:shadow-md">
                            {post.image && (
                                <div className="aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader className="p-4 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CalendarIcon className="h-3 w-3" />
                                    <time dateTime={post.createdAt.toISOString()}>
                                        {format(new Date(post.createdAt), "d 'de' MMM, yyyy", { locale: ptBR })}
                                    </time>
                                </div>
                                <CardTitle className="line-clamp-2 text-base group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
