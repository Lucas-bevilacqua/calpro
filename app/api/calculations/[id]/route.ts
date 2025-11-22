import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    req: NextRequest,
    context: any
) {
    const params = context.params;
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    try {
        const calculation = await prisma.calculation.findUnique({
            where: { id: params.id },
        })

        if (!calculation) {
            return NextResponse.json(
                { error: "Cálculo não encontrado" },
                { status: 404 }
            )
        }

        if (calculation.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 403 }
            )
        }

        await prisma.calculation.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting calculation:", error)
        return NextResponse.json(
            { error: "Erro ao excluir cálculo" },
            { status: 500 }
        )
    }
}
