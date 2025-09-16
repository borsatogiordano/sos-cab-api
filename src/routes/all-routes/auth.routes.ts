import { FastifyInstance } from "fastify";
import { UserRepository } from "../../repositories/user";
import { UserService } from "../../services/user";
import { UserController } from "../../controllers/user";
import { userSchemas } from "../../schemas/user-schemas";
import z from "zod";

export async function authRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post("/login", {
        schema: userSchemas.createUser
    }, controller.login);

    app.post("/refresh-token", {
        schema: {
            body: z.object({
                refreshToken: z.string("O refresh token é obrigatório")
            })
        }
    }, controller.refreshToken);
}