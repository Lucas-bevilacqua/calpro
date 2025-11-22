import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FileText, Star, Crown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getUserSubscription } from "@/lib/subscription"
import { SubscriptionBadge } from "@/components/subscription/subscription-badge"

export const metadata: Metadata = {
    title: "Dashboard | CalcPro.br",
    description: "Gerencie suas simulações e preferências.",
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: {
            savedCalculations: {
                orderBy: { createdAt: 'desc' },
                take: 5,
                include: {
                    calculation: true
                }
            }
        }
    })

    if (!user) {
        redirect("/login")
    }

    const subscription = await getUserSubscription(user.id)
    const savedCount = await prisma.savedCalculation.count({
        where: { userId: user.id }
    })

    return (
        <div className="container py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Bem-vindo de volta, {session.user.name}!
                    </p>
                </div>
                {session.user.role === "ADMIN" && (
                    <Link href="/admin">
                        <Button variant="outline">Acessar Painel Admin</Button>
                    </Link>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Cálculos Salvos
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{savedCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {subscription.isPro ? 'Ilimitado' : `${savedCount}/3 usados`}
                        </p>
                    </CardContent>
                </Card>
                
                <Card className={subscription.isPro ? "border-amber-500/50 bg-gradient-to-br from-amber-50/50 to-orange-50/50" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Plano Atual
                        </CardTitle>
                        {subscription.isPro ? (
                            <Crown className="h-4 w-4 text-amber-500" />
                        ) : (
                            <Calculator className="h-4 w-4 text-muted-foreground" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="text-2xl font-bold">
                                {subscription.plan === 'FREE' ? 'Gratuito' : 'PRO'}
                            </div>
                            {subscription.isPro && <SubscriptionBadge plan={subscription.plan} />}
                        </div>
                        {subscription.isPro ? (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">
                                    Renovação: {subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR') : 'N/A'}
                                </p>
                                <form action="/api/stripe/portal" method="POST">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Gerenciar Assinatura
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">
                                    Acesso básico às calculadoras
                                </p>
                                <Link href="/precos">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <TrendingUp className="mr-2 h-3 w-3" />
                                        Fazer Upgrade
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Benefícios Ativos
                        </CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{subscription.isPro ? '7' : '3'}</div>
                        <p className="text-xs text-muted-foreground">
                            {subscription.isPro ? 'Todos os recursos PRO' : 'Recursos básicos'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {!subscription.isPro && savedCount === 0 && (
                <Card className="mt-8 border-amber-500/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-amber-500/10">
                                <Crown className="h-6 w-6 text-amber-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1">Desbloqueie todo o potencial do CalcPro</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Salve cálculos ilimitados, exporte PDFs profissionais e remova anúncios.
                                </p>
                                <div className="flex gap-2">
                                    <Link href="/precos">
                                        <Button size="sm">
                                            Ver Planos PRO
                                        </Button>
                                    </Link>
                                    <Link href="/calculadoras">
                                        <Button size="sm" variant="outline">
                                            Explorar Calculadoras
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Cálculos Recentes</h2>
                {user.savedCalculations.length > 0 ? (
                    <div className="grid gap-4">
                        {user.savedCalculations.map((saved) => (
                            <Card key={saved.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-base">{saved.name}</CardTitle>
                                            <CardDescription>
                                                {new Date(saved.createdAt).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Ver Detalhes
                                        </Button>
                                    </div>
                                </CardHeader>
                                {saved.notes && (
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{saved.notes}</p>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            Você ainda não salvou nenhum cálculo.
                            <div className="mt-4">
                                <Link href="/calculadoras">
                                    <Button>Ir para Calculadoras</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
