"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Calculator, Download, Save } from "lucide-react"

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
import { calcularRescisao, RescisaoOutput, TipoRescisao } from "@/lib/calculators/rescisao"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SaveCalculationDialog } from "@/components/calculators/save-calculation-dialog"

const formSchema = z.object({
    salarioBruto: z.coerce.number().min(1, "Salário deve ser maior que zero"),
    dataAdmissao: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
    dataDemissao: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
    tipoRescisao: z.enum(["sem-justa-causa", "pedido-demissao", "justa-causa", "acordo"]),
    saldoFGTS: z.coerce.number().min(0, "Saldo não pode ser negativo"),
    dependentes: z.coerce.number().min(0).optional(),
}).refine((data) => {
    const adm = new Date(data.dataAdmissao);
    const dem = new Date(data.dataDemissao);
    return dem > adm;
}, {
    message: "Data de demissão deve ser posterior à admissão",
    path: ["dataDemissao"],
});

export function RescisaoForm() {
    const [result, setResult] = useState<RescisaoOutput | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            salarioBruto: 0,
            saldoFGTS: 0,
            dependentes: 0,
            tipoRescisao: "sem-justa-causa",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const output = calcularRescisao({
            salarioBruto: values.salarioBruto,
            dataAdmissao: new Date(values.dataAdmissao),
            dataDemissao: new Date(values.dataDemissao),
            tipoRescisao: values.tipoRescisao as TipoRescisao,
            saldoFGTS: values.saldoFGTS,
            dependentes: values.dependentes,
        });
        setResult(output);
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    }

    return (
        <CalculatorCard
            title="Calculadora de Rescisão Trabalhista"
            description="Calcule suas verbas rescisórias de acordo com a CLT (2025)."
            result={result && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <span className="p-1 bg-green-100 text-green-700 rounded">Proventos</span>
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Aviso Prévio ({result.memoriaCalculo.diasAviso}d)</span>
                                            <span className="font-medium">{formatCurrency(result.avisoPrevio)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Saldo Salário</span>
                                            <span className="font-medium">{formatCurrency(result.saldoSalario)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>13º Proporcional ({result.memoriaCalculo.avos13}/12)</span>
                                            <span className="font-medium">{formatCurrency(result.decimoTerceiro)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Férias Prop. ({result.memoriaCalculo.avosFerias}/12)</span>
                                            <span className="font-medium">{formatCurrency(result.feriasProporcionais)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>1/3 Férias</span>
                                            <span className="font-medium">{formatCurrency(result.umTercoFerias)}</span>
                                        </div>
                                        {result.multaFGTS > 0 && (
                                            <div className="flex justify-between text-blue-600 font-medium">
                                                <span>Multa FGTS</span>
                                                <span>{formatCurrency(result.multaFGTS)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold">
                                        <span>Total Bruto</span>
                                        <span>{formatCurrency(result.totalBruto)}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <span className="p-1 bg-red-100 text-red-700 rounded">Descontos</span>
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>INSS</span>
                                            <span className="text-red-600">{formatCurrency(result.descontoINSS)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>IRRF</span>
                                            <span className="text-red-600">{formatCurrency(result.descontoIRRF)}</span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-red-700">
                                        <span>Total Descontos</span>
                                        <span>{formatCurrency(result.descontoINSS + result.descontoIRRF)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-background p-4 rounded-lg border shadow-sm text-center">
                                <p className="text-sm text-muted-foreground mb-1">Valor Líquido a Receber</p>
                                <p className="text-3xl font-bold text-primary">{formatCurrency(result.totalLiquido)}</p>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" className="w-full" disabled>
                                    <Download className="mr-2 h-4 w-4" /> Baixar PDF (PRO)
                                </Button>
                                <SaveCalculationDialog 
                                    calculatorType="rescisao"
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
                            name="saldoFGTS"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Saldo FGTS (R$)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="0,00" {...field} />
                                    </FormControl>
                                    <FormDescription>Para cálculo da multa de 40%</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="dataAdmissao"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Admissão</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dataDemissao"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Demissão</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="tipoRescisao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motivo da Rescisão</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o motivo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="sem-justa-causa">Demissão Sem Justa Causa</SelectItem>
                                        <SelectItem value="pedido-demissao">Pedido de Demissão</SelectItem>
                                        <SelectItem value="justa-causa">Demissão Por Justa Causa</SelectItem>
                                        <SelectItem value="acordo">Acordo (Comum Acordo)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full size-lg text-lg font-semibold">
                        <Calculator className="mr-2 h-5 w-5" /> Calcular Rescisão
                    </Button>
                </form>
            </Form>
        </CalculatorCard>
    )
}
