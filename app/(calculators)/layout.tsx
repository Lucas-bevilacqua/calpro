import { ShareButtons } from "@/components/ui/share-buttons"

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {children}
            </main>

            <div className="container pb-10 max-w-4xl mx-auto">
                <ShareButtons
                    title="Calculadora Online - CalcPro.br"
                    description="Ferramenta gratuita para cálculos trabalhistas e financeiros."
                />
            </div>
        </div>
    )
}
