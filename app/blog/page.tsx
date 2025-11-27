import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, User } from "lucide-react"

export const metadata = {
    title: "Blog | calcprobr.com",
    description: "Dicas de finanças, direitos trabalhistas e novidades do calcprobr.com.",
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-start gap-4">
                <div className="space-y-2">
                    <h1 className="font-bold text-3xl sm:text-4xl tracking-tight">
                        Blog
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Acompanhe nossas últimas notícias, dicas e artigos.
                    </p>
                </div>
            </div>

            {posts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                            <Card className="h-full flex flex-col overflow-hidden border-muted-foreground/20 bg-card transition-all hover:border-primary/50 hover:shadow-lg">
                                {post.image && (
                                    <div className="aspect-video w-full overflow-hidden bg-muted">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardHeader className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CalendarIcon className="h-4 w-4" />
                                        <time dateTime={post.date}>
                                            {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                                        </time>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3 text-sm">
                                        {post.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto pt-0 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {post.author}
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center space-y-4">
                        <h3 className="text-lg font-semibold">Nenhum post encontrado</h3>
                        <p className="text-sm text-muted-foreground">
                            Ainda não publicamos nenhum artigo. Volte em breve!
                        </p>
                    </div>
                </div>
            )}
        </div>
    )

}
