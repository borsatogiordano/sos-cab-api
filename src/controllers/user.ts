import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user";
import { ChangeEmailBody, ChangeEmailParams, CreateUserBody, LoginBody } from "../schemas/user-schemas";

export class UserController {
    constructor(private userService: UserService) { }

    createUser = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateUserBody;
        const user = await this.userService.createUser(body);
        reply.code(201).send();
    };

    getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
        const { page, perPage } = request.query as { page?: number; perPage?: number };
        const users = await this.userService.getAllUsers(page, perPage);
        reply.send(users);
    };

    getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const user = await this.userService.getUserById(id);
        if (!user) return reply.code(404).send({ error: "User not found" });
        reply.send(user);
    };

    changeEmail = async (request: FastifyRequest, reply: FastifyReply) => {
        const loggedUser = request.user;
        const { id } = request.params as ChangeEmailParams;
        const { email } = request.body as ChangeEmailBody;

        await this.userService.changeEmail(
            id,
            email,
            loggedUser.userId,
            loggedUser.role
        );
        reply.send({ message: "Email alterado com sucesso" });
    };

    deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
        const loggedUser = request.user;
        const { id } = request.params as { id: string };

        await this.userService.deleteUser(
            loggedUser.userId,
            loggedUser.role,
            id
        );
        reply.code(204).send();
    };

    login = async (request: FastifyRequest, reply: FastifyReply) => {
        const { email, password } = request.body as LoginBody;
        const user = await this.userService.login({ email, password });
        const token = await reply.jwtSign({ userId: user.id, role: user.role });
        reply.send({
            message: "Login feito com sucesso",
            token
        });
    }
}