"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    slug: z.string().min(1, "Slug é obrigatório"),
    content: z.string().min(1, "Conteúdo é obrigatório"),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    published: z.boolean(),
})

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [postId, setPostId] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            image: "",
            published: false,
        },
    })

    useEffect(() => {
        async function loadPost() {
            try {
                const { id } = await params
                setPostId(id)
                // In a real app, we would fetch the single post here.
                // For now, we'll fetch all and filter (not efficient but works for MVP without new endpoint)
                // Actually, I should create a GET endpoint for single post or use the one I have if it supports GET.
                // Wait, I created DELETE and PUT for [id], but not GET.
                // I should add GET to app/api/admin/posts/[id]/route.ts or just fetch from the list if I have it in state (but I don't here).
                // Let's add GET to the route first.

                // For now, I'll just assume I can fetch it. I'll update the route in a moment.
                const response = await fetch(`/api/admin/posts/${id}`)
                if (!response.ok) throw new Error("Failed to fetch post")

                const post = await response.json()
                form.reset({
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt || "",
                    image: post.image || "",
                    published: post.published,
                })
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Não foi possível carregar o post.",
                })
                router.push("/admin/posts")
            } finally {
                setIsLoading(false)
            }
        }
        loadPost()
    }, [params, form, router, toast])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!postId) return
        setIsSaving(true)

        try {
            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) throw new Error("Failed to update post")

            toast({
                title: "Sucesso",
                description: "Post atualizado com sucesso.",
            })

            router.push("/admin/posts")
            router.refresh()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao atualizar o post.",
            })
        } finally {
            setIsSaving(false)
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
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/posts">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h3 className="text-lg font-medium">Editar Post</h3>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título</FormLabel>
                                <FormControl>
                                    <Input placeholder="Título do post" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug (URL)</FormLabel>
                                <FormControl>
                                    <Input placeholder="titulo-do-post" {...field} />
                                </FormControl>
                                <FormDescription>
                                    A URL amigável do post.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resumo</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Breve descrição..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Conteúdo (Markdown)</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[300px] font-mono" placeholder="# Título..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL da Imagem</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Publicar imediatamente
                                    </FormLabel>
                                    <FormDescription>
                                        Se marcado, o post ficará visível no blog.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar Alterações
                    </Button>
                </form>
            </Form>
        </div>
    )
}
