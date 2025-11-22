import { Metadata } from "next"
import { RescisaoForm } from "@/components/calculators/rescisao-form"

export const metadata: Metadata = {
    title: "Calculadora de Rescisão Trabalhista 2025 - CLT | CalcPro.br",
    description: "Calcule sua rescisão trabalhista exata com a nova calculadora 2025. Inclui aviso prévio, férias, 13º salário e multa do FGTS. Grátis e atualizado.",
    keywords: ["calculadora rescisão", "calcular rescisão", "acerto trabalhista", "rescisão clt 2025"],
}

export default function RescisaoPage() {
    return (
        <div className="container py-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Calculadora de Rescisão Trabalhista</h1>
                <p className="text-xl text-muted-foreground">
                    Faça o cálculo exato das suas verbas rescisórias. Atualizado com as regras da CLT e tabelas 2025.
                </p>
            </div>

            <RescisaoForm />

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Como funciona o cálculo de rescisão?</h2>
                <p>
                    A rescisão do contrato de trabalho envolve diversos direitos garantidos pela CLT.
                    Nossa calculadora considera todos os fatores importantes:
                </p>
                <ul>
                    <li><strong>Saldo de Salário:</strong> Dias trabalhados no mês da saída.</li>
                    <li><strong>Aviso Prévio:</strong> Indenizado ou trabalhado, com acréscimo de 3 dias por ano.</li>
                    <li><strong>13º Salário Proporcional:</strong> Baseado nos meses trabalhados no ano.</li>
                    <li><strong>Férias + 1/3:</strong> Proporcionais e vencidas, se houver.</li>
                    <li><strong>Multa do FGTS:</strong> 40% sobre o saldo para demissão sem justa causa.</li>
                </ul>

                <div className="bg-muted p-4 rounded-lg mt-6">
                    <h3 className="mt-0">Atenção</h3>
                    <p className="mb-0">
                        Este cálculo é uma estimativa baseada nas informações fornecidas.
                        Para valores oficiais e homologação, consulte sempre o RH da empresa ou um contador especializado.
                    </p>
                </div>
            </div>
        </div>
    )
}
