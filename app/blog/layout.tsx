import { Sidebar } from "@/components/blog/sidebar"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content */}
                <main className="lg:col-span-8">
                    {children}
                </main>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                    <Sidebar />
                </aside>
            </div>
        </div>
    )
}
