import z from "zod";


export const expenseSchemas = {
    createExpense: {
        body: z.object({
            amount: z.number().negative("O valor da despesa deve ser negativo").refine((val) => val < 0, {
                message: "O valor da despesa deve ser negativo"
            }),
            type: z.enum(["FUEL", "MAINTENANCE", "INSURANCE", "TAXES", "TOLLS", "PARKING", "OTHER"]),
            date: z.date().optional(),
        })
    },
    findExpensesByUserIdParams: {
        querystring: z.object({
            page: z.coerce.number().optional(),
            perPage: z.coerce.number().optional(),
        })
    },
    findExpensesByDateRange: {
        querystring: z.object({
            startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: "Data de início inválida",
            }),
            endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: "Data de término inválida",
            })
        }).refine((data) => {
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            return end >= start;
        }, {
            message: "A data de término deve ser posterior ou igual à data de início",
            path: ["endDate"]
        })
    }
}

export type CreateExpense = z.infer<typeof expenseSchemas.createExpense.body>;
export type FindExpensesByUserIdParams = z.infer<typeof expenseSchemas.findExpensesByUserIdParams.querystring>;
export type FindExpensesByDateRangeParams = z.infer<typeof expenseSchemas.findExpensesByDateRange.querystring>;