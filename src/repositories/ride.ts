import { prisma } from "../lib/prisma";
import { CreateRide } from "../schemas/ride-schema";

export class RideRepository {
    async createRide(data: CreateRide, userId: string) {
        return prisma.ride.create({ data: { ...data, userId } });
    }
}