import { FastifyInstance } from "fastify";
import { UserRepository } from "../repositories/user";
import { UserService } from "../services/user";
import { UserController } from "../controllers/user";
import z from "zod";

export async function userRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post("/users", {
        schema: {
            body: z.object({
                email: z.string().email("Email inválido"),
                password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
            })
        }
    }, controller.createUser);

    app.get("/users", controller.getAllUsers);

    app.get("/users/:id", controller.getUserById);

    app.put("/users/:id", controller.updateUser);
    
    app.delete("/users/:id", controller.deleteUser);
}
