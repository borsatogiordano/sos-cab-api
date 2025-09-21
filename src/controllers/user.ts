import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user";
import { ChangeEmailBody, ChangeEmailParams, CreateUserBody, LoginBody } from "../schemas/user-schemas";
import { verifyJWT } from "../middlewares/verify-jwt";
import { UserNotFoundError } from "../errors/separated-errors/user-errors";

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
        const token = await reply.jwtSign({ userId: user.id, role: user.role }, { expiresIn: '1h' });
        const refreshToken = await reply.jwtSign({ userId: user.id }, { expiresIn: '7d' });
        reply.send({
            message: "Login feito com sucesso",
            token,
            refreshToken
        });
    }

    refreshToken = async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { refreshToken } = request.body as { refreshToken: string };

            const decoded = await request.server.jwt.verify(refreshToken);
            const { userId } = decoded as { userId: string };

            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new UserNotFoundError();
            }

            const newToken = await reply.jwtSign({ userId: user.id, role: user.role }, { expiresIn: '1h' });
            const newRefreshToken = await reply.jwtSign({ userId: user.id }, { expiresIn: '7d' });

            reply.send({
                message: "Token renovado com sucesso",
                token: newToken,
                refreshToken: newRefreshToken
            });
        }
        catch (error) {
            reply.status(401).send({ message: "Refresh token inválido ou expirado" });
        }
    }
}