import { prisma } from "../lib/prisma";
import { CreateUserBody } from "../schemas/user-schemas";

export class UserRepository {
    async createUser({ email, password }: CreateUserBody) {
        return prisma.user.create({ data: { email, password } });
    }

    async getUserById(id: string) {
        return prisma.user.findUnique(
            {
                where: { id },
                select: {
                    id: true, email: true, role: true, profile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            });
    }

    async getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async getAllUsers(page: number = 1, perPage: number = 10) {
        const skip = (page - 1) * perPage;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: perPage,
                select: {
                    id: true,
                    email: true,
                    profile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    },
                }
            }),
            prisma.user.count()
        ]);

        return {
            users,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            }
        };
    }

    async changeEmail(id: string, email: string) {
        return prisma.user.update({ where: { id }, data: { email } });
    }

    async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } });
    }
}