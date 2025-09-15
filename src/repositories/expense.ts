import { prisma } from "../lib/prisma";
import { CreateExpense } from "../schemas/expense-schema";

export class ExpenseRepository {
    async createExpense(data: CreateExpense, userId: string) {
        const expense = await prisma.expense.create({
            data: { ...data, userId }
        })
        return expense;
    }

    async getExpenseById(expenseId: string) {
        const expense = await prisma.expense.findUnique({ where: { id: expenseId } });
        return expense;
    }

    async getMyExpenses(userId: string, { page = 1, perPage = 10 }) {

        const [data, total] = await Promise.all([
            prisma.expense.findMany({
                where: { userId },
                skip: (page - 1) * perPage,
                take: perPage
            }),
            prisma.expense.count({ where: { userId } })
        ]);

        return {
            data,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            }
        };
    }

    getMyExpensesByDateRange = async (userId: string, startDate: Date, endDate: Date) => {
        const expenses = await prisma.expense.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                }
            }
        })
        return expenses
    }

    updateExpense = async (expenseId: string, data: CreateExpense) => {
        return prisma.expense.update({
            where: { id: expenseId },
            data
        });
    }

    deleteExpense = async (expenseId: string) => {
        await prisma.expense.delete({ where: { id: expenseId } });
    }
}