import { AppError } from "../errorHandler";

export class RidesDoesNotExistError extends Error implements AppError {
    statusCode = 404;
    constructor() {
        super("A corrida não existe");
        this.name = "RidesDoesNotExistError";
    }
}

export class InvalidDateRangeError extends Error implements AppError {
    statusCode = 400;
    constructor() {
        super("A data de término deve ser posterior ou igual à data de início");
        this.name = "InvalidDateRangeError";
    }
}

export class InvalidDatesError extends Error implements AppError {
    statusCode = 400;
    constructor() {
        super("Datas inválidas");
        this.name = "InvalidDatesError";
    }
}