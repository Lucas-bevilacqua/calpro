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
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Posts</h3>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os artigos do blog.
                    </p>
                </div>
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Post
                    </Button>
                </Link>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${post.published
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                        }`}>
                                        {post.published ? "Publicado" : "Rascunho"}
                                    </span>
                                </TableCell>
                                <TableCell>{post.author?.name || "Desconhecido"}</TableCell>
                                <TableCell>
                                    {format(new Date(post.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/posts/${post.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
    )
}
