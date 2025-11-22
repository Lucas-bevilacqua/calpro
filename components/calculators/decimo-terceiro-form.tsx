"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calculator, Download, Save } from "lucide-react"

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
import { calcularDecimoTerceiro, DecimoTerceiroOutput } from "@/lib/calculators/decimo-terceiro"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
    salarioBruto: z.coerce.number().min(1, "Salário deve ser maior que zero"),
    mesesTrabalhados: z.coerce.number().min(1).max(12),
    dependentes: z.coerce.number().min(0).optional(),
    parcela: z.enum(["unica", "primeira", "segunda"]),
})

export function DecimoTerceiroForm() {
    const [result, setResult] = useState<DecimoTerceiroOutput | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            salarioBruto: 0,
            mesesTrabalhados: 12,
            dependentes: 0,
            parcela: "unica",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const output = calcularDecimoTerceiro({
            salarioBruto: values.salarioBruto,
            mesesTrabalhados: values.mesesTrabalhados,
            dependentes: values.dependentes,
            parcela: values.parcela as any,
        });
        setResult(output);
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    }

    return (
        <CalculatorCard
            title="Calculadora de 13º Salário"
            description="Calcule o valor da primeira e segunda parcela do seu décimo terceiro."
            result={result && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Proventos</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Valor Total (Bruto)</span>
                                            <span className="font-medium">{formatCurrency(result.valorTotal)}</span>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>1ª Parcela (Adiantamento)</span>
                                            <span>{formatCurrency(result.primeiraParcela)}</span>
                                        </div>
                                        <div className="flex justify-between font-medium">
                                            <span>2ª Parcela (Saldo)</span>
                                            <span>{formatCurrency(result.segundaParcela + result.descontoINSS + result.descontoIRRF)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Descontos (na 2ª Parcela)</h3>
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
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold text-red-700">
                                        <span>Total Descontos</span>
                                        <span>{formatCurrency(result.descontoINSS + result.descontoIRRF)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-background p-4 rounded-lg border shadow-sm">
                                    <p className="text-xs text-muted-foreground mb-1">1ª Parcela (Nov)</p>
                                    <p className="text-xl font-bold text-blue-600">{formatCurrency(result.primeiraParcela)}</p>
                                </div>
                                <div className="bg-background p-4 rounded-lg border shadow-sm">
                                    <p className="text-xs text-muted-foreground mb-1">2ª Parcela (Dez)</p>
                                    <p className="text-xl font-bold text-green-600">{formatCurrency(result.segundaParcela)}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" className="w-full" disabled>
                                    <Download className="mr-2 h-4 w-4" /> Baixar PDF (PRO)
                                </Button>
                                <Button variant="outline" className="w-full" disabled>
                                    <Save className="mr-2 h-4 w-4" /> Salvar (PRO)
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            name="dependentes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dependentes</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="mesesTrabalhados"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meses Trabalhados no Ano: {field.value}</FormLabel>
                                <FormControl>
                                    <Slider
                                        min={1}
                                        max={12}
                                        step={1}
                                        defaultValue={[field.value]}
                                        onValueChange={(vals) => field.onChange(vals[0])}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Quantos meses você trabalhou neste ano (fração &ge; 15 dias conta como mês).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="parcela"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parcela a Calcular</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="unica">Parcela Única (Integral)</SelectItem>
                                        <SelectItem value="primeira">1ª Parcela (Adiantamento)</SelectItem>
                                        <SelectItem value="segunda">2ª Parcela (Saldo)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full size-lg text-lg font-semibold">
                        <Calculator className="mr-2 h-5 w-5" /> Calcular 13º Salário
                    </Button>
                </form>
            </Form>
        </CalculatorCard>
    )
}
