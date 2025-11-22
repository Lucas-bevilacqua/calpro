"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calculator, Download, Save, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalculatorCard } from "@/components/ui/calculator-card"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { calcularSalarioLiquido, SalarioLiquidoOutput } from "@/lib/calculators/salario-liquido"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SaveCalculationDialog } from "@/components/calculators/save-calculation-dialog"

const formSchema = z.object({
    salarioBruto: z.coerce.number().min(1, "Salário deve ser maior que zero"),
    dependentes: z.coerce.number().min(0).default(0),
    outrosDescontos: z.coerce.number().min(0).default(0),
})

export function SalarioLiquidoForm() {
    const [result, setResult] = useState<SalarioLiquidoOutput | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            salarioBruto: 0,
            dependentes: 0,
            outrosDescontos: 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const output = calcularSalarioLiquido({
            salarioBruto: values.salarioBruto,
            dependentes: values.dependentes,
            outrosDescontos: values.outrosDescontos,
        });
        setResult(output);
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    }

    const formatPercent = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(val / 100);
    }

    return (
        <CalculatorCard
            title="Calculadora de Salário Líquido"
            description="Descubra quanto você realmente vai receber após os descontos de INSS e IRRF."
            result={result && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Detalhamento</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Salário Bruto</span>
                                            <span className="font-medium">{formatCurrency(result.salarioBruto)}</span>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between text-red-600">
                                            <span>INSS</span>
                                            <span>- {formatCurrency(result.descontoINSS)}</span>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <span>IRRF</span>
                                            <span>- {formatCurrency(result.descontoIRRF)}</span>
                                        </div>
                                        {result.outrosDescontos > 0 && (
                                            <div className="flex justify-between text-red-600">
                                                <span>Outros Descontos</span>
                                                <span>- {formatCurrency(result.outrosDescontos)}</span>
                                            </div>
                                        )}
                                        <Separator className="my-2" />
                                        <div className="flex justify-between font-bold text-red-700">
                                            <span>Total de Descontos</span>
                                            <span>- {formatCurrency(result.totalDescontos)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-4">
                                    <div className="bg-background p-4 rounded-lg border shadow-sm text-center">
                                        <p className="text-sm text-muted-foreground mb-1">Salário Líquido</p>
                                        <p className="text-3xl font-bold text-green-600">{formatCurrency(result.salarioLiquido)}</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-lg border shadow-sm text-center">
                                        <p className="text-xs text-muted-foreground">Alíquota Efetiva Total</p>
                                        <p className="text-lg font-semibold text-muted-foreground">
                                            {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(result.aliquotaEfetiva)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" className="w-full" disabled>
                                    <Download className="mr-2 h-4 w-4" /> Baixar PDF
                                </Button>
                                <SaveCalculationDialog
                                    calculatorType="salario-liquido"
                                    inputs={form.getValues()}
                                    results={result}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="salarioBruto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Salário Bruto (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" placeholder="0,00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="dependentes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Dependentes</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>Para dedução do IRRF</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="outrosDescontos"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Outros Descontos (R$)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="0,00" {...field} />
                                    </FormControl>
                                    <FormDescription>Ex: Plano de saúde, VR, VT</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full size-lg text-lg font-semibold">
                        <Calculator className="mr-2 h-5 w-5" /> Calcular Salário Líquido
                    </Button>
                </form>
            </Form>
        </CalculatorCard>
    )
}
