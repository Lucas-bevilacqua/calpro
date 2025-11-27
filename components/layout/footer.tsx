import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            <span className="text-lg sm:text-xl font-bold tracking-tight">calcprobr.com</span>
                        </Link>
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
                            A calculadora certa para cada profissional brasileiro. Precisa, rápida e gratuita.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Calculadoras</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                            <li><Link href="/calculadoras" className="hover:text-foreground transition-colors">Todas as Calculadoras</Link></li>
                            <li><Link href="/calculadora/trabalhista/rescisao-trabalhista" className="hover:text-foreground transition-colors">Rescisão Trabalhista</Link></li>
                            <li><Link href="/calculadora/financeira/salario-liquido" className="hover:text-foreground transition-colors">Salário Líquido</Link></li>
                            <li><Link href="/calculadora/financeira/juros-compostos" className="hover:text-foreground transition-colors">Juros Compostos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Empresa</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                            <li><Link href="/sobre" className="hover:text-foreground transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="/contato" className="hover:text-foreground transition-colors">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                            <li><Link href="/privacidade" className="hover:text-foreground transition-colors">Política de Privacidade</Link></li>
                            <li><Link href="/termos" className="hover:text-foreground transition-colors">Termos de Uso</Link></li>
                            <li><Link href="/cookies" className="hover:text-foreground transition-colors">Política de Cookies</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 md:mt-10 border-t pt-6 md:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} calcprobr.com. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
