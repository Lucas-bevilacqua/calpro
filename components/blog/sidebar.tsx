import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, DollarSign, Briefcase } from "lucide-react"
import { getAllPosts } from "@/lib/blog"

async function getRecentPosts() {
    try {
        const posts = await getAllPosts()
        return posts.slice(0, 5).map(post => ({
            title: post.title,
            slug: post.slug,
            createdAt: post.date
        }))
    } catch (error) {
        return []
    }
}

export async function Sidebar() {
    const recentPosts = await getRecentPosts()

    const categories = [
        { name: "Trabalhista", icon: Briefcase, href: "/blog?cat=trabalhista" },
        { name: "Financeira", icon: DollarSign, href: "/blog?cat=financeira" },
        { name: "Investimentos", icon: TrendingUp, href: "/blog?cat=investimentos" },
    ]

    return (
        <aside className="space-y-8">
            {/* AdSense Placeholder */}
            <div className="bg-muted/50 border rounded-lg h-[250px] flex items-center justify-center text-muted-foreground text-sm">
                Publicidade (AdSense)
            </div>

            {/* Featured Calculator Widget */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Calculator className="h-5 w-5 text-primary" />
                        Calculadora Popular
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Calcule sua rescisão trabalhista completa com todos os direitos.
                    </p>
                    <Link href="/calculadora/trabalhista/rescisao-trabalhista" className="w-full block">
                        <Button className="w-full">Calcular Agora</Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Posts Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentPosts.map((post) => (
                            <li key={post.slug} className="border-b last:border-0 pb-3 last:pb-0">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                                >
                                    {post.title}
                                </Link>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                                </p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Categories */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.name}>
                                <Link
                                    href={category.href}
                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors p-2 hover:bg-muted rounded-md"
                                >
                                    <category.icon className="h-4 w-4 text-muted-foreground" />
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Sticky AdSense Placeholder */}
            <div className="sticky top-24 bg-muted/50 border rounded-lg h-[600px] flex items-center justify-center text-muted-foreground text-sm">
                Publicidade Vertical (AdSense)
            </div>
        </aside>
    )
}
