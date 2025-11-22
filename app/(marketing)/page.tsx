import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Cálculos Precisos para <br className="hidden sm:inline" />
                <span className="text-primary">Decisões Inteligentes</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Ferramentas profissionais gratuitas para cálculos trabalhistas, financeiros e muito mais.
                Simples, rápido e atualizado para 2025.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/calculadoras">
                <Button size="lg" className="h-12 px-8">
                  Ver Calculadoras
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Por que usar o CalcPro.br?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Confiabilidade e Facilidade em Primeiro Lugar
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nossas calculadoras são desenvolvidas com base na legislação vigente e nas melhores práticas financeiras.
              </p>
            </div>
            <div className="grid gap-4 items-center">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Atualizado 2025</h3>
                  <p className="text-muted-foreground">Tabelas de INSS, IRRF e regras da CLT sempre em dia.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Interface Intuitiva</h3>
                  <p className="text-muted-foreground">Design limpo e fácil de usar, focado no resultado.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">100% Gratuito</h3>
                  <p className="text-muted-foreground">Acesse todas as ferramentas sem custo algum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
