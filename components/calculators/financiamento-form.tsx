"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calculator, Download, Save, Table as TableIcon } from "lucide-react"

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
import { calcularFinanciamento, FinanciamentoOutput } from "@/lib/calculators/financiamento"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SaveCalculationDialog } from "@/components/calculators/save-calculation-dialog"

const formSchema = z.object({
    valorFinanciado: z.coerce.number().min(1, "Valor deve ser maior que zero"),
    taxaJurosAnual: z.coerce.number().min(0),
    prazoMeses: z.coerce.number().min(1, "Prazo deve ser de pelo menos 1 mês"),
    sistema: z.enum(["sac", "price"]),
})

export function FinanciamentoForm() {
    const [result, setResult] = useState<FinanciamentoOutput | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            valorFinanciado: 200000,
            taxaJurosAnual: 9.5,
            prazoMeses: 360,
            sistema: "sac",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const output = calcularFinanciamento({
            valorFinanciado: values.valorFinanciado,
            taxaJurosAnual: values.taxaJurosAnual,
            prazoMeses: values.prazoMeses,
            sistema: values.sistema,
        });
        setResult(output);
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    }

    return (
        <CalculatorCard
            title="Calculadora de Financiamento"
            description="Simule financiamentos imobiliários ou veiculares pelos sistemas SAC e Price."
            result={result && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Resumo do Financiamento</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Valor Financiado</span>
                                            <span className="font-medium">{formatCurrency(result.valorFinanciado)}</span>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <span>Total de Juros</span>
                                            <span>+ {formatCurrency(result.totalJuros)}</span>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between font-bold text-primary">
                                            <span>Total a Pagar</span>
                                            <span>{formatCurrency(result.totalPago)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-background p-3 rounded-lg border shadow-sm text-center">
                                            <p className="text-xs text-muted-foreground mb-1">1ª Parcela</p>
                                            <p className="text-lg font-bold text-blue-600">{formatCurrency(result.primeiraParcela)}</p>
                                        </div>
                                        <div className="bg-background p-3 rounded-lg border shadow-sm text-center">
                                            <p className="text-xs text-muted-foreground mb-1">Última Parcela</p>
                                            <p className="text-lg font-bold text-green-600">{formatCurrency(result.ultimaParcela)}</p>
                                        </div>
                                    </div>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="secondary" className="w-full">
                                                <TableIcon className="mr-2 h-4 w-4" /> Ver Tabela Completa
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Tabela de Amortização ({form.getValues("sistema").toUpperCase()})</DialogTitle>
                                                <DialogDescription>
                                                    Detalhamento mês a mês das parcelas.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[80px]">Mês</TableHead>
                                                        <TableHead>Parcela</TableHead>
                                                        <TableHead>Amortização</TableHead>
                                                        <TableHead>Juros</TableHead>
                                                        <TableHead className="text-right">Saldo Devedor</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {result.tabela.map((row) => (
                                                        <TableRow key={row.numero}>
                                                            <TableCell className="font-medium">{row.numero}</TableCell>
                                                            <TableCell>{formatCurrency(row.valor)}</TableCell>
                                                            <TableCell>{formatCurrency(row.amortizacao)}</TableCell>
                                                            <TableCell>{formatCurrency(row.juros)}</TableCell>
                                                            <TableCell className="text-right">{formatCurrency(row.saldoDevedor)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" className="w-full" disabled>
                                    <Download className="mr-2 h-4 w-4" /> Baixar PDF (PRO)
                                </Button>
                                <SaveCalculationDialog
                                    calculatorType="financiamento"
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
                        name="valorFinanciado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor a Financiar (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="taxaJurosAnual"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Taxa de Juros (% ao ano)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prazoMeses"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prazo (Meses)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>Ex: 360 meses = 30 anos</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="sistema"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sistema de Amortização</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="sac">SAC (Parcelas Decrescentes)</SelectItem>
                                        <SelectItem value="price">Price (Parcelas Fixas)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    SAC é mais comum em imóveis. Price é comum em veículos.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full size-lg text-lg font-semibold">
                        <Calculator className="mr-2 h-5 w-5" /> Calcular Financiamento
                    </Button>
                </form>
            </Form>
        </CalculatorCard>
    )
}
