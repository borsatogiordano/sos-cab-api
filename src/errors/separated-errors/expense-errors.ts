import { AppError } from "../errorHandler";

export class ExpenseDoesNotExists extends Error implements AppError {
    statusCode = 404;
    constructor() {
        super("A despesa não existe");
        this.name = "ExpenseDoesNotExistsError";
    }
}