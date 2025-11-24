'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { calcularIRPF, type IRPFResult } from '@/lib/calculators/irpf'

export function IRPFCalculator() {
    const [salario, setSalario] = useState('')
    const [dependentes, setDependentes] = useState('')
    const [inss, setINSS] = useState('')
    const [outrasDeducoes, setOutrasDeducoes] = useState('')
    const [result, setResult] = useState<IRPFResult | null>(null)

    const handleCalculate = () => {
        const resultado = calcularIRPF({
            salarioBruto: parseFloat(salario),
            dependentes: parseInt(dependentes) || 0,
            inss: parseFloat(inss) || 0,
            outrasDeducoes: parseFloat(outrasDeducoes) || 0
        })
        setResult(resultado)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Calcular IRPF</CardTitle>
                    <CardDescription>Preencha seus dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="salario">Salário Bruto (R$)</Label>
                            <Input
                                id="salario"
                                type="number"
                                placeholder="5000.00"
                                value={salario}
                                onChange={(e) => setSalario(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inss">Desconto INSS (R$)</Label>
                            <Input
                                id="inss"
                                type="number"
                                placeholder="400.00"
                                value={inss}
                                onChange={(e) => setINSS(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dependentes">Número de Dependentes</Label>
                            <Input
                                id="dependentes"
                                type="number"
                                placeholder="0"
                                value={dependentes}
                                onChange={(e) => setDependentes(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="outras">Outras Deduções (R$)</Label>
                            <Input
                                id="outras"
                                type="number"
                                placeholder="0.00"
                                value={outrasDeducoes}
                                onChange={(e) => setOutrasDeducoes(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button onClick={handleCalculate} className="w-full">
                        Calcular Imposto
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Resultado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Faixa</p>
                                <p className="text-2xl font-bold">{result.faixa}</p>
                            </div>
                            <div className="p-4 bg-destructive/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Imposto a Pagar</p>
                                <p className="text-2xl font-bold text-destructive">R$ {result.impostoFinal.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">Salário Líquido</p>
                                <p className="text-2xl font-bold text-primary">R$ {result.salarioLiquido.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Detalhes do Cálculo</p>
                            <div className="space-y-1 text-sm">
                                <p>Base de cálculo: R$ {result.baseCalculo.toFixed(2)}</p>
                                <p>Alíquota: {result.aliquota}%</p>
                                <p>Parcela a deduzir: R$ {result.parcelaDeducao.toFixed(2)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
