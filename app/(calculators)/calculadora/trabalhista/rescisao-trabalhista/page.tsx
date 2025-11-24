import { Metadata } from "next"
import { RescisaoForm } from "@/components/calculators/rescisao-form"

export const metadata: Metadata = {
    title: "Calculadora de Rescisão Trabalhista 2025 - CLT | calcprobr.com",
    description: "Calcule sua rescisão trabalhista exata com a nova calculadora 2025. Inclui aviso prévio, férias, 13º salário e multa do FGTS. Grátis e atualizado.",
    keywords: ["calculadora rescisão", "calcular rescisão", "acerto trabalhista", "rescisão clt 2025"],
}

import { AdBanner, AdInArticle } from "@/components/ads/google-adsense"

export default function RescisaoPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">
            {/* Ad Banner - Top */}
            <div className="max-w-4xl mx-auto mb-6 md:mb-8">
                <AdBanner />
            </div>

            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                    Calculadora de Rescisão Trabalhista
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                    Faça o cálculo exato das suas verbas rescisórias. Atualizado com as regras da CLT e tabelas 2025.
                </p>
            </div>

            <RescisaoForm />

            {/* Ad In-Article - Middle */}
            <div className="max-w-4xl mx-auto my-8 md:my-12">
                <AdInArticle />
            </div>

            <div className="max-w-4xl mx-auto prose prose-sm sm:prose-base dark:prose-invert px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl">Como funciona o cálculo de rescisão?</h2>
                <p className="text-sm sm:text-base">
                    A rescisão do contrato de trabalho envolve diversos direitos garantidos pela CLT.
                    Nossa calculadora considera todos os fatores importantes:
                </p>
                <ul className="text-sm sm:text-base space-y-2">
                    <li><strong>Saldo de Salário:</strong> Dias trabalhados no mês da saída.</li>
                    <li><strong>Aviso Prévio:</strong> Indenizado ou trabalhado, com acréscimo de 3 dias por ano.</li>
                    <li><strong>13º Salário Proporcional:</strong> Baseado nos meses trabalhados no ano.</li>
                    <li><strong>Férias + 1/3:</strong> Proporcionais e vencidas, se houver.</li>
                    <li><strong>Multa do FGTS:</strong> 40% sobre o saldo para demissão sem justa causa.</li>
                </ul>

                <div className="bg-muted p-4 md:p-6 rounded-lg mt-6 not-prose">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">Atenção</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-0">
                        Este cálculo é uma estimativa baseada nas informações fornecidas.
                        Para valores oficiais e homologação, consulte sempre o RH da empresa ou um contador especializado.
                    </p>
                </div>
            </div>
        </div>
    )
}
