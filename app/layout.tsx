import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/auth/auth-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "CalcPro.br - Calculadoras Profissionais Especializadas",
    template: "%s | CalcPro.br",
  },
  description: "A calculadora certa para cada profissional brasileiro. Ferramentas precisas para trabalhista, financeiro, construção e mais.",
  keywords: ["calculadora", "trabalhista", "financeira", "construção", "freelancer", "brasil"],
  metadataBase: new URL("https://calcpro.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://calcpro.br",
    siteName: "CalcPro.br",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "CalcPro.br - Calculadoras Profissionais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcPro.br - Calculadoras Profissionais Especializadas",
    description: "A calculadora certa para cada profissional brasileiro.",
    images: ["/og"],
    creator: "@calcprobr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
