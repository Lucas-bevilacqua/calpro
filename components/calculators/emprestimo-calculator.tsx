'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { calcularEmprestimo, type EmprestimoResult } from '@/lib/calculators/emprestimo'

export function EmprestimoCalculator() {
    const [valor, setValor] = useState('')
    const [taxa, setTaxa] = useState('')
    const [parcelas, setParcelas] = useState('')
    const [result, setResult] = useState<EmprestimoResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularEmprestimo({
            valorEmprestimo: parseFloat(valor),
            taxaJurosMensal: parseFloat(taxa),
            numeroParcelas: parseInt(parcelas)
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Simular Empréstimo</CardTitle>
                    <CardDescription>Preencha os dados do empréstimo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="valor">Valor do Empréstimo (R$)</Label>
                            <Input
                                id="valor"
                                type="number"
                                placeholder="10000.00"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="taxa">Taxa de Juros (% ao mês)</Label>
                            <Input
                                id="taxa"
                                type="number"
                                step="0.01"
                                placeholder="2.5"
                                value={taxa}
                                onChange={(e) => setTaxa(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parcelas">Número de Parcelas</Label>
                            <Input
                                id="parcelas"
                                type="number"
                                placeholder="12"
                                value={parcelas}
                                onChange={(e) => setParcelas(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button onClick={handleCalculate} className="w-full">
                        Calcular Parcelas
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Resultado da Simulação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Valor da Parcela</p>
                                <p className="text-2xl font-bold">R$ {result.valorParcela.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Total a Pagar</p>
                                <p className="text-2xl font-bold">R$ {result.totalPago.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-destructive/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Total de Juros</p>
                                <p className="text-2xl font-bold text-destructive">R$ {result.totalJuros.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Custo Efetivo Total (CET)</p>
                            <p className="text-lg font-semibold">{result.custoEfetivo.toFixed(2)}%</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
