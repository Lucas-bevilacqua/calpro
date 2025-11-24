'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { calcularProLabore, type ProLaboreResult } from '@/lib/calculators/pro-labore'

export function ProLaboreCalculator() {
    const [valor, setValor] = useState('')
    const [temINSS, setTemINSS] = useState(true)
    const [result, setResult] = useState<ProLaboreResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularProLabore({
            valorProLabore: parseFloat(valor),
            temINSS
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Calcular Pró-Labore</CardTitle>
                    <CardDescription>Preencha o valor do pró-labore</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="valor">Valor do Pró-Labore (R$)</Label>
                        <Input
                            id="valor"
                            type="number"
                            placeholder="3000.00"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="inss"
                            checked={temINSS}
                            onCheckedChange={(checked) => setTemINSS(checked as boolean)}
                        />
                        <Label htmlFor="inss" className="cursor-pointer">
                            Contribuir com INSS (11%)
                        </Label>
                    </div>

                    <Button onClick={handleCalculate} className="w-full">
                        Calcular
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Resultado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Valor Bruto</p>
                                <p className="text-2xl font-bold">R$ {result.valorBruto.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Valor Líquido</p>
                                <p className="text-2xl font-bold text-primary">R$ {result.valorLiquido.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">INSS (11%)</p>
                                <p className="text-lg font-semibold">R$ {result.inss.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">IRRF</p>
                                <p className="text-lg font-semibold">R$ {result.irrf.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-destructive/10 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Custo Total para Empresa</p>
                            <p className="text-2xl font-bold text-destructive">R$ {result.custoEmpresa.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Inclui INSS patronal (20%)
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
