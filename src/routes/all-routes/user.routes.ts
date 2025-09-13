import { FastifyInstance } from "fastify";
import { UserRepository } from "../../repositories/user";
import { UserService } from "../../services/user";
import { UserController } from "../../controllers/user";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { ChangeEmailBody, userSchemas } from "../../schemas/user-schemas";

export async function userRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post("/register", {
        schema: userSchemas.createUser
    }, controller.createUser);

    app.get("/users", {
        schema: userSchemas.getAllUsers
    }, controller.getAllUsers);

    app.get("/users/:id", {
        schema: userSchemas.getUserById
    }, controller.getUserById);

    app.patch("/users/change-email/:id", {
        onRequest: [verifyJWT],
        schema: userSchemas.changeEmail
    }, controller.changeEmail);
}