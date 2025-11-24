import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, Settings, Sparkles } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                <div className="h-full py-6 pl-8 pr-6 lg:py-8">
                    <div className="w-full">
                        <div className="mb-4 px-2">
                            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                                Admin
                            </h2>
                            <div className="space-y-1">
                                <Link href="/admin">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Visão Geral
                                    </Button>
                                </Link>
                                <Link href="/admin/users">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Users className="mr-2 h-4 w-4" />
                                        Usuários
                                    </Button>
                                </Link>
                                <Link href="/admin/posts">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Posts
                                    </Button>
                                </Link>
                                <Link href="/admin/seo">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        SEO Manager
                                    </Button>
                                </Link>
                                <Link href="/admin/settings">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Configurações
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex w-full flex-col overflow-hidden">{children}</main>
        </div>
    )
}
