import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { ChevronLeft, CalendarIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {
            title: "Post não encontrado",
        }
    }

    return {
        title: `${post.title} | Blog CalcPro.br`,
        description: post.description,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="container py-10 max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/blog">
                    <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Voltar para o Blog
                    </Button>
                </Link>
            </div>

            <Breadcrumbs
                items={[
                    { name: 'Blog', href: '/blog' },
                    { name: post.title, href: `/blog/${post.slug}` }
                ]}
            />

            <div className="space-y-4 mb-8 text-center">
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <time dateTime={post.date}>
                            {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                        </time>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                    </div>
                </div>
                <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {post.title}
                </h1>
                {post.image && (
                    <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
            </div>

            <div className="prose prose-stone dark:prose-invert mx-auto max-w-none">
                <MDXRemote source={post.content} />
            </div>

            {/* Author Bio Section */}
            <div className="mt-12 pt-8 border-t">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src={post.author === "Equipe CalcPro" ? "/authors/equipe-calcpro.png" : "/authors/default.png"}
                            alt={post.author}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Sobre o Autor</h3>
                        <p className="font-medium text-primary mb-2">{post.author}</p>
                        <p className="text-sm text-muted-foreground">
                            Especialistas em finanças pessoais e direito trabalhista brasileiro, dedicados a fornecer informações precisas e ferramentas úteis para ajudar você a tomar decisões financeiras informadas.
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}
