"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface SaveCalculationDialogProps {
    calculatorType: string
    inputs: any
    results: any
    disabled?: boolean
}

export function SaveCalculationDialog({
    calculatorType,
    inputs,
    results,
    disabled = false
}: SaveCalculationDialogProps) {
    const { data: session } = useSession()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")

    if (!session) {
        return (
            <Button variant="outline" disabled={disabled} onClick={() => router.push("/auth/login")}>
                <Save className="mr-2 h-4 w-4" />
                Salvar
            </Button>
        )
    }

    async function handleSave() {
        setIsLoading(true)
        try {
            const response = await fetch("/api/calculations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    calculatorType,
                    inputs,
                    results,
                    name: name || `${calculatorType} - ${new Date().toLocaleDateString()}`,
                    notes,
                }),
            })

            if (response.ok) {
                setOpen(false)
                router.refresh()
                // Could add toast notification here
            }
        } catch (error) {
            console.error("Error saving:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={disabled}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Salvar Cálculo</DialogTitle>
                    <DialogDescription>
                        Dê um nome para identificar este cálculo no seu dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Rescisão João Silva"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notas (opcional)</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Detalhes adicionais..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
