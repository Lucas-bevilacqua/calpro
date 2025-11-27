import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface GeneratePostDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onPostGenerated: () => void
}

export function GeneratePostDialog({ open, onOpenChange, onPostGenerated }: GeneratePostDialogProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [publishImmediately, setPublishImmediately] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    async function handleGenerate() {
        setIsGenerating(true)

        try {
            const response = await fetch("/api/ai/generate-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}), // Random topic
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            const generatedPost = await response.json()

            // Save the generated post
            const saveResponse = await fetch("/api/admin/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...generatedPost,
                    published: publishImmediately,
                }),
            })

            if (!saveResponse.ok) {
                throw new Error("Failed to save post")
            }

            const savedPost = await saveResponse.json()

            toast({
                title: "Post gerado com sucesso!",
                description: `"${generatedPost.title}" foi ${publishImmediately ? 'publicado' : 'salvo como rascunho'}.`,
            })

            onOpenChange(false)
            onPostGenerated()

            // Redirect to edit page
            router.push(`/admin/posts/${savedPost.id}`)

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erro ao gerar post",
                description: error.message || "Verifique se a API key da OpenAI está configurada.",
            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        Gerar Post com IA
                    </DialogTitle>
                    <DialogDescription>
                        A IA vai gerar um artigo completo sobre um tópico aleatório relacionado às calculadoras.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="rounded-lg bg-muted p-4 text-sm">
                        <p className="font-medium mb-2">O que será gerado:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Título otimizado para SEO</li>
                            <li>Conteúdo de 1800+ palavras</li>
                            <li>Imagem de capa exclusiva (DALL-E 3)</li>
                            <li>Estrutura com subtítulos</li>
                            <li>Exemplos práticos</li>
                            <li>Call-to-action para calculadora</li>
                        </ul>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="publish"
                            checked={publishImmediately}
                            onCheckedChange={(checked) => setPublishImmediately(checked as boolean)}
                        />
                        <Label htmlFor="publish" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Publicar imediatamente após gerar
                        </Label>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        ⚡ Custo estimado: ~$0.10-0.30 por post (incluindo imagem)
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isGenerating}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Gerando...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                Gerar Post
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
