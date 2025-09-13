import { AppError } from "../errorHandler";

export class ProfileAlreadyExistsError extends Error implements AppError {
    statusCode = 409;
    constructor() {
        super("Este usuário já possui um perfil cadastrado");
        this.name = "ProfileAlreadyExistsError";
    }
}