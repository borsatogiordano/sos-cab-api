import { ExpenseController } from "../controllers/expense";
import { ExpenseRepository } from "../repositories/expense";
import { UserRepository } from "../repositories/user";
import { ExpenseService } from "../services/expense";

export function makeExpenseFactory() {
    
    const userRepository = new UserRepository();
    const expenseRepository = new ExpenseRepository();
    const expenseService = new ExpenseService(userRepository, expenseRepository);
    const expenseController = new ExpenseController(expenseService);

    return expenseController;
}