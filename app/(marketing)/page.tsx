import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
                Cálculos Precisos para{" "}
                <span className="text-primary block sm:inline">Decisões Inteligentes</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                Ferramentas profissionais gratuitas para cálculos trabalhistas, financeiros e muito mais.
                Simples, rápido e atualizado para 2025.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link href="/calculadoras" className="w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto text-base">
                  Ver Calculadoras
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sobre" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-12 px-8 w-full sm:w-auto text-base">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                Por que usar o calcprobr.com?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Confiabilidade e Facilidade em Primeiro Lugar
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-[600px]">
                Nossas calculadoras são desenvolvidas com base na legislação vigente e nas melhores práticas financeiras.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-lg">Atualizado 2025</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Tabelas de INSS, IRRF e regras da CLT sempre em dia.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-lg">Interface Intuitiva</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Design limpo e fácil de usar, focado no resultado.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-lg">100% Gratuito</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Acesse todas as ferramentas sem custo algum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
