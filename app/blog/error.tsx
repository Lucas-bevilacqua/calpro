'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Blog Error:', error)
    }, [error])

    return (
        <div className="container flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <div className="bg-destructive/10 p-4 rounded-full mb-6">
                <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ops! Algo deu errado.</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                Não conseguimos carregar este conteúdo. Pode ser um erro temporário ou um problema com o artigo.
            </p>

            {process.env.NODE_ENV === 'development' && (
                <div className="bg-muted p-4 rounded-md mb-8 text-left w-full max-w-2xl overflow-auto">
                    <p className="font-mono text-xs text-destructive">{error.message}</p>
                    {error.digest && <p className="font-mono text-xs text-muted-foreground mt-2">Digest: {error.digest}</p>}
                </div>
            )}

            <div className="flex gap-4">
                <Button variant="outline" onClick={() => window.location.href = '/blog'}>
                    Voltar para o Blog
                </Button>
                <Button onClick={() => reset()}>
                    Tentar novamente
                </Button>
            </div>
        </div>
    )
}
