import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Política de Privacidade | calcprobr.com",
    description: "Política de Privacidade do calcprobr.com. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados).",
    keywords: ["política de privacidade", "privacidade", "LGPD", "proteção de dados", "dados pessoais", "calcprobr.com"],
    openGraph: {
        title: "Política de Privacidade | calcprobr.com",
        description: "Política de Privacidade do calcprobr.com. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
        url: "https://calcprobr.com/privacidade",
        siteName: "calcprobr.com",
        type: "website",
    },
    alternates: {
        canonical: "https://calcprobr.com/privacidade",
    },
    robots: {
        index: true,
        follow: true,
    }
}

export default function PrivacyPage() {
    const lastUpdated = "27 de novembro de 2024"

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Política de Privacidade",
        "description": "Política de Privacidade do calcprobr.com",
        "url": "https://calcprobr.com/privacidade",
        "inLanguage": "pt-BR",
        "isPartOf": {
            "@type": "WebSite",
            "name": "calcprobr.com",
            "url": "https://calcprobr.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "calcprobr.com",
            "url": "https://calcprobr.com"
        },
        "dateModified": "2024-11-27",
        "mainEntity": {
            "@type": "Article",
            "headline": "Política de Privacidade",
            "datePublished": "2023-11-22",
            "dateModified": "2024-11-27",
            "author": {
                "@type": "Organization",
                "name": "calcprobr.com"
            }
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Política de Privacidade</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">Última atualização: {lastUpdated}</p>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                        <h2>1. Introdução</h2>
                        <p>
                            O <strong>calcprobr.com</strong> ("nós", "nosso") respeita a sua privacidade e está comprometido em proteger os seus dados pessoais.
                            Esta política de privacidade irá informá-lo sobre como coletamos, usamos e protegemos seus dados pessoais quando você visita nosso site,
                            e lhe falar sobre seus direitos de privacidade e como a lei o protege, em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018)</strong>.
                        </p>

                        <h2>2. Dados que Coletamos</h2>
                        <p>
                            Podemos coletar, usar, armazenar e transferir diferentes tipos de dados pessoais sobre você, que agrupamos da seguinte forma:
                        </p>
                        <ul>
                            <li><strong>Dados de Identidade:</strong> inclui nome, sobrenome, nome de usuário ou identificador similar.</li>
                            <li><strong>Dados de Contato:</strong> inclui endereço de e-mail.</li>
                            <li><strong>Dados Técnicos:</strong> inclui endereço de protocolo de internet (IP), seus dados de login, tipo e versão do navegador, configuração e localização do fuso horário, tipos e versões de plug-in do navegador, sistema operacional e plataforma e outras tecnologias nos dispositivos que você usa para acessar este site.</li>
                            <li><strong>Dados de Uso:</strong> inclui informações sobre como você usa nosso site, produtos e serviços (ex: quais calculadoras você utiliza, tempo de navegação, páginas visitadas).</li>
                            <li><strong>Dados de Marketing:</strong> inclui suas preferências em receber marketing nosso e suas preferências de comunicação.</li>
                        </ul>

                        <h2>3. Como Coletamos Seus Dados</h2>
                        <p>Utilizamos diferentes métodos para coletar dados de e sobre você, incluindo:</p>
                        <ul>
                            <li><strong>Interação direta:</strong> Você nos fornece seus dados ao preencher formulários ou ao se corresponder conosco por e-mail ou de outra forma.</li>
                            <li><strong>Tecnologias automatizadas:</strong> À medida que você interage com nosso site, podemos coletar automaticamente dados técnicos sobre seu equipamento, ações de navegação e padrões usando cookies, logs do servidor e outras tecnologias similares.</li>
                            <li><strong>Google Analytics:</strong> Utilizamos o Google Analytics para entender como os visitantes usam nosso site.</li>
                            <li><strong>Google AdSense:</strong> Utilizamos o Google AdSense para exibir anúncios relevantes. O Google pode usar cookies para personalizar anúncios com base em suas visitas anteriores ao nosso site.</li>
                        </ul>

                        <h2>4. Como Usamos Seus Dados</h2>
                        <p>
                            Só usaremos seus dados pessoais quando a lei nos permitir. Mais comumente, usaremos seus dados pessoais nas seguintes circunstâncias:
                        </p>
                        <ul>
                            <li>Para registrar você como um novo usuário e gerenciar sua conta.</li>
                            <li>Para fornecer e melhorar nossos serviços de calculadoras online.</li>
                            <li>Para gerenciar nosso relacionamento com você, incluindo notificá-lo sobre mudanças em nossos termos ou política de privacidade.</li>
                            <li>Para administrar e proteger nosso negócio e este site (incluindo solução de problemas, análise de dados, testes, manutenção do sistema, suporte, relatórios e hospedagem de dados).</li>
                            <li>Para melhorar nosso site, produtos/serviços, marketing, relacionamento com o cliente e experiências.</li>
                            <li>Para fazer recomendações a você sobre serviços que possam ser do seu interesse.</li>
                            <li>Para exibir anúncios relevantes através do Google AdSense.</li>
                        </ul>

                        <h2>5. Compartilhamento de Dados</h2>
                        <p>Podemos compartilhar seus dados pessoais com as seguintes partes:</p>
                        <ul>
                            <li><strong>Google Analytics e Google AdSense:</strong> Para análise de uso do site e exibição de anúncios.</li>
                            <li><strong>Provedores de serviços:</strong> Que prestam serviços de TI e administração de sistemas.</li>
                            <li><strong>Autoridades reguladoras:</strong> Quando exigido por lei ou para proteger nossos direitos.</li>
                        </ul>
                        <p>
                            Não vendemos, alugamos ou comercializamos suas informações pessoais para terceiros para fins de marketing.
                        </p>

                        <h2>6. Segurança de Dados</h2>
                        <p>
                            Estabelecemos medidas de segurança apropriadas para impedir que seus dados pessoais sejam acidentalmente perdidos, usados ou acessados de forma não autorizada, alterados ou divulgados. Além disso, limitamos o acesso aos seus dados pessoais àqueles funcionários, agentes, contratados e outros terceiros que tenham uma necessidade comercial de conhecê-los.
                        </p>

                        <h2>7. Retenção de Dados</h2>
                        <p>
                            Só reteremos seus dados pessoais pelo tempo necessário para cumprir os propósitos para os quais os coletamos, incluindo para fins de satisfação de quaisquer requisitos legais, contábeis ou de relatórios.
                        </p>

                        <h2>8. Seus Direitos Legais (LGPD)</h2>
                        <p>
                            Sob a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
                        </p>
                        <ul>
                            <li><strong>Confirmação e acesso:</strong> Direito de confirmar a existência de tratamento e acessar seus dados pessoais.</li>
                            <li><strong>Correção:</strong> Direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                            <li><strong>Anonimização, bloqueio ou eliminação:</strong> Direito de solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.</li>
                            <li><strong>Portabilidade:</strong> Direito de solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto.</li>
                            <li><strong>Eliminação:</strong> Direito de solicitar a eliminação dos dados pessoais tratados com o consentimento do titular.</li>
                            <li><strong>Informação:</strong> Direito de obter informações sobre as entidades públicas e privadas com as quais compartilhamos dados.</li>
                            <li><strong>Revogação do consentimento:</strong> Direito de revogar o consentimento a qualquer momento.</li>
                        </ul>
                        <p>
                            Para exercer qualquer um desses direitos, entre em contato conosco através da nossa <a href="/contato">página de contato</a>.
                        </p>

                        <h2>9. Cookies e Tecnologias Similares</h2>
                        <p>
                            Nosso site usa cookies para distinguir você de outros usuários do nosso site. Isso nos ajuda a fornecer uma boa experiência quando você navega em nosso site e também nos permite melhorar nosso site. Para mais informações sobre os cookies que usamos, consulte nossa <a href="/cookies">Política de Cookies</a>.
                        </p>

                        <h2>10. Links para Sites de Terceiros</h2>
                        <p>
                            Este site pode incluir links para sites, plug-ins e aplicativos de terceiros. Clicar nesses links ou habilitar essas conexões pode permitir que terceiros coletem ou compartilhem dados sobre você. Não controlamos esses sites de terceiros e não somos responsáveis por suas declarações de privacidade.
                        </p>

                        <h2>11. Alterações a Esta Política de Privacidade</h2>
                        <p>
                            Podemos atualizar nossa política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer mudanças publicando a nova política de privacidade nesta página e atualizando a data de "Última atualização" no topo desta política.
                        </p>

                        <h2>12. Contato</h2>
                        <p>
                            Se você tiver alguma dúvida sobre esta política de privacidade, sobre como tratamos seus dados pessoais, ou se desejar exercer seus direitos sob a LGPD, entre em contato conosco através da nossa <a href="/contato">página de contato</a>.
                        </p>

                        <div className="mt-8 p-4 bg-muted rounded-lg">
                            <p className="text-sm font-semibold mb-2">Informações sobre Publicidade:</p>
                            <p className="text-sm">
                                Este site utiliza o Google AdSense para exibir anúncios. O Google usa cookies para veicular anúncios com base em visitas anteriores dos usuários ao nosso site ou a outros sites.
                                Você pode desativar o uso de cookies pelo Google acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Configurações de anúncios do Google</a>.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
