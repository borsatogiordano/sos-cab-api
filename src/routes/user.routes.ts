import { FastifyInstance } from "fastify";
import { UserRepository } from "../repositories/user";
import { UserService } from "../services/user";
import { UserController } from "../controllers/user";

export async function userRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post("/users", controller.createUser);
    app.get("/users", controller.getAllUsers);
    app.get("/users/:id", controller.getUserById);
    app.put("/users/:id", controller.updateUser);
    app.delete("/users/:id", controller.deleteUser);
}
