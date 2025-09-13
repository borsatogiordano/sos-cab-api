import { prisma } from "../lib/prisma";
import { CreateRide, FindRidesByUserIdParams, FindRidesByUserIdQuery } from "../schemas/ride-schema";

export class RideRepository {
    async createRide(data: CreateRide, userId: string) {
        return prisma.ride.create({ data: { ...data, userId } });
    }
    async findRideById(rideId: string) {
        return prisma.ride.findUnique({ where: { id: rideId } });
    }
    async ridesByUserId(
        { userId }: FindRidesByUserIdParams,
        { page = 1, perPage = 10 }: FindRidesByUserIdQuery
    ) {
        // Garantir que são números inteiros
        const pageNumber = Number(page);
        const perPageNumber = Number(perPage);

        const skip = (pageNumber - 1) * perPageNumber;


        const [rides, total] = await Promise.all([
            prisma.ride.findMany({
                where: { userId },
                skip,
                take: perPageNumber
            }),
            prisma.ride.count({ where: { userId } })
        ]);

        return {
            rides,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            }
        };
    }
}