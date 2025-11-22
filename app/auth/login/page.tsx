import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
    title: "Entrar | CalcPro.br",
    description: "Entre na sua conta CalcPro.br",
}

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4">
            <LoginForm />
        </div>
    )
}
