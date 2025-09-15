import { FastifyJWT } from "@fastify/jwt";
import { ExpenseRepository } from "../repositories/expense";
import { UserRepository } from "../repositories/user";
import { CreateExpense } from "../schemas/expense-schema";
import { UserNotFoundError } from "../errors/separated-errors/user-errors";
import { ForbiddenError } from "../errors/separated-errors/authentication-errors";
import { ExpenseDoesNotExists } from "../errors/separated-errors/expense-errors";
import dayjs from "dayjs";
import { InvalidDateRangeError, InvalidDatesError } from "../errors/separated-errors/ride-errors";

export class ExpenseService {
    constructor(
        private userRepository: UserRepository,
        private expenseRepository: ExpenseRepository
    ) { }

    createExpense = async (data: CreateExpense, user: FastifyJWT["user"]) => {
        const existingUser = await this.userRepository.getUserById(user.userId);
        if (!existingUser) {
            throw new UserNotFoundError()
        }

        return await this.expenseRepository.createExpense(data, user.userId);
    }

    getExpenseById = async (user: FastifyJWT["user"], expenseId: string) => {
        const existingUser = await this.userRepository.getUserById(user.userId);
        if (!existingUser) {
            throw new UserNotFoundError()
        }

        if (user.role !== 'ADMIN' && existingUser.id !== user.userId) {
            throw new ForbiddenError()
        }

        const expense = await this.expenseRepository.getExpenseById(expenseId);
        if (!expense) {
            throw new ExpenseDoesNotExists();
        }

        return expense;
    }

    getMyExpenses = async (user: FastifyJWT["user"], { page = 1, perPage = 10 }) => {
        const existingUser = await this.userRepository.getUserById(user.userId);
        if (!existingUser) {
            throw new UserNotFoundError()
        }
        const pageTo = Number(page) || 1;
        const perPageTo = Number(perPage) || 10;
        const expenses = await this.expenseRepository.getMyExpenses(user.userId, { page: pageTo, perPage: perPageTo });
        return expenses;
    }

    getMyExpensesByDateRange = async (user: FastifyJWT["user"], startDate: string, endDate: string) => {

        const existingUser = await this.userRepository.getUserById(user.userId);
        if (!existingUser) {
            throw new UserNotFoundError();
        }
        if (!endDate || !startDate) {
            throw new InvalidDatesError();
        }

        const startDateDay = dayjs(startDate).startOf("day").toDate();
        const endDateDay = dayjs(endDate).endOf("day").toDate();

        if (!dayjs(startDateDay).isValid() || !dayjs(endDateDay).isValid()) {
            throw new InvalidDatesError();
        }

        if (endDateDay < startDateDay) {
            throw new InvalidDateRangeError();
        }

        console.log(startDateDay, endDateDay);

        return await this.expenseRepository.getMyExpensesByDateRange(user.userId, startDateDay, endDateDay);
    }

    updateExpense = async (expenseId: string, user: FastifyJWT["user"], data: CreateExpense) => {
        const existingExpense = await this.expenseRepository.getExpenseById(expenseId);
        if (!existingExpense) {
            throw new ExpenseDoesNotExists();
        }

        if (existingExpense.userId !== user.userId && user.role !== "ADMIN") {
            throw new ForbiddenError();
        }

        return await this.expenseRepository.updateExpense(expenseId, data);
    }

    deleteExpense = async (expenseId: string, user: FastifyJWT["user"]) => {
        const existingExpense = await this.expenseRepository.getExpenseById(expenseId);
        if (!existingExpense) {
            throw new ExpenseDoesNotExists();
        }

        if (existingExpense.userId !== user.userId && user.role !== "ADMIN") {
            throw new ForbiddenError();
        }
        await this.expenseRepository.deleteExpense(expenseId);
    }
}