import { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
    title: "Criar Conta | calcprobr.com",
    description: "Crie sua conta calcprobr.com",
}

export default function RegisterPage() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4">
            <RegisterForm />
        </div>
    )
}
