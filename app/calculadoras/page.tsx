import Link from "next/link"
import { Metadata } from "next"
import {
    Calculator,
    Briefcase,
    DollarSign,
    HardHat,
    User,
    FileText,
    ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Todas as Calculadoras | CalcPro.br",
    description: "Acesse todas as nossas calculadoras profissionais. Trabalhista, Financeira, Construção e mais.",
}

const categories = [
    {
        title: "Trabalhista",
        icon: Briefcase,
        description: "Cálculos de rescisão, férias, décimo terceiro e horas extras.",
        items: [
            { name: "Rescisão Trabalhista", href: "/calculadora/trabalhista/rescisao-trabalhista" },
            { name: "Horas Extras", href: "/calculadora/trabalhista/horas-extras" },
            { name: "13º Salário", href: "/calculadora/trabalhista/13-salario" },
        ]
    },
    {
        title: "Financeira",
        icon: DollarSign,
        description: "Planejamento financeiro, investimentos e financiamentos.",
        items: [
            { name: "Salário Líquido", href: "/calculadora/financeira/salario-liquido" },
            { name: "Juros Compostos", href: "/calculadora/financeira/juros-compostos" },
            { name: "Financiamento (SAC/Price)", href: "/calculadora/financeira/financiamento" },
        ]
    },
    // Placeholders for future categories
    {
        title: "Construção",
        icon: HardHat,
        description: "Cálculos de materiais e custos de obra.",
        items: []
    },
    {
        title: "Freelancer",
        icon: User,
        description: "Precificação de projetos e cálculo de hora técnica.",
        items: []
    },
    {
        title: "Contábil",
        icon: FileText,
        description: "Simples Nacional, Lucro Presumido e MEI.",
        items: []
    }
]

export default function CalculadorasPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Nossas Calculadoras
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Ferramentas precisas para facilitar o seu dia a dia profissional e pessoal.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Card key={category.title} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <category.icon className="h-6 w-6" />
                                </div>
                                <CardTitle>{category.title}</CardTitle>
                            </div>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {category.items.length > 0 ? (
                                <ul className="space-y-2">
                                    {category.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="group flex items-center justify-between text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                {item.name}
                                                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Em breve...</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
