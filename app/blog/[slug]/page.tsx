import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { ChevronLeft, CalendarIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { ShareButtons } from "@/components/ui/share-buttons"
import { RelatedPosts } from "@/components/blog/related-posts"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = await getAllPosts()

    // Temporary: Filter out posts with known MDX errors
    const brokenSlugs = ['adicional-noturno-entenda-seus-direitos-e-horas-extras']

    return posts
        .filter(post => !brokenSlugs.includes(post.slug))
        .map((post) => ({
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

    const url = `https://calcprobr.com/blog/${post.slug}`
    const imageUrl = post.image || 'https://calcprobr.com/og-image.png'

    return {
        title: `${post.title} | Blog CalcPro.br`,
        description: post.description,
        keywords: post.keywords || [],
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            url: url,
            siteName: 'calcprobr.com',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.updatedAt || post.date,
            authors: [post.author],
            locale: 'pt_BR',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [imageUrl],
            creator: '@calcprobr',
        },
        alternates: {
            canonical: url,
        },
        robots: {
            index: post.published !== false,
            follow: true,
            googleBot: {
                index: post.published !== false,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const url = `https://calcprobr.com/blog/${post.slug}`
    const imageUrl = post.image || 'https://calcprobr.com/og-image.png'

    // JSON-LD Schema for BlogPosting
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": imageUrl,
        "datePublished": post.date,
        "dateModified": post.updatedAt || post.date,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "calcprobr.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://calcprobr.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        "keywords": post.keywords?.join(', ') || undefined,
        "inLanguage": "pt-BR"
    }

    // Breadcrumb JSON-LD
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://calcprobr.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://calcprobr.com/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": url
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <article className="space-y-8">
                <Breadcrumbs
                    items={[
                        { name: 'Blog', href: '/blog' },
                        { name: post.title, href: `/blog/${post.slug}` }
                    ]}
                />

                <div className="space-y-4 text-center">
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

                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <MDXRemote source={post.content} />
                </div>

                <div className="mt-12">
                    <ShareButtons
                        title={post.title}
                        description={post.description}
                    />
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

                <RelatedPosts currentSlug={post.slug} />
            </article>
        </>
    )
}
