import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Calculator } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h1 className="text-6xl font-bold tracking-tighter">404</h1>
                <h2 className="text-2xl font-semibold">Página não encontrada</h2>
                <p className="text-muted-foreground max-w-md">
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>
            </div>
            <div className="flex gap-4">
                <Link href="/">
                    <Button>
                        <Home className="mr-2 h-4 w-4" />
                        Voltar ao Início
                    </Button>
                </Link>
                <Link href="/calculadoras">
                    <Button variant="outline">
                        <Calculator className="mr-2 h-4 w-4" />
                        Ver Calculadoras
                    </Button>
                </Link>
            </div>
        </div>
    )
}
