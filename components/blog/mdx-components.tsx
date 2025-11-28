import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const mdxComponents = {
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
        <div className="my-6 w-full">
            <Table className={className} {...props} />
        </div>
    ),
    thead: TableHeader,
    tbody: TableBody,
    tr: TableRow,
    th: TableHead,
    td: TableCell,
}
