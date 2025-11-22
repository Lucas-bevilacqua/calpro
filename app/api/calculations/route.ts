import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { calculatorType, inputs, results, name, notes } = body

        if (!calculatorType || !inputs || !results) {
            return NextResponse.json(
                { error: "Dados incompletos" },
                { status: 400 }
            )
        }

        const calculation = await prisma.calculation.create({
            data: {
                userId: session.user.id,
                calculatorType,
                inputs,
                results,
                name: name || `${calculatorType} - ${new Date().toLocaleDateString()}`,
                notes,
            },
        })

        return NextResponse.json(calculation, { status: 201 })
    } catch (error) {
        console.error("Error saving calculation:", error)
        return NextResponse.json(
            { error: "Erro ao salvar cálculo" },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    try {
        const calculations = await prisma.calculation.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(calculations)
    } catch (error) {
        console.error("Error fetching calculations:", error)
        return NextResponse.json(
            { error: "Erro ao buscar cálculos" },
            { status: 500 }
        )
    }
}
