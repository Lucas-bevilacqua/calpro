import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, User } from "lucide-react"

export const metadata = {
    title: "Blog | CalcPro.br",
    description: "Dicas de finanças, direitos trabalhistas e novidades do CalcPro.br.",
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="container py-10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Acompanhe nossas últimas notícias, dicas e artigos.
                    </p>
                </div>
            </div>
            <hr className="my-8" />

            {posts.length > 0 ? (
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group transition-all hover:scale-[1.02]">
                            <Card className="h-full flex flex-col overflow-hidden border-muted-foreground/20 bg-card transition-colors hover:border-primary/50">
                                {post.image && (
                                    <div className="aspect-video w-full overflow-hidden bg-muted">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <time dateTime={post.date}>
                                            {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                                        </time>
                                    </div>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {post.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto pt-0 text-sm text-muted-foreground">
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
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <h3 className="mt-4 text-lg font-semibold">Nenhum post encontrado</h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                            Ainda não publicamos nenhum artigo. Volte em breve!
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
