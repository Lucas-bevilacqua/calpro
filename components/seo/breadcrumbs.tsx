import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbSchema } from './structured-data'

export interface BreadcrumbItem {
    name: string
    href: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const allItems = [
        { name: 'Início', href: '/' },
        ...items
    ]

    const schemaItems = allItems.map(item => ({
        name: item.name,
        url: `https://www.calcprobr.com${item.href}`
    }))

    return (
        <>
            <BreadcrumbSchema items={schemaItems} />
            <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                    {allItems.map((item, index) => (
                        <li key={item.href} className="flex items-center gap-2">
                            {index > 0 && <ChevronRight className="h-4 w-4" />}
                            {index === allItems.length - 1 ? (
                                <span className="font-medium text-foreground" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-foreground transition-colors flex items-center gap-1"
                                >
                                    {index === 0 && <Home className="h-4 w-4" />}
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}
