import { FastifyInstance } from "fastify";
import { UserRepository } from "../repositories/user";
import { UserService } from "../services/user";
import { UserController } from "../controllers/user";
import z from "zod";

export async function authRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post("/login", {
        schema: {
            body: z.object({
                email: z.string().email("Email inválido"),
                password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
            })
        }
    }, controller.login);

}