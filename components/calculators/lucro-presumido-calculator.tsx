'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { calcularLucroPresumido, type LucroPresumidoResult } from '@/lib/calculators/lucro-presumido'

export function LucroPresumidoCalculator() {
    const [faturamento, setFaturamento] = useState('')
    const [isServicos, setIsServicos] = useState(true)
    const [result, setResult] = useState<LucroPresumidoResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularLucroPresumido({
            faturamentoMensal: parseFloat(faturamento),
            atividadePrestacaoServicos: isServicos
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Calcular Impostos</CardTitle>
                    <CardDescription>Preencha o faturamento mensal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="faturamento">Faturamento Mensal (R$)</Label>
                        <Input
                            id="faturamento"
                            type="number"
                            placeholder="50000.00"
                            value={faturamento}
                            onChange={(e) => setFaturamento(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="servicos"
                            checked={isServicos}
                            onCheckedChange={(checked) => setIsServicos(checked as boolean)}
                        />
                        <Label htmlFor="servicos" className="cursor-pointer">
                            Prestação de Serviços (32% presunção)
                        </Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {isServicos ? 'Presunção: 32%' : 'Comércio/Indústria - Presunção: 8%'}
                    </p>

                    <Button onClick={handleCalculate} className="w-full">
                        Calcular Impostos
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Impostos a Pagar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">IRPJ (15%)</p>
                                <p className="text-lg font-semibold">R$ {result.irpj.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">CSLL (9%)</p>
                                <p className="text-lg font-semibold">R$ {result.csll.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">PIS (0,65%)</p>
                                <p className="text-lg font-semibold">R$ {result.pis.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">COFINS (3%)</p>
                                <p className="text-lg font-semibold">R$ {result.cofins.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-destructive/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Total de Impostos</p>
                                <p className="text-2xl font-bold text-destructive">R$ {result.totalImpostos.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Alíquota efetiva: {result.aliquotaEfetiva.toFixed(2)}%
                                </p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                                <p className="text-2xl font-bold text-primary">R$ {result.lucroLiquido.toFixed(2)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
