import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from './mdx-components'

interface MDXContentProps {
    source: string
    slug: string
}

export async function MDXContent({ source, slug }: MDXContentProps) {
    try {
        return <MDXRemote source={source} components={mdxComponents} />
    } catch (err) {
        console.error(`Error rendering MDX for ${slug}:`, err)
        return (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive font-semibold">Erro ao renderizar conteúdo</p>
                <p className="text-sm text-muted-foreground mt-2">
                    Este artigo contém um erro de formatação. Por favor, entre em contato com o suporte.
                </p>
                {process.env.NODE_ENV === 'development' && (
                    <pre className="mt-4 text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                        {(err as Error).message}
                    </pre>
                )}
            </div>
        )
    }
}
