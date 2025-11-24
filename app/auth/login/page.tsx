import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
    title: "Entrar | calcprobr.com",
    description: "Entre na sua conta calcprobr.com",
}

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4">
            <LoginForm />
        </div>
    )
}
