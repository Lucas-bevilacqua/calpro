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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalculatorCard } from "@/components/ui/calculator-card"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { calcularHorasExtras, HorasExtrasOutput } from "@/lib/calculators/horas-extras"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SaveCalculationDialog } from "@/components/calculators/save-calculation-dialog"

const formSchema = z.object({
    salarioBruto: z.coerce.number().min(1, "Salário deve ser maior que zero"),
    cargaHoraria: z.coerce.number().min(1),
    horasFeitas: z.coerce.number().min(0.1, "Informe as horas feitas"),
    adicional: z.coerce.number().min(0),
    diasUteis: z.coerce.number().min(1).default(25),
    domingosFeriados: z.coerce.number().min(0).default(5),
})

export function HorasExtrasForm() {
    const [result, setResult] = useState<HorasExtrasOutput | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            salarioBruto: 0,
            cargaHoraria: 220,
            horasFeitas: 0,
            adicional: 50,
            diasUteis: 25,
            domingosFeriados: 5,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const output = calcularHorasExtras({
            salarioBruto: values.salarioBruto,
            cargaHorariaMensal: values.cargaHoraria,
            horasExtrasFeitas: values.horasFeitas,
            adicional: values.adicional,
            diasUteis: values.diasUteis,
            domingosFeriados: values.domingosFeriados,
        });
        setResult(output);
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    }

    return (
        <CalculatorCard
            title="Calculadora de Horas Extras"
            description="Calcule o valor das suas horas extras com DSR (Descanso Semanal Remunerado)."
            result={result && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Detalhes do Cálculo</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Valor Hora Normal</span>
                                            <span className="font-medium">{formatCurrency(result.valorHoraNormal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Valor Hora Extra ({form.getValues("adicional")}%)</span>
                                            <span className="font-medium">{formatCurrency(result.valorHoraExtra)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Horas Extras</span>
                                            <span className="font-medium">{formatCurrency(result.totalHorasExtras)}</span>
                                        </div>
                                        <div className="flex justify-between text-blue-600">
                                            <span className="flex items-center gap-1">
                                                DSR
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><Info className="h-3 w-3" /></TooltipTrigger>
                                                        <TooltipContent>Descanso Semanal Remunerado sobre HE</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </span>
                                            <span className="font-medium">{formatCurrency(result.dsr)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center bg-background p-4 rounded-lg border shadow-sm">
                                    <p className="text-sm text-muted-foreground mb-1">Total a Receber (Bruto)</p>
                                    <p className="text-3xl font-bold text-primary">{formatCurrency(result.totalBruto)}</p>
                                    <p className="text-xs text-muted-foreground mt-2">*Sem descontos de INSS/IRRF</p>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" className="w-full" disabled>
                                    <Download className="mr-2 h-4 w-4" /> Baixar PDF (PRO)
                                </Button>
                                <SaveCalculationDialog 
                                    calculatorType="horas-extras"
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

                        <FormField
                            control={form.control}
                            name="cargaHoraria"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Carga Horária Mensal</FormLabel>
                                    <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="220">220 horas (Padrão)</SelectItem>
                                            <SelectItem value="180">180 horas</SelectItem>
                                            <SelectItem value="150">150 horas</SelectItem>
                                            <SelectItem value="120">120 horas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="horasFeitas"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horas Extras Realizadas</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.5" placeholder="Ex: 10.5" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="adicional"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adicional (%)</FormLabel>
                                    <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="50">50% (Dias Úteis)</SelectItem>
                                            <SelectItem value="100">100% (Domingos/Feriados)</SelectItem>
                                            <SelectItem value="60">60% (Noturno/Outros)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="diasUteis"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dias Úteis (Mês)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-xs">Para cálculo do DSR</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="domingosFeriados"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dom. e Feriados</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full size-lg text-lg font-semibold">
                        <Calculator className="mr-2 h-5 w-5" /> Calcular Horas Extras
                    </Button>
                </form>
            </Form>
        </CalculatorCard>
    )
}
