'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { calcularPontoEquilibrio, type PontoEquilibrioResult } from '@/lib/calculators/ponto-equilibrio'

export function PontoEquilibrioCalculator() {
    const [custosFixos, setCustosFixos] = useState('')
    const [precoVenda, setPrecoVenda] = useState('')
    const [custoVariavel, setCustoVariavel] = useState('')
    const [result, setResult] = useState<PontoEquilibrioResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularPontoEquilibrio({
            custosFixos: parseFloat(custosFixos),
            precoVenda: parseFloat(precoVenda),
            custoVariavelUnitario: parseFloat(custoVariavel)
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Calcular Ponto de Equilíbrio</CardTitle>
                    <CardDescription>Preencha os dados do seu negócio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fixos">Custos Fixos Mensais (R$)</Label>
                            <Input
                                id="fixos"
                                type="number"
                                placeholder="10000.00"
                                value={custosFixos}
                                onChange={(e) => setCustosFixos(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Aluguel, salários, etc.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="preco">Preço de Venda (R$)</Label>
                            <Input
                                id="preco"
                                type="number"
                                placeholder="100.00"
                                value={precoVenda}
                                onChange={(e) => setPrecoVenda(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="variavel">Custo Variável Unitário (R$)</Label>
                            <Input
                                id="variavel"
                                type="number"
                                placeholder="40.00"
                                value={custoVariavel}
                                onChange={(e) => setCustoVariavel(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Matéria-prima, comissões, etc.</p>
                        </div>
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
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Ponto de Equilíbrio</p>
                                <p className="text-3xl font-bold text-primary">{result.quantidadeEquilibrio} unidades</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Faturamento Necessário</p>
                                <p className="text-2xl font-bold">R$ {result.faturamentoEquilibrio.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Margem de Contribuição</p>
                                <p className="text-lg font-semibold">R$ {result.margemContribuicao.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground mt-1">Por unidade vendida</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Margem (%)</p>
                                <p className="text-lg font-semibold">{result.margemContribuicaoPercentual.toFixed(2)}%</p>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <p className="text-sm font-medium mb-2">💡 Interpretação:</p>
                            <p className="text-sm">
                                Você precisa vender <strong>{result.quantidadeEquilibrio} unidades</strong> por mês para cobrir todos os custos.
                                A partir da unidade {result.quantidadeEquilibrio + 1}, você começa a ter lucro de R$ {result.margemContribuicao.toFixed(2)} por unidade.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
