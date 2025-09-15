import { FastifyReply, FastifyRequest } from "fastify";
import { ExpenseService } from "../services/expense";
import { CreateExpense, FindExpensesByDateRangeParams, FindExpensesByUserIdParams } from "../schemas/expense-schema";

export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    createExpense = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateExpense;
        const user = request.user
        const expense = await this.expenseService.createExpense(body, user);
        reply.code(201).send(expense);
    };

    getExpenseById = async (request: FastifyRequest, reply: FastifyReply) => {
        const { expenseId } = request.params as { expenseId: string };
        const user = request.user
        const expense = await this.expenseService.getExpenseById(user, expenseId);
        reply.send(expense);
    }

    getMyExpenses = async (request: FastifyRequest, reply: FastifyReply) => {
        const { page = 1, perPage = 10 } = request.query as FindExpensesByUserIdParams;
        const user = request.user;

        const expenses = await this.expenseService.getMyExpenses(user, { page, perPage });
        reply.send(expenses);
    }

    getMyExpensesByDateRange = async (request: FastifyRequest, reply: FastifyReply) => {
        const { startDate, endDate } = request.query as FindExpensesByDateRangeParams;
        const user = request.user;

        const expenses = await this.expenseService.getMyExpensesByDateRange(user, startDate, endDate);

        return reply.send(expenses);
    }

    updateExpense = async (request: FastifyRequest, reply: FastifyReply) => {
        const { expenseId } = request.params as { expenseId: string };
        const body = request.body as CreateExpense;
        const user = request.user;
        await this.expenseService.updateExpense(expenseId, user, body);
        reply.code(200).send();
    }

    deleteExpense = async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user;
        const { expenseId } = request.params as { expenseId: string };
        await this.expenseService.deleteExpense(expenseId, user);
        reply.code(204).send();
    }
}