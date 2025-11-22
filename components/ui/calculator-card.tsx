import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CalculatorCardProps {
    title: string
    description: string
    children: React.ReactNode
    footer?: React.ReactNode
    result?: React.ReactNode
    className?: string
}

export function CalculatorCard({ title, description, children, footer, result, className }: CalculatorCardProps) {
    return (
        <div className={cn("w-full max-w-2xl mx-auto", className)}>
            <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {children}
                </CardContent>
                {footer && <CardFooter className="flex justify-end space-x-2 bg-muted/20 p-6">{footer}</CardFooter>}
            </Card>
            {result && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    {result}
                </div>
            )}
        </div>
    )
}
