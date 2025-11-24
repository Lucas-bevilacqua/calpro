
import React from 'react'

export const metadata = {
    title: 'Política de Cookies | calcprobr.com',
    description: 'Entenda como utilizamos cookies para melhorar sua experiência no calcprobr.com.',
}

export default function CookiesPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>

            <div className="prose prose-slate max-w-none">
                <p className="mb-4">
                    Esta Política de Cookies explica o que são cookies e como os utilizamos. Você deve ler esta política para entender que tipo de cookies usamos, ou as informações que coletamos usando cookies e como essas informações são usadas.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">O que são cookies?</h2>
                <p className="mb-4">
                    Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">Como usamos os cookies?</h2>
                <p className="mb-4">
                    Utilizamos cookies por vários motivos, incluindo:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site.</li>
                    <li><strong>Cookies de Desempenho:</strong> Para analisar como os visitantes usam nosso site e monitorar o desempenho.</li>
                    <li><strong>Cookies de Publicidade:</strong> Usados para exibir anúncios relevantes para você (Google AdSense).</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-3">Gerenciamento de Cookies</h2>
                <p className="mb-4">
                    Você pode alterar as configurações do seu navegador para recusar cookies se preferir. No entanto, isso pode impedir que você tire total proveito do site.
                </p>
            </div>
        </div>
    )
}
