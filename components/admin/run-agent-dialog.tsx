"use client"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, Bot, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RunAgentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function RunAgentDialog({ open, onOpenChange }: RunAgentDialogProps) {
    const [isRunning, setIsRunning] = useState(false)
    const [options, setOptions] = useState({
        generateNewPosts: 1,
        refreshOldPosts: true,
        addInternalLinks: true,
        generateReport: true
    })
    const [result, setResult] = useState<any>(null)
    const { toast } = useToast()

    async function handleRun() {
        setIsRunning(true)
        setResult(null)

        try {
            const response = await fetch("/api/seo/run-agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(options),
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            const data = await response.json()
            setResult(data)

            toast({
                title: "Agente SEO executado!",
                description: `${data.summary.postsGenerated} posts gerados, ${data.summary.postsRefreshed} atualizados, ${data.summary.linksAdded} links adicionados.`,
            })

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erro ao executar agente",
                description: error.message || "Verifique se a API key da OpenAI está configurada.",
            })
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-purple-500" />
                        Executar Agente SEO Automático
                    </DialogTitle>
                    <DialogDescription>
                        O agente vai executar todas as tarefas de SEO automaticamente
                    </DialogDescription>
                </DialogHeader>

                {!result ? (
                    <div className="space-y-4 py-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="generate"
                                    checked={options.generateNewPosts > 0}
                                    onCheckedChange={(checked) =>
                                        setOptions({ ...options, generateNewPosts: checked ? 1 : 0 })
                                    }
                                />
                                <Label htmlFor="generate" className="cursor-pointer">
                                    Gerar novo post com IA
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="refresh"
                                    checked={options.refreshOldPosts}
                                    onCheckedChange={(checked) =>
                                        setOptions({ ...options, refreshOldPosts: !!checked })
                                    }
                                />
                                <Label htmlFor="refresh" className="cursor-pointer">
                                    Atualizar posts antigos (anos, datas)
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="links"
                                    checked={options.addInternalLinks}
                                    onCheckedChange={(checked) =>
                                        setOptions({ ...options, addInternalLinks: !!checked })
                                    }
                                />
                                <Label htmlFor="links" className="cursor-pointer">
                                    Adicionar links internos automáticos
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="report"
                                    checked={options.generateReport}
                                    onCheckedChange={(checked) =>
                                        setOptions({ ...options, generateReport: !!checked })
                                    }
                                />
                                <Label htmlFor="report" className="cursor-pointer">
                                    Gerar relatório de performance
                                </Label>
                            </div>
                        </div>

                        <div className="rounded-lg bg-muted p-4 text-sm">
                            <p className="font-medium mb-2">O agente vai:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {options.generateNewPosts > 0 && <li>Gerar {options.generateNewPosts} post(s) completo(s) com IA</li>}
                                {options.refreshOldPosts && <li>Atualizar até 3 posts antigos</li>}
                                {options.addInternalLinks && <li>Adicionar links internos em até 5 posts</li>}
                                {options.generateReport && <li>Gerar relatório mensal de performance</li>}
                            </ul>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            ⚡ Tempo estimado: 1-3 minutos
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 py-4">
                        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                Agente executado com sucesso!
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Posts gerados:</span>
                                    <span className="font-medium">{result.summary.postsGenerated}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Posts atualizados:</span>
                                    <span className="font-medium">{result.summary.postsRefreshed}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Links adicionados:</span>
                                    <span className="font-medium">{result.summary.linksAdded}</span>
                                </div>
                                {result.summary.errors > 0 && (
                                    <div className="flex justify-between text-red-600">
                                        <span>Erros:</span>
                                        <span className="font-medium">{result.summary.errors}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <p>✅ Revise os posts gerados em /admin/posts</p>
                            <p>✅ Publique quando estiver satisfeito</p>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false)
                            setResult(null)
                        }}
                        disabled={isRunning}
                    >
                        {result ? 'Fechar' : 'Cancelar'}
                    </Button>
                    {!result && (
                        <Button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="gap-2"
                        >
                            {isRunning ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Executando...
                                </>
                            ) : (
                                <>
                                    <Bot className="h-4 w-4" />
                                    Executar Agente
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
