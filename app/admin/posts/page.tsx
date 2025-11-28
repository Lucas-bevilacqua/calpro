"use client"

import { useState, useEffect } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Pencil, Trash2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { GeneratePostDialog } from "@/components/admin/generate-post-dialog"
import { BatchGenerateDialog } from "@/components/admin/batch-generate-dialog"

interface Post {
    id: string
    title: string
    slug: string
    published: boolean
    createdAt: string
    author: {
        name: string
    }
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showGenerateDialog, setShowGenerateDialog] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        try {
            const response = await fetch("/api/admin/posts")
            if (!response.ok) throw new Error("Failed to fetch posts")
            const data = await response.json()
            setPosts(data)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Não foi possível carregar os posts.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir este post?")) return

        try {
            const response = await fetch(`/api/admin/posts/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete")

            setPosts(posts.filter((post) => post.id !== id))
            toast({
                title: "Sucesso",
                description: "Post excluído com sucesso.",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Não foi possível excluir o post.",
            })
        }
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Posts</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Gerencie os posts do blog
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <BatchGenerateDialog />
                    <Button
                        onClick={() => setShowGenerateDialog(true)}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Gerar 1 Artigo
                    </Button>
                    <Link href="/admin/posts/new" className="w-full sm:w-auto">
                        <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Post
                        </Button>
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-12 md:py-16 border rounded-lg">
                    <p className="text-base md:text-lg text-muted-foreground">Nenhum post encontrado</p>
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[200px]">Título</TableHead>
                                    <TableHead className="hidden md:table-cell">Autor</TableHead>
                                    <TableHead className="hidden lg:table-cell">Data</TableHead>
                                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">
                                            <div className="max-w-[300px] truncate">{post.title}</div>
                                            <div className="text-xs text-muted-foreground mt-1 sm:hidden">
                                                {post.author.name} • {post.published ? "Publicado" : "Rascunho"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{post.author.name}</TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {format(new Date(post.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${post.published
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                    }`}
                                            >
                                                {post.published ? "Publicado" : "Rascunho"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1 sm:gap-2">
                                                <Link href={`/admin/posts/${post.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => handleDelete(post.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            <GeneratePostDialog
                open={showGenerateDialog}
                onOpenChange={setShowGenerateDialog}
                onPostGenerated={fetchPosts}
            />
        </div>
    )
}
