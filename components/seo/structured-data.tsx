import React from 'react'

interface WebSiteSchemaProps {
    url?: string
    name?: string
}

export function WebSiteSchema({
    url = 'https://www.calcprobr.com',
    name = 'CalcPro.br'
}: WebSiteSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        description: 'Calculadoras financeiras e trabalhistas gratuitas para o Brasil',
        inLanguage: 'pt-BR',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${url}/calculadoras?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CalcPro.br',
        url: 'https://www.calcprobr.com',
        logo: 'https://www.calcprobr.com/logo.png',
        description: 'Ferramentas gratuitas de cálculo financeiro e trabalhista',
        sameAs: [
            // Add social media links here when available
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'contato@calcprobr.com',
            contactType: 'customer service',
            areaServed: 'BR',
            availableLanguage: 'Portuguese'
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface BreadcrumbItem {
    name: string
    url: string
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
