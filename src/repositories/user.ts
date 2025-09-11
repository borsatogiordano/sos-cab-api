import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
    async createUser(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }

    async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        return prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } });
    }
}