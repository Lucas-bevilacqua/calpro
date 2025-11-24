'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { calcularFGTS, type FGTSResult } from '@/lib/calculators/fgts'

export function FGTSCalculator() {
    const [salario, setSalario] = useState('')
    const [meses, setMeses] = useState('')
    const [saldoAtual, setSaldoAtual] = useState('')
    const [result, setResult] = useState<FGTSResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularFGTS({
            salario: parseFloat(salario),
            mesesTrabalhados: parseInt(meses),
            saldoAtual: saldoAtual ? parseFloat(saldoAtual) : 0
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Calcular FGTS</CardTitle>
                    <CardDescription>Preencha os dados abaixo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="salario">Salário Mensal (R$)</Label>
                            <Input
                                id="salario"
                                type="number"
                                placeholder="2500.00"
                                value={salario}
                                onChange={(e) => setSalario(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meses">Meses Trabalhados</Label>
                            <Input
                                id="meses"
                                type="number"
                                placeholder="24"
                                value={meses}
                                onChange={(e) => setMeses(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="saldo">Saldo Atual (R$) - Opcional</Label>
                            <Input
                                id="saldo"
                                type="number"
                                placeholder="0.00"
                                value={saldoAtual}
                                onChange={(e) => setSaldoAtual(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button onClick={handleCalculate} className="w-full">
                        Calcular FGTS
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Seu FGTS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Depósito Mensal</p>
                                <p className="text-2xl font-bold">R$ {result.depositoMensal.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Total Depositado</p>
                                <p className="text-2xl font-bold">R$ {result.totalDepositado.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Saldo Total</p>
                                <p className="text-2xl font-bold text-primary">R$ {result.saldoTotal.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Rendimento Estimado</p>
                            <p className="text-lg font-semibold">R$ {result.rendimento.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Baseado em 3,5% ao ano (3% + TR)
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
