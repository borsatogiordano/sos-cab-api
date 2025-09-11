import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { UserService } from "../services/user";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const input: Prisma.UserCreateInput = request.body as Prisma.UserCreateInput;
    const user = await this.userService.createUser(input);
    reply.code(201).send(user);
  };

  getAllUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await this.userService.getAllUsers();
    reply.send(users);
  };

  getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const user = await this.userService.getUserById(id);
    if (!user) return reply.code(404).send({ error: "User not found" });
    reply.send(user);
  };

  updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const data: Prisma.UserUpdateInput = request.body as Prisma.UserUpdateInput;
    const user = await this.userService.updateUser(id, data);
    reply.send(user);
  };

  deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    await this.userService.deleteUser(id);
    reply.code(204).send();
  };
}
