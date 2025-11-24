'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calcularAvisoPrevio, type AvisoPrevioResult } from '@/lib/calculators/aviso-previo'

export function AvisoPrevioCalculator() {
    const [salario, setSalario] = useState('')
    const [tempoServico, setTempoServico] = useState('')
    const [quemPediu, setQuemPediu] = useState<'empregador' | 'empregado'>('empregador')
    const [result, setResult] = useState<AvisoPrevioResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularAvisoPrevio({
            salario: parseFloat(salario),
            tempoServico: parseFloat(tempoServico),
            quemPediu
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Dados do Cálculo</CardTitle>
                    <CardDescription>Preencha as informações abaixo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                            <Label htmlFor="tempo">Tempo de Serviço (anos)</Label>
                            <Input
                                id="tempo"
                                type="number"
                                placeholder="3"
                                value={tempoServico}
                                onChange={(e) => setTempoServico(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quem">Quem pediu a demissão?</Label>
                        <Select value={quemPediu} onValueChange={(v) => setQuemPediu(v as any)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="empregador">Empregador (empresa)</SelectItem>
                                <SelectItem value="empregado">Empregado (eu)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={handleCalculate} className="w-full">
                        Calcular Aviso Prévio
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
                                <p className="text-sm text-muted-foreground">Total de Dias</p>
                                <p className="text-2xl font-bold">{result.diasAviso} dias</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    (30 base + {result.diasAdicionais} adicionais)
                                </p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Valor do Aviso</p>
                                <p className="text-2xl font-bold">R$ {result.valorAviso.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="font-medium">{result.detalhes}</p>
                            {!result.trabalhado && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    Valor da indenização: R$ {result.indenizacao.toFixed(2)}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
