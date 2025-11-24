import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WebSiteSchema, OrganizationSchema } from "@/components/seo/structured-data"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "calcprobr.com - Calculadoras Trabalhistas e Financeiras",
  description: "Calculadoras precisas para rescisão, férias, 13º salário, financiamentos e muito mais.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GGNK21MXTN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GGNK21MXTN');
            `,
          }}
        />

        {/* Google AdSense */}
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}

        {/* Structured Data */}
        <WebSiteSchema />
        <OrganizationSchema />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <SonnerToaster />
        </AuthProvider>
      </body>
    </html >
  )
}
