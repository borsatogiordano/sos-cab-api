import { FastifyInstance } from "fastify";
import { UserRepository } from "../../repositories/user";
import { UserService } from "../../services/user";
import { UserController } from "../../controllers/user";
import z from "zod";
import { userSchemas } from "../../schemas/user-schemas";

export async function authRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post("/login", {
        schema: userSchemas.createUser
    }, controller.login);

}