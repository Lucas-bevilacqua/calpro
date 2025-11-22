import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator, Menu, X } from 'lucide-react'
import { UserMenu } from './user-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">CalcPro.br</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/calculadoras" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Calculadoras
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Blog
          </Link>
          <Link href="/sobre" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Sobre
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <UserMenu />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
