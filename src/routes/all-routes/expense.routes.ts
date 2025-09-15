import { FastifyInstance } from "fastify";
import { makeExpenseFactory } from "../../factories/make-expense-factory";
import { expenseSchemas } from "../../schemas/expense-schema";
import { verifyJWT } from "../../middlewares/verify-jwt";


export async function expenseRoutes(app: FastifyInstance) {

    const controller = makeExpenseFactory();

    app.post("/expenses", {
        onRequest: verifyJWT,
        schema: expenseSchemas.createExpense
    },
        controller.createExpense);

    app.get("/expenses/:expenseId", {
        onRequest: verifyJWT,
    },
        controller.getExpenseById);

    app.get("/expenses/me", {
        onRequest: verifyJWT,
        schema: expenseSchemas.findExpensesByUserIdParams.querystring
    },
        controller.getMyExpenses);

    app.get("/expenses/me/date-range", {
        onRequest: verifyJWT,
        schema: expenseSchemas.findExpensesByDateRange.querystring
    },
        controller.getMyExpensesByDateRange);

    app.put("/expenses/:expenseId", {
        onRequest: verifyJWT,
        schema: expenseSchemas.createExpense
    },
        controller.updateExpense);

    app.delete("/expenses/:expenseId", {
        onRequest: verifyJWT,
    },
        controller.deleteExpense);
}