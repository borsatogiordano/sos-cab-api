import { AppError } from "../errorHandler";

export class UserAlreadyExistsError extends Error implements AppError {
    statusCode = 409;
    constructor() {
        super("Usuário já existe");
        this.name = "UserAlreadyExistsError";
    }
}

export class UserNotFoundError extends Error implements AppError {
    statusCode = 404;
    constructor() {
        super("Usuário não encontrado");
        this.name = "UserNotFoundError";
    }
}

export class InvalidUserCredentialsError extends Error implements AppError {
    statusCode = 401;
    constructor() {
        super("Credenciais inválidas");
        this.name = "InvalidUserCredentialsError";
    }
}