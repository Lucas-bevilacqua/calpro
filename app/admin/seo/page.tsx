"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, Eye, FileText, RefreshCw, Bot } from "lucide-react"
import { RunAgentDialog } from "@/components/admin/run-agent-dialog"

export default function SEODashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [showAgentDialog, setShowAgentDialog] = useState(false)
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalViews: 0,
        avgViewsPerPost: 0,
        growthRate: 0,
        postsThisMonth: 0,
        oldPostsNeedingRefresh: 0
    })

    useEffect(() => {
        setTimeout(() => {
            setStats({
                totalPosts: 12,
                totalViews: 3420,
                avgViewsPerPost: 285,
                growthRate: 15,
                postsThisMonth: 4,
                oldPostsNeedingRefresh: 3
            })
            setIsLoading(false)
        }, 1000)
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">SEO Manager</h3>
                <p className="text-sm text-muted-foreground">
                    Sistema completo de gestão de conteúdo com IA
                </p>
            </div>

            {/* Big Agent Button */}
            <Card className="border-purple-200 dark:border-purple-900 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-purple-600" />
                        Agente SEO Automático
                    </CardTitle>
                    <CardDescription>
                        Execute todas as tarefas de SEO com um clique
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => setShowAgentDialog(true)}
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                        <Bot className="mr-2 h-5 w-5" />
                        Executar Agente Agora
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Gera posts, atualiza conteúdo, adiciona links e cria relatórios automaticamente
                    </p>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalPosts}</div>
                        <p className="text-xs text-muted-foreground">
                            +{stats.postsThisMonth} este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            ~{stats.avgViewsPerPost} por post
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{stats.growthRate}%</div>
                        <p className="text-xs text-muted-foreground">
                            Últimos 30 dias
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Precisam Atualização</CardTitle>
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.oldPostsNeedingRefresh}</div>
                        <p className="text-xs text-muted-foreground">
                            Posts antigos
                        </p>
                    </CardContent>
                </Card>
            </div>

            <RunAgentDialog
                open={showAgentDialog}
                onOpenChange={setShowAgentDialog}
            />
        </div>
    )
}
