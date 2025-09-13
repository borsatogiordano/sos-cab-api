import { AppError } from "../errorHandler";

export class RidesDoesNotExistError extends Error implements AppError {
    statusCode = 404;
    constructor() {
        super("A corrida não existe");
        this.name = "RidesDoesNotExistError";
    }
}