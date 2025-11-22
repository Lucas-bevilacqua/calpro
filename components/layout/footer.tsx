import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-10 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Calculator className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight">CalcPro.br</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            A calculadora certa para cada profissional brasileiro. Precisa, rápida e gratuita.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Calculadoras</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/calculadoras" className="hover:text-foreground">Todas as Calculadoras</Link></li>
                            <li><Link href="/calculadora/trabalhista/rescisao-trabalhista" className="hover:text-foreground">Rescisão Trabalhista</Link></li>
                            <li><Link href="/calculadora/financeira/salario-liquido" className="hover:text-foreground">Salário Líquido</Link></li>
                            <li><Link href="/calculadora/financeira/juros-compostos" className="hover:text-foreground">Juros Compostos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Empresa</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/sobre" className="hover:text-foreground">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="/contato" className="hover:text-foreground">Contato</Link></li>
                            <li><Link href="/privacidade" className="hover:text-foreground">Privacidade</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/termos" className="hover:text-foreground">Termos de Uso</Link></li>
                            <li><Link href="/cookies" className="hover:text-foreground">Política de Cookies</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CalcPro.br. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
