import { AppError } from "../errorHandler";

export class UnauthorizedError extends Error implements AppError {
    statusCode = 401;
    constructor(message: string = "Você não está autenticado") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends Error implements AppError {
    statusCode = 403;
    constructor(message: string = "Você não tem permissão para acessar este recurso") {
        super(message);
        this.name = "ForbiddenError";
    }
}