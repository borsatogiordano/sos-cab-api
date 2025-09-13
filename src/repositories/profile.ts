import { prisma } from "../lib/prisma";
import { CreateProfile, UpdateProfile } from "../schemas/profile-schemas";

export class ProfileRepository {
    async createProfile(data: CreateProfile, userId: string) {
        return prisma.profile.create({ data: { ...data, userId } });
    }

    async getUserById(id: string) {
        return prisma.user.findUnique(
            {
                where: { id },
                select: {
                    id: true, email: true, profile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            });
    }

    async updateProfile(userId: string, data: UpdateProfile) {
        return prisma.profile.update({
            where: { userId },
            data
        });
    }
}