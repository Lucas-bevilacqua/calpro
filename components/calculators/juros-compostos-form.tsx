"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calculator, Download, Save } from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalculatorCard } from "@/components/ui/calculator-card"
import { Card, CardContent } from "@/components/ui/card"
import { calcularJurosCompostos, JurosCompostosOutput } from "@/lib/calculators/juros-compostos"
import { SaveCalculationDialog } from "@/components/calculators/save-calculation-dialog"

const formSchema = z.object({
    valorInicial: z.coerce.number().min(0),
    valorMensal: z.coerce.number().min(0),
    taxaJuros: z.coerce.number().min(0),
    taxaUnidade: z.enum(["mensal", "anual"]),
    periodo: z.coerce.number().min(1),
    periodoUnidade: z.enum(["meses", "anos"]),
})

export function JurosCompostosForm() {
    const [result, setResult] = useState<JurosCompostosOutput | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            valorInicial: 1000,
            valorMensal: 500,
            taxaJuros: 10, // 10% ao ano
            taxaUnidade: "anual",
            periodo: 5,
            periodoUnidade: "anos",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const output = calcularJurosCompostos({
            valorInicial: values.valorInicial,
            valorMensal: values.valorMensal,
            taxaJuros: values.taxaJuros,
            taxaUnidade: values.taxaUnidade,
            periodo: values.periodo,
            periodoUnidade: values.periodoUnidade,
        });
        setResult(output);
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    }

    return (
        <CalculatorCard
            title="Calculadora de Juros Compostos"
            description="Simule o crescimento do seu patrimônio com o poder dos juros compostos."
            result={result && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="bg-background p-4 rounded-lg border shadow-sm">
                                    <p className="text-xs text-muted-foreground mb-1">Total Investido</p>
                                    <p className="text-lg font-bold text-blue-600">{formatCurrency(result.totalInvestido)}</p>
                                </div>
                                <div className="bg-background p-4 rounded-lg border shadow-sm">
                                    <p className="text-xs text-muted-foreground mb-1">Total em Juros</p>
                                    <p className="text-lg font-bold text-green-600">{formatCurrency(result.totalJuros)}</p>
                                </div>
                                <div className="bg-background p-4 rounded-lg border shadow-sm ring-2 ring-primary/10">
                                    <p className="text-xs text-muted-foreground mb-1">Valor Total Final</p>
                                    <p className="text-xl font-bold text-primary">{formatCurrency(result.totalFinal)}</p>
                                </div>
                            </div>

                            <div className="h-[300px] w-full bg-background p-4 rounded-lg border">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={result.evolucao}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="mes"
                                            tickFormatter={(val) => val % 12 === 0 ? `${val / 12}a` : ''}
                                            minTickGap={30}
                                        />
                                        <YAxis
                                            tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            labelFormatter={(label) => `Mês ${label}`}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="investido"
                                            stackId="1"
                                            stroke="#2563eb"
                                            fill="#3b82f6"
                                            name="Investido"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="juros"
                                            stackId="1"
                                            stroke="#16a34a"
                                            fill="#22c55e"
                                            name="Juros"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" className="w-full" disabled>
                                    <Download className="mr-2 h-4 w-4" /> Baixar Relatório (PRO)
                                </Button>
                                <SaveCalculationDialog
                                    calculatorType="juros-compostos"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="valorInicial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor Inicial (R$)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="valorMensal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aporte Mensal (R$)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="taxaJuros"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Taxa de Juros (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="taxaUnidade"
                                render={({ field }) => (
                                    <FormItem className="w-[110px]">
                                        <FormLabel>&nbsp;</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="mensal">ao mês</SelectItem>
                                                <SelectItem value="anual">ao ano</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="periodo"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Período</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="periodoUnidade"
                                render={({ field }) => (
                                    <FormItem className="w-[110px]">
                                        <FormLabel>&nbsp;</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="meses">Meses</SelectItem>
                                                <SelectItem value="anos">Anos</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full size-lg text-lg font-semibold">
                        <Calculator className="mr-2 h-5 w-5" /> Calcular Juros Compostos
                    </Button>
                </form>
            </Form>
        </CalculatorCard>
    )
}
