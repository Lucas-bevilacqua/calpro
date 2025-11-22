import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Trash2, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const metadata: Metadata = {
    title: "Dashboard | CalcPro.br",
    description: "Gerencie seus cálculos salvos",
}

async function getCalculations(userId: string) {
    return await prisma.calculation.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    })
}

type Calculation = Awaited<ReturnType<typeof getCalculations>>[number]

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/auth/login")
    }

    const calculations = await getCalculations(session.user.id)

    return (
        <div className="container py-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Bem-vindo de volta, {session.user.name || "Usuário"}
                    </p>
                </div>
                <Link href="/calculadoras">
                    <Button>
                        <Calculator className="mr-2 h-4 w-4" />
                        Novo Cálculo
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total de Cálculos
                        </CardTitle>
                        <div className="text-2xl font-bold">{calculations.length}</div>
                    </CardHeader>
                </Card>

                {/* Placeholder for future stats */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Cálculos este mês
                        </CardTitle>
                        <div className="text-2xl font-bold">
                            {calculations.filter((c: Calculation) => {
                                const now = new Date()
                                const date = new Date(c.createdAt)
                                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                            }).length}
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Cálculos Recentes</h2>

                {calculations.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                            <Calculator className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">Nenhum cálculo salvo</h3>
                            <p className="text-muted-foreground mb-4 max-w-sm">
                                Você ainda não salvou nenhum cálculo. Use nossas calculadoras e clique em "Salvar" para vê-los aqui.
                            </p>
                            <Link href="/calculadoras">
                                <Button variant="outline">Ir para Calculadoras</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {calculations.map((calc: Calculation) => (
                            <Card key={calc.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg truncate pr-2">
                                            {calc.name || calc.calculatorType}
                                        </CardTitle>
                                        <div className="p-1.5 bg-muted rounded-md">
                                            <Calculator className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <CardDescription className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(calc.createdAt), "d 'de' MMMM, yyyy", { locale: ptBR })}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {calc.notes || "Sem notas adicionais."}
                                    </p>
                                    <div className="mt-4 text-xs font-mono bg-muted/50 p-2 rounded">
                                        Tipo: {calc.calculatorType}
                                    </div>
                                </CardContent>
                                <div className="p-6 pt-0 mt-auto flex justify-between gap-2">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Ver Detalhes
                                    </Button>
                                    {/* Delete functionality would go here */}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
